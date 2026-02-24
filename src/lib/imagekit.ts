import "server-only";

type ImageKitUploadResult = {
  url: string;
  filePath: string;
  name: string;
  fileId: string;
};

type UploadFileArgs = {
  file: File;
  fileName: string;
  folder: string;
  tags?: string[];
};

function getAuthHeader() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not configured");
  }

  const token = Buffer.from(`${privateKey}:`).toString("base64");
  return `Basic ${token}`;
}

export async function uploadFileToImageKit({
  file,
  fileName,
  folder,
  tags,
}: UploadFileArgs): Promise<ImageKitUploadResult> {
  const formData = new FormData();
  const bytes = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type || "application/octet-stream";
  const fileAsDataUri = `data:${mimeType};base64,${bytes.toString("base64")}`;

  formData.append("file", fileAsDataUri);
  formData.append("fileName", fileName);
  formData.append("folder", folder.startsWith("/") ? folder : `/${folder}`);

  if (tags && tags.length > 0) {
    formData.append("tags", tags.join(","));
  }

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: getAuthHeader(),
    },
    body: formData,
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || "Failed to upload file to ImageKit");
  }

  const payload = (await response.json()) as {
    url?: string;
    filePath?: string;
    name?: string;
    fileId?: string;
  };

  if (!payload.url || !payload.filePath || !payload.name || !payload.fileId) {
    throw new Error("ImageKit upload response is missing required fields");
  }

  return {
    url: payload.url,
    filePath: payload.filePath,
    name: payload.name,
    fileId: payload.fileId,
  };
}

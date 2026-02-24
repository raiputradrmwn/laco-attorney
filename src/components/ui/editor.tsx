"use client";

import dynamic from "next/dynamic";
const EditorClient = dynamic(() => import("./editor-client"), { ssr: false });

export default EditorClient;

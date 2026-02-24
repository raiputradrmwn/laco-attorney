"use client";
import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Heading2,
    List,
    ListOrdered,
    Quote,
    Link as LinkIcon,
    Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type EditorProps = {
    value?: string;
    onChange?: (html: string) => void;
    placeholder?: string;
    className?: string;
    minHeight?: string;
};

export default function EditorClient({
    value,
    onChange,
    placeholder = "Write content here...",
    className,
    minHeight = "min-h-[240px]",
}: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: { levels: [2, 3] } }),
            Underline,
            Link.configure({
                openOnClick: true,
                autolink: true,
                HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
            }),
            Image.configure({ allowBase64: true }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder }),
        ],
        content: value || "",
        onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
        editorProps: {
            attributes: {
                class: cn(
                    "prose prose-sm max-w-none dark:prose-invert focus:outline-none p-4",
                    minHeight
                ),
            },
        },
        immediatelyRender: false,
    });

    React.useEffect(() => {
        if (!editor) return;
        if (typeof value === "string" && editor.getHTML() !== value) {
            editor.commands.setContent(value, { emitUpdate: false });
        }
    }, [editor, value]);

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const handlePickImage = () => fileInputRef.current?.click();
    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const b64 = await toBase64(f);
        editor
            ?.chain()
            .focus()
            .setImage({ src: String(b64) })
            .run();
        e.target.value = "";
    };

    return (
        <div className={cn("rounded-md border border-white/10 bg-black/50 overflow-hidden", className)}>
            <div className="flex flex-wrap items-center gap-1 p-2 bg-zinc-950/80 border-b border-white/10">
                <Toggle
                    size="sm"
                    pressed={editor?.isActive("bold")}
                    onPressedChange={() => editor?.chain().focus().toggleBold().run()}
                    className="data-[state=on]:bg-white data-[state=on]:text-black hover:bg-white/10 hover:text-white"
                >
                    <Bold className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor?.isActive("italic")}
                    onPressedChange={() => editor?.chain().focus().toggleItalic().run()}
                    className="data-[state=on]:bg-white data-[state=on]:text-black hover:bg-white/10 hover:text-white"
                >
                    <Italic className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor?.isActive("underline")}
                    onPressedChange={() =>
                        editor?.chain().focus().toggleUnderline().run()
                    }
                    className="data-[state=on]:bg-white data-[state=on]:text-black hover:bg-white/10 hover:text-white"
                >
                    <UnderlineIcon className="h-4 w-4" />
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor?.isActive("strike")}
                    onPressedChange={() => editor?.chain().focus().toggleStrike().run()}
                    className="data-[state=on]:bg-white data-[state=on]:text-black hover:bg-white/10 hover:text-white"
                >
                    <Strikethrough className="h-4 w-4" />
                </Toggle>

                <Separator orientation="vertical" className="mx-1 h-6 bg-white/20" />

                <Button
                    size="sm"
                    variant={
                        editor?.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
                    }
                    className="hover:bg-white/10 hover:text-white data-[state=on]:bg-white data-[state=on]:text-black"
                    onClick={(e) => {
                        e.preventDefault();
                        editor?.chain().focus().toggleHeading({ level: 2 }).run();
                    }}
                >
                    <Heading2 className="h-4 w-4 mr-1" /> H2
                </Button>
                <Button
                    size="sm"
                    variant={
                        editor?.isActive("heading", { level: 3 }) ? "secondary" : "ghost"
                    }
                    className="hover:bg-white/10 hover:text-white data-[state=on]:bg-white data-[state=on]:text-black"
                    onClick={(e) => {
                        e.preventDefault();
                        editor?.chain().focus().toggleHeading({ level: 3 }).run();
                    }}
                >
                    <Heading2 className="h-4 w-4 mr-1" /> H3
                </Button>

                <Separator orientation="vertical" className="mx-1 h-6 bg-white/20" />

                <Button
                    size="sm"
                    variant={editor?.isActive("bulletList") ? "secondary" : "ghost"}
                    className="hover:bg-white/10 hover:text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        editor?.chain().focus().toggleBulletList().run();
                    }}
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor?.isActive("orderedList") ? "secondary" : "ghost"}
                    className="hover:bg-white/10 hover:text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        editor?.chain().focus().toggleOrderedList().run();
                    }}
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    size="sm"
                    variant={editor?.isActive("blockquote") ? "secondary" : "ghost"}
                    className="hover:bg-white/10 hover:text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        editor?.chain().focus().toggleBlockquote().run();
                    }}
                >
                    <Quote className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="mx-1 h-6 bg-white/20" />

                <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-white/10 hover:text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        const url = window.prompt("Masukkan URL");
                        if (!url) return;
                        editor
                            ?.chain()
                            .focus()
                            .extendMarkRange("link")
                            .setLink({ href: url })
                            .run();
                    }}
                >
                    <LinkIcon className="h-4 w-4" />
                </Button>

                <Button
                    size="sm"
                    variant="ghost"
                    className="hover:bg-white/10 hover:text-white"
                    onClick={(e) => {
                        e.preventDefault();
                        handlePickImage();
                    }}
                >
                    <ImageIcon className="h-4 w-4" />
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFile}
                />
            </div>

            <div className="bg-black text-white p-0">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

function toBase64(file: File) {
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = reject;
        r.readAsDataURL(file);
    });
}

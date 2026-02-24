"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Editor from "@/components/ui/editor"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

type NewsItem = {
    id: string;
    title: string;
    category: string;
    slug: string;
    imageUrl: string;
    content: string;
    publishedAt: string;
}

export function NewsManagement() {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

    const fetchNews = async () => {
        setFetching(true);

        try {
            const res = await fetch("/api/news");

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.error || "Failed to fetch news");
                return;
            }

            const data = await res.json();
            setNewsItems(data);
        } catch (error) {
            console.error("Failed to fetch news", error);
            toast.error("Failed to fetch news");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setCategory("");
        setImageUrl("");
        setImageFile(null);
        setContent("");
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);

        if (!isOpen) {
            resetForm();
        }
    };

    const handleEditClick = (item: NewsItem) => {
        setEditingId(item.id);
        setTitle(item.title);
        setCategory(item.category);
        setImageUrl(item.imageUrl || "");
        setImageFile(null);
        setContent(item.content);
        setOpen(true);
    };

    const handleSave = async () => {
        if (!editingId && !imageFile) {
            toast.error("Cover image is required for new article");
            return;
        }

        setLoading(true);

        try {
            const endpoint = editingId ? `/api/news/${editingId}` : "/api/news";
            const method = editingId ? "PUT" : "POST";
            const formData = new FormData();
            formData.append("title", title.trim());
            formData.append("category", category.trim());
            formData.append("content", content);
            formData.append("imageUrl", imageUrl);

            if (imageFile) {
                formData.append("image", imageFile);
            }

            const res = await fetch(endpoint, {
                method,
                body: formData,
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.error || "Failed to save article");
                return;
            }

            toast.success(editingId ? "Article updated successfully" : "Article created successfully");
            setOpen(false);
            resetForm();
            fetchNews();
        } catch (error) {
            console.error("Failed to save news", error);
            toast.error("Failed to save article");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        setDeleteTargetId(id);
    };

    const confirmDelete = async () => {
        if (!deleteTargetId) return;

        try {
            const res = await fetch(`/api/news/${deleteTargetId}`, { method: "DELETE" });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.error || "Failed to delete article");
                return;
            }

            toast.success("Article deleted successfully");
            fetchNews();
        } catch (error) {
            console.error("Failed to delete news", error);
            toast.error("Failed to delete article");
        } finally {
            setDeleteTargetId(null);
        }
    };

    return (
        <>
            <AlertDialog open={!!deleteTargetId} onOpenChange={(isOpen) => { if (!isOpen) setDeleteTargetId(null); }}>
                <AlertDialogContent className="bg-zinc-950 border-white/10 text-white rounded-none">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-serif text-xl">Delete Article?</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            This action cannot be undone. The article will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border-white/10 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-none">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-red-600 text-white hover:bg-red-700 rounded-none tracking-widest text-xs uppercase font-bold"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">News & Insights Management</h2>
                    <Dialog open={open} onOpenChange={handleOpenChange}>
                        <DialogTrigger asChild>
                            <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-11 tracking-widest text-xs uppercase font-bold">
                                <Plus className="mr-2 h-4 w-4" /> Add News
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl bg-black border-white/10 text-white rounded-none max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="font-serif text-2xl tracking-wide">
                                    {editingId ? "Edit Article" : "Publish News"}
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {editingId
                                        ? "Update the selected article. Click save when you're done."
                                        : "Draft a new insight or firm update. Click save when you're done."}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="title" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="col-span-3 bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                        placeholder="e.g. Navigating Cross-Border Mergers"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="category" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                        Category
                                    </Label>
                                    <Input
                                        id="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="col-span-3 bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                        placeholder="e.g. Insight or Law Update"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="image" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                        Cover Image
                                    </Label>
                                    <div className="col-span-3 space-y-2">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept=".jpg,.jpeg,.png,.webp"
                                            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                                            className="bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                        />
                                        {imageUrl ? (
                                            <p className="text-[10px] text-zinc-500">
                                                Current: {imageUrl}
                                            </p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 items-start gap-4">
                                    <Label htmlFor="content" className="text-right text-xs uppercase tracking-widest text-zinc-400 pt-3">
                                        Content
                                    </Label>
                                    <div className="col-span-3">
                                        <Editor
                                            value={content}
                                            onChange={setContent}
                                            placeholder="Write the full article details here..."
                                            minHeight="min-h-[300px]"
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={handleSave}
                                    disabled={loading || !title.trim() || !content.trim()}
                                    className="bg-white text-black hover:bg-zinc-200 rounded-none tracking-widest text-xs uppercase font-bold"
                                >
                                    {loading ? "Saving..." : editingId ? "Update Article" : "Save Article"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {fetching ? (
                    <div className="py-8 text-center text-zinc-400 font-light text-sm">Loading articles...</div>
                ) : newsItems.length > 0 ? (
                    <div className="border border-white/10">
                        <Table>
                            <TableHeader className="bg-zinc-950/50">
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="font-serif text-zinc-400">Title</TableHead>
                                    <TableHead className="font-serif text-zinc-400">Category</TableHead>
                                    <TableHead className="font-serif text-zinc-400 hidden md:table-cell">Slug</TableHead>
                                    <TableHead className="font-serif text-zinc-400 hidden xl:table-cell">Published</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {newsItems.map((item) => (
                                    <TableRow key={item.id} className="border-white/10 hover:bg-zinc-900/50 transition-colors">
                                        <TableCell className="font-medium text-white">{item.title}</TableCell>
                                        <TableCell className="text-zinc-300">{item.category}</TableCell>
                                        <TableCell className="text-zinc-400 hidden md:table-cell">{item.slug}</TableCell>
                                        <TableCell className="text-zinc-400 hidden xl:table-cell">
                                            {new Date(item.publishedAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEditClick(item)}
                                                    className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(item.id)}
                                                    className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-none"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="bg-zinc-950 border-white/10 border p-8 text-center text-zinc-400 mt-8">
                        <h3 className="text-lg font-serif text-white mb-2">No Articles Found</h3>
                        <p className="mb-4 font-light text-sm">Get started by publishing your first news article or insight.</p>
                    </div>
                )}
            </div>
        </>
    );
}

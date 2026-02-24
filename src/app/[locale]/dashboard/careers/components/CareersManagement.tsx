"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Editor from "@/components/ui/editor"

export function CareersManagement() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        // TODO: Wire up actual API POST request to /api/careers
        console.log({ title, department, location, description });
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            setTitle("");
            setDepartment("");
            setLocation("");
            setDescription("");
        }, 1000);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Careers Management</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-11 tracking-widest text-xs uppercase font-bold">
                            <Plus className="mr-2 h-4 w-4" /> Add Job
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl bg-black border-white/10 text-white rounded-none">
                        <DialogHeader>
                            <DialogTitle className="font-serif text-2xl tracking-wide">Post a Career Opportunity</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Draft a new job opening for the firm. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                    Job Title
                                </Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="col-span-3 bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                    placeholder="e.g. Senior Corporate Associate"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="department" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                    Department
                                </Label>
                                <Input
                                    id="department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className="col-span-3 bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                    placeholder="e.g. Mergers & Acquisitions"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="location" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="col-span-3 bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                    placeholder="e.g. Jakarta, ID"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="description" className="text-right text-xs uppercase tracking-widest text-zinc-400 pt-3">
                                    Description
                                </Label>
                                <div className="col-span-3">
                                    <Editor
                                        value={description}
                                        onChange={setDescription}
                                        placeholder="Write the full job description, requirements, and responsibilities here..."
                                        minHeight="min-h-[240px]"
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                onClick={handleSave}
                                disabled={loading || !title || !description}
                                className="bg-white text-black hover:bg-zinc-200 rounded-none tracking-widest text-xs uppercase font-bold"
                            >
                                {loading ? "Saving..." : "Save Job Posting"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Stats cards will go here */}
            </div>

            <div className="bg-zinc-950 border-white/10 border p-8 text-center text-zinc-400 mt-8">
                <h3 className="text-lg font-serif text-white mb-2">No Open Roles</h3>
                <p className="mb-4 font-light text-sm">Get started by creating a new job posting.</p>
            </div>
        </div>
    );
}

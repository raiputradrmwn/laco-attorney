"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Plus, Pencil, Trash2, Users } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "sonner"

type CareerApplication = {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    cvUrl: string;
    cvFileName: string;
    status: string;
    createdAt: string;
};

type CareerItem = {
    id: string;
    title: string;
    department: string | null;
    location: string;
    description: string | null;
    isActive: boolean;
    _count?: {
        applications?: number;
    };
};

export function CareersManagement() {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [applicationsOpen, setApplicationsOpen] = useState(false);
    const [applicationsLoading, setApplicationsLoading] = useState(false);
    const [applicationsTargetTitle, setApplicationsTargetTitle] = useState("");
    const [applications, setApplications] = useState<CareerApplication[]>([]);

    const [title, setTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [careers, setCareers] = useState<CareerItem[]>([]);

    const fetchCareers = async () => {
        setFetching(true);

        try {
            const res = await fetch("/api/careers?all=true");

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.error || "Failed to fetch careers");
                return;
            }

            const data = await res.json();
            setCareers(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch careers", error);
            toast.error("Failed to fetch careers");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchCareers();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setDepartment("");
        setLocation("");
        setDescription("");
        setIsActive(true);
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);

        if (!isOpen) {
            resetForm();
        }
    };

    const handleEditClick = (career: CareerItem) => {
        setEditingId(career.id);
        setTitle(career.title);
        setDepartment(career.department || "");
        setLocation(career.location);
        setDescription(career.description || "");
        setIsActive(career.isActive);
        setOpen(true);
    };

    const handleApplicationsClick = async (career: CareerItem) => {
        setApplicationsTargetTitle(career.title);
        setApplicationsOpen(true);
        setApplicationsLoading(true);

        try {
            const res = await fetch(`/api/careers/${career.id}/applications`);

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.error || "Failed to fetch applicants");
                setApplications([]);
                return;
            }

            const data = await res.json();
            setApplications(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to fetch applications", error);
            toast.error("Failed to fetch applicants");
            setApplications([]);
        } finally {
            setApplicationsLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);

        try {
            const endpoint = editingId ? `/api/careers/${editingId}` : "/api/careers";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: title.trim(),
                    department: department.trim(),
                    location: location.trim(),
                    description,
                    isActive,
                }),
            });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.error || "Failed to save career");
                return;
            }

            toast.success(editingId ? "Career updated successfully" : "Career created successfully");
            setOpen(false);
            resetForm();
            fetchCareers();
        } catch (error) {
            console.error("Failed to save career", error);
            toast.error("Failed to save career");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteTargetId) return;

        try {
            const res = await fetch(`/api/careers/${deleteTargetId}`, { method: "DELETE" });

            if (!res.ok) {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.error || "Failed to delete career");
                return;
            }

            toast.success("Career deleted successfully");
            fetchCareers();
        } catch (error) {
            console.error("Failed to delete career", error);
            toast.error("Failed to delete career");
        } finally {
            setDeleteTargetId(null);
        }
    };

    return (
        <>
            <AlertDialog open={!!deleteTargetId} onOpenChange={(isOpen) => { if (!isOpen) setDeleteTargetId(null); }}>
                <AlertDialogContent className="bg-zinc-950 border-white/10 text-white rounded-none">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-serif text-xl">Delete Career?</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            This action cannot be undone. This career and all its applications will be permanently removed.
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

            <Dialog open={applicationsOpen} onOpenChange={setApplicationsOpen}>
                <DialogContent className="sm:max-w-4xl bg-black border-white/10 text-white rounded-none max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="font-serif text-2xl tracking-wide">
                            Applicants: {applicationsTargetTitle}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Review all submitted applications for this role.
                        </DialogDescription>
                    </DialogHeader>
                    {applicationsLoading ? (
                        <div className="py-8 text-center text-zinc-400 text-sm">Loading applicants...</div>
                    ) : applications.length === 0 ? (
                        <div className="py-8 text-center text-zinc-400 text-sm">No applications yet for this role.</div>
                    ) : (
                        <div className="space-y-3">
                            {applications.map((application) => (
                                <div key={application.id} className="border border-white/10 p-4 space-y-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <h4 className="font-serif text-lg text-white">{application.fullName}</h4>
                                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                                            {new Date(application.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-300">{application.email}</p>
                                    <p className="text-sm text-zinc-400">{application.phone || "-"}</p>
                                    <div className="pt-2">
                                        <a
                                            href={application.cvUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[10px] uppercase tracking-widest text-white border-b border-white/30 hover:border-white"
                                        >
                                            View CV: {application.cvFileName}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Careers Management</h2>
                    <Dialog open={open} onOpenChange={handleOpenChange}>
                        <DialogTrigger asChild>
                            <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-11 tracking-widest text-xs uppercase font-bold">
                                <Plus className="mr-2 h-4 w-4" /> Add Job
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl bg-black border-white/10 text-white rounded-none max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="font-serif text-2xl tracking-wide">
                                    {editingId ? "Edit Career Opportunity" : "Post a Career Opportunity"}
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    Draft or update a job opening for the firm.
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
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="isActive" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                        Active
                                    </Label>
                                    <div className="col-span-3 flex items-center gap-3">
                                        <Checkbox id="isActive" checked={isActive} onCheckedChange={(value) => setIsActive(value === true)} />
                                        <span className="text-sm text-zinc-300">Publish this role on the careers page</span>
                                    </div>
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
                                    disabled={loading || !title.trim() || !location.trim()}
                                    className="bg-white text-black hover:bg-zinc-200 rounded-none tracking-widest text-xs uppercase font-bold"
                                >
                                    {loading ? "Saving..." : editingId ? "Update Job Posting" : "Save Job Posting"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {fetching ? (
                    <div className="py-8 text-center text-zinc-400 font-light text-sm">Loading careers...</div>
                ) : careers.length > 0 ? (
                    <div className="border border-white/10">
                        <Table>
                            <TableHeader className="bg-zinc-950/50">
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="font-serif text-zinc-400">Job Title</TableHead>
                                    <TableHead className="font-serif text-zinc-400 hidden md:table-cell">Department</TableHead>
                                    <TableHead className="font-serif text-zinc-400">Location</TableHead>
                                    <TableHead className="font-serif text-zinc-400">Status</TableHead>
                                    <TableHead className="font-serif text-zinc-400">Applicants</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {careers.map((career) => (
                                    <TableRow key={career.id} className="border-white/10 hover:bg-zinc-900/50 transition-colors">
                                        <TableCell className="font-medium text-white">{career.title}</TableCell>
                                        <TableCell className="text-zinc-400 hidden md:table-cell">{career.department || "-"}</TableCell>
                                        <TableCell className="text-zinc-300">{career.location}</TableCell>
                                        <TableCell className={career.isActive ? "text-emerald-400" : "text-zinc-500"}>
                                            {career.isActive ? "Active" : "Draft"}
                                        </TableCell>
                                        <TableCell className="text-zinc-300">{career._count?.applications ?? 0}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleApplicationsClick(career)}
                                                    className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none"
                                                >
                                                    <Users className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEditClick(career)}
                                                    className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteTargetId(career.id)}
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
                        <h3 className="text-lg font-serif text-white mb-2">No Open Roles</h3>
                        <p className="mb-4 font-light text-sm">Get started by creating a new job posting.</p>
                    </div>
                )}
            </div>
        </>
    );
}

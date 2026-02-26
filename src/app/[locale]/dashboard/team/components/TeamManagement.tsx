"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Pencil } from "lucide-react"
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

type TeamMember = {
    id: string;
    name: string;
    role: string;
    specialization: string | null;
    linkedin: string | null;
    email: string | null;
    bio: string | null;
    imageUrl: string | null;
}

export function TeamManagement() {
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [fetching, setFetching] = useState(true);

    const fetchMembers = async () => {
        setFetching(true);
        try {
            const res = await fetch("/api/team");
            if (res.ok) {
                const data = await res.json();
                setMembers(data);
            } else {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.error || "Failed to fetch team members");
            }
        } catch (error) {
            console.error("Failed to fetch team members", error);
            toast.error("Failed to fetch team members");
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const resetForm = () => {
        setEditingId(null);
        setName("");
        setRole("");
        setSpecialization("");
        setLinkedin("");
        setEmail("");
        setBio("");
        setImageUrl("");
        setImageFile(null);
    }

    const handleEditClick = (member: TeamMember) => {
        setEditingId(member.id);
        setName(member.name);
        setRole(member.role);
        setSpecialization(member.specialization || "");
        setLinkedin(member.linkedin || "");
        setEmail(member.email || "");
        setBio(member.bio || "");
        setImageUrl(member.imageUrl || "");
        setImageFile(null);
        setOpen(true);
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const endpoint = editingId ? `/api/team/${editingId}` : "/api/team";
            const method = editingId ? "PUT" : "POST";

            const formData = new FormData();
            formData.append("name", name.trim());
            formData.append("role", role.trim());
            formData.append("specialization", specialization.trim());
            formData.append("linkedin", linkedin.trim());
            formData.append("email", email.trim());
            formData.append("bio", bio);
            formData.append("imageUrl", imageUrl);
            if (imageFile) {
                formData.append("image", imageFile);
            }

            const res = await fetch(endpoint, { method, body: formData });

            if (res.ok) {
                setOpen(false);
                resetForm();
                toast.success(editingId ? "Team member updated successfully" : "Team member created successfully");
                fetchMembers();
            } else {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.error || "Failed to save team member");
            }
        } catch (error) {
            console.error("Failed to save member", error);
            toast.error("Failed to save team member");
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
            const res = await fetch(`/api/team/${deleteTargetId}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Team member deleted successfully");
                fetchMembers();
            } else {
                const payload = await res.json().catch(() => ({}));
                toast.error(payload?.error || "Failed to delete team member");
            }
        } catch (error) {
            console.error("Failed to delete member", error);
            toast.error("Failed to delete team member");
        } finally {
            setDeleteTargetId(null);
        }
    };

    return (
        <>
            <AlertDialog open={!!deleteTargetId} onOpenChange={(open) => { if (!open) setDeleteTargetId(null); }}>
                <AlertDialogContent className="bg-zinc-950 border-white/10 text-white rounded-none">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-serif text-xl">Delete Team Member?</AlertDialogTitle>
                        <AlertDialogDescription className="text-zinc-400">
                            This action cannot be undone. The team member will be permanently removed from the firm profile.
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
                    <h2 className="text-3xl font-bold tracking-tight">Team Management</h2>
                    <Dialog open={open} onOpenChange={handleOpenChange}>
                        <DialogTrigger asChild>
                            <Button className="bg-white text-black hover:bg-zinc-200 rounded-none h-11 tracking-widest text-xs uppercase font-bold">
                                <Plus className="mr-2 h-4 w-4" /> Add Member
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl bg-black border-white/10 text-white rounded-none max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="font-serif text-2xl tracking-wide">
                                    {editingId ? "Edit Team Member" : "Add Team Member"}
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {editingId
                                        ? "Update the details of the selected team member. Click save when you're done."
                                        : "Add a new attorney or staff member to the firm profile. Click save when you're done."}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-6 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="col-span-3 bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                        placeholder="e.g. ALEXANDER VANCE"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="role" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                        Role Title
                                    </Label>
                                    <Input
                                        id="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        className="col-span-3 bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                        placeholder="e.g. MANAGING PARTNER"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="specialization" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                        Specialization
                                    </Label>
                                    <Input
                                        id="specialization"
                                        value={specialization}
                                        onChange={(e) => setSpecialization(e.target.value)}
                                        className="col-span-3 bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                        placeholder="e.g. Corporate Law"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="col-span-3 bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                        placeholder="e.g. initial.last@laco.com"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="linkedin" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                        LinkedIn
                                    </Label>
                                    <Input
                                        id="linkedin"
                                        value={linkedin}
                                        onChange={(e) => setLinkedin(e.target.value)}
                                        className="col-span-3 bg-zinc-950 border-white/10 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                                        placeholder="e.g. https://linkedin.com/in/alexander-vance"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="photo" className="text-right text-xs uppercase tracking-widest text-zinc-400">
                                        Photo
                                    </Label>
                                    <div className="col-span-3 space-y-2">
                                        <Input
                                            id="photo"
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
                                    <Label htmlFor="bio" className="text-right text-xs uppercase tracking-widest text-zinc-400 pt-3">
                                        Biography
                                    </Label>
                                    <div className="col-span-3">
                                        <Editor
                                            value={bio}
                                            onChange={setBio}
                                            placeholder="Write the attorney's full biography here..."
                                            minHeight="min-h-[240px]"
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    onClick={handleSave}
                                    disabled={loading || !name}
                                    className="bg-white text-black hover:bg-zinc-200 rounded-none tracking-widest text-xs uppercase font-bold"
                                >
                                    {loading ? "Saving..." : (editingId ? "Update Member" : "Save Member")}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {fetching ? (
                    <div className="py-8 text-center text-zinc-400 font-light text-sm">Loading team members...</div>
                ) : members.length > 0 ? (
                    <div className="border border-white/10">
                        <Table>
                            <TableHeader className="bg-zinc-950/50">
                                <TableRow className="border-white/10 hover:bg-transparent">
                                    <TableHead className="font-serif text-zinc-400">Name</TableHead>
                                    <TableHead className="font-serif text-zinc-400">Role</TableHead>
                                    <TableHead className="font-serif text-zinc-400 hidden md:table-cell">Specialization</TableHead>
                                    <TableHead className="font-serif text-zinc-400 hidden xl:table-cell">Contact</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((member) => (
                                    <TableRow key={member.id} className="border-white/10 hover:bg-zinc-900/50 transition-colors">
                                        <TableCell className="font-medium text-white">{member.name}</TableCell>
                                        <TableCell className="text-zinc-300">{member.role}</TableCell>
                                        <TableCell className="text-zinc-400 hidden md:table-cell">{member.specialization || "-"}</TableCell>
                                        <TableCell className="text-zinc-400 hidden xl:table-cell">
                                            <div className="flex flex-col text-xs">
                                                <span>{member.email || "-"}</span>
                                                <span className="text-zinc-600 truncate max-w-[150px]">{member.linkedin || "-"}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEditClick(member)}
                                                    className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-none"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(member.id)}
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
                        <h3 className="text-lg font-serif text-white mb-2">No Team Members Found</h3>
                        <p className="mb-4 font-light text-sm">Get started by creating a new team member.</p>
                    </div>
                )}
            </div>
        </>
    );
}

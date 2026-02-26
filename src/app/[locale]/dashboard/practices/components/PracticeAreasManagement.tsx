"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react";

interface PracticeArea {
    id: string;
    slug: string;
    icon: string;
    order: number;
    isActive: boolean;
}

const ICON_OPTIONS = [
    "User", "Gavel", "Building2", "Combine", "Plane", "PenTool",
    "Users", "ShieldCheck", "PlaneTakeoff", "Heart", "Scale", "Briefcase",
    "FileText", "Globe", "Home", "Shield", "Star", "Landmark",
];

const emptyForm = { slug: "", icon: "Scale", order: 0, isActive: true };

export function PracticeAreasManagement() {
    const [practices, setPractices] = useState<PracticeArea[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<PracticeArea | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState("");

    async function fetchPractices() {
        setLoading(true);
        try {
            const res = await fetch("/api/practices");
            const data = await res.json();
            setPractices(Array.isArray(data) ? data : []);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchPractices(); }, []);

    function openCreate() {
        setEditTarget(null);
        setForm(emptyForm);
        setError("");
        setDialogOpen(true);
    }

    function openEdit(p: PracticeArea) {
        setEditTarget(p);
        setForm({ slug: p.slug, icon: p.icon, order: p.order, isActive: p.isActive });
        setError("");
        setDialogOpen(true);
    }

    async function handleSave() {
        if (!form.slug.trim() || !form.icon.trim()) {
            setError("Slug and Icon are required.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            const url = editTarget ? `/api/practices/${editTarget.id}` : "/api/practices";
            const method = editTarget ? "PUT" : "POST";
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) {
                const body = await res.json();
                setError(body.error || "Failed to save.");
                return;
            }
            setDialogOpen(false);
            fetchPractices();
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this practice area?")) return;
        setDeleting(id);
        try {
            await fetch(`/api/practices/${id}`, { method: "DELETE" });
            fetchPractices();
        } finally {
            setDeleting(null);
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Practice Areas</h2>
                    <p className="text-muted-foreground mt-1">
                        {practices.length} area{practices.length !== 1 ? "s" : ""} total
                    </p>
                </div>
                <Button onClick={openCreate} className="gap-2">
                    <Plus className="size-4" />
                    Add Practice Area
                </Button>
            </div>

            {/* Table */}
            <div className="rounded-lg border bg-card">
                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <Loader2 className="size-6 animate-spin text-muted-foreground" />
                    </div>
                ) : practices.length === 0 ? (
                    <div className="py-16 text-center text-muted-foreground">
                        <p className="text-lg font-medium text-foreground mb-1">No Practice Areas Found</p>
                        <p className="mb-4">Get started by adding a new practice area.</p>
                        <Button onClick={openCreate} variant="outline" className="gap-2">
                            <Plus className="size-4" /> Add Practice Area
                        </Button>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Order</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Icon</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {practices.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-mono text-sm text-muted-foreground">
                                        {p.order}
                                    </TableCell>
                                    <TableCell className="font-medium">{p.slug}</TableCell>
                                    <TableCell className="font-mono text-sm text-muted-foreground">
                                        {p.icon}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={p.isActive ? "default" : "secondary"}>
                                            {p.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                                                <Pencil className="size-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(p.id)}
                                                disabled={deleting === p.id}
                                            >
                                                {deleting === p.id
                                                    ? <Loader2 className="size-4 animate-spin" />
                                                    : <Trash2 className="size-4" />}
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>

            {/* Add / Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editTarget ? "Edit Practice Area" : "Add Practice Area"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        {error && (
                            <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-md">
                                {error}
                            </p>
                        )}

                        <div className="space-y-1.5">
                            <Label htmlFor="pa-slug">Slug</Label>
                            <Input
                                id="pa-slug"
                                placeholder="e.g. corporate-law"
                                value={form.slug}
                                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            />
                            <p className="text-xs text-muted-foreground">
                                Digunakan sebagai translation key: <code>items.&#123;slug&#125;.title</code>
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="pa-icon">Icon (Lucide name)</Label>
                            <Input
                                id="pa-icon"
                                placeholder="e.g. Scale"
                                value={form.icon}
                                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                            />
                            <div className="flex flex-wrap gap-1 mt-1">
                                {ICON_OPTIONS.map((ic) => (
                                    <button
                                        key={ic}
                                        type="button"
                                        onClick={() => setForm({ ...form, icon: ic })}
                                        className={`px-2 py-0.5 text-xs rounded border transition-colors ${form.icon === ic
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "border-border hover:border-primary"
                                            }`}
                                    >
                                        {ic}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="pa-order">Display Order</Label>
                            <Input
                                id="pa-order"
                                type="number"
                                min={0}
                                value={form.order}
                                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <Label htmlFor="pa-active">Active</Label>
                            <Switch
                                id="pa-active"
                                checked={form.isActive}
                                onCheckedChange={(v) => setForm({ ...form, isActive: v })}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={saving} className="gap-2">
                            {saving && <Loader2 className="size-4 animate-spin" />}
                            {editTarget ? "Save Changes" : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

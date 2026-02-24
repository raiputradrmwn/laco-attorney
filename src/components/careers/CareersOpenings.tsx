"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type CareerItem = {
  id: string;
  title: string;
  department: string | null;
  location: string;
  description: string | null;
  isActive: boolean;
};

const MAX_CV_SIZE_MB = 5;

export function CareersOpenings() {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareerId, setSelectedCareerId] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch("/api/careers", { cache: "no-store" });

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
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const selectedCareer = useMemo(
    () => careers.find((career) => career.id === selectedCareerId) || null,
    [careers, selectedCareerId]
  );

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCoverLetter("");
    setCvFile(null);
  };

  const handleSelectCareer = (careerId: string) => {
    if (selectedCareerId === careerId) {
      setSelectedCareerId(null);
      resetForm();
      return;
    }

    setSelectedCareerId(careerId);
    resetForm();
  };

  const handleSubmitApplication = async () => {
    if (!selectedCareerId) return;
    if (!fullName.trim() || !email.trim()) {
      toast.error("Full name and email are required");
      return;
    }
    if (!cvFile) {
      toast.error("CV file is required");
      return;
    }
    if (cvFile.size > MAX_CV_SIZE_MB * 1024 * 1024) {
      toast.error(`CV max size is ${MAX_CV_SIZE_MB}MB`);
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName.trim());
      formData.append("email", email.trim());
      formData.append("phone", phone.trim());
      formData.append("coverLetter", coverLetter.trim());
      formData.append("cv", cvFile);

      const res = await fetch(`/api/careers/${selectedCareerId}/applications`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        toast.error(payload?.error || "Failed to submit application");
        return;
      }

      toast.success("Application submitted successfully");
      resetForm();
      setSelectedCareerId(null);
    } catch (error) {
      console.error("Failed to submit career application", error);
      toast.error("Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-zinc-950 border border-white/5 p-10 md:p-24 shadow-2xl relative overflow-hidden">
      <div className="max-w-4xl relative z-10">
        <h2 className="text-4xl font-serif italic mb-12">Open Positions</h2>

        {loading ? (
          <div className="text-zinc-400 text-sm py-6">Loading open roles...</div>
        ) : careers.length === 0 ? (
          <div className="text-zinc-400 text-sm py-6">No open roles available right now.</div>
        ) : (
          <div className="space-y-6">
            {careers.map((career) => {
              const selected = selectedCareerId === career.id;

              return (
                <div key={career.id} className="border-b border-white/5 pb-6">
                  <button
                    type="button"
                    onClick={() => handleSelectCareer(career.id)}
                    className="w-full group flex items-center justify-between py-2 text-left"
                  >
                    <div>
                      <h3 className="text-xl font-serif italic group-hover:pl-4 transition-all">
                        {career.title}
                      </h3>
                      <p className="text-[10px] tracking-widest uppercase text-zinc-600 mt-2">
                        {(career.department ? `${career.department} - ` : "") + career.location}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-colors" />
                  </button>

                  {selected && (
                    <div className="mt-6 grid gap-6 border border-white/10 p-5">
                      {selectedCareer?.description && (
                        <div
                          className="prose prose-invert max-w-none text-zinc-300"
                          dangerouslySetInnerHTML={{ __html: selectedCareer.description }}
                        />
                      )}

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-zinc-400 text-xs uppercase tracking-widest">
                            Full Name
                          </Label>
                          <Input
                            id="fullName"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="bg-black border-white/10 text-white rounded-none"
                            placeholder="e.g. Jane Doe"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-zinc-400 text-xs uppercase tracking-widest">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-black border-white/10 text-white rounded-none"
                            placeholder="e.g. jane@domain.com"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-zinc-400 text-xs uppercase tracking-widest">
                            Phone (Optional)
                          </Label>
                          <Input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="bg-black border-white/10 text-white rounded-none"
                            placeholder="e.g. +62 812 0000 0000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cv" className="text-zinc-400 text-xs uppercase tracking-widest">
                            Upload CV (PDF/DOC/DOCX)
                          </Label>
                          <Input
                            id="cv"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                            className="bg-black border-white/10 text-white rounded-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="coverLetter" className="text-zinc-400 text-xs uppercase tracking-widest">
                          Cover Letter (Optional)
                        </Label>
                        <Textarea
                          id="coverLetter"
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          className="bg-black border-white/10 text-white rounded-none min-h-36"
                          placeholder="Tell us why you are a good fit for this role."
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          disabled={submitting}
                          onClick={handleSubmitApplication}
                          className="bg-white text-black hover:bg-zinc-200 rounded-none tracking-widest text-xs uppercase font-black"
                        >
                          {submitting ? (
                            <span className="inline-flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            "Submit Application"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

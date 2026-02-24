"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Leaf } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-white/10 bg-black/50 backdrop-blur-md">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8 flex flex-col justify-center" onSubmit={handleSubmit}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="w-5 h-5 text-white" />
                  <span className="text-lg font-serif font-bold tracking-widest uppercase text-white">LACO</span>
                </div>
                <h1 className="text-2xl font-serif tracking-wide text-white">Admin Portal</h1>
                <p className="text-zinc-400 text-sm font-light">
                  Enter your credentials to access the secure dashboard.
                </p>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium text-center rounded-none">
                  {error}
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="email" className="text-zinc-400 uppercase tracking-widest text-[10px]">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@laco.com"
                  className="bg-black border-white/20 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-zinc-400 uppercase tracking-widest text-[10px]">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-black border-white/20 text-white rounded-none focus-visible:ring-1 focus-visible:ring-white/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <Field className="pt-2">
                <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-zinc-200 rounded-none h-11 tracking-widest text-xs uppercase font-bold">
                  {loading ? "Authenticating..." : "Sign In"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
          <div className="bg-zinc-950 relative hidden md:block border-l border-white/5">
            <img
              src="https://images.unsplash.com/photo-1549637642-90187f64f420?q=80&w=2674&auto=format&fit=crop"
              alt="Law Firm Office"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4] dark:grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="text-sm font-serif italic text-zinc-300 gap-1 flex flex-col">
                <span className="font-sans text-xs tracking-widest uppercase opacity-50">Laco & Associates</span>
                "We provide unyielding advocacy and structural integrity for our clients worldwide."
              </p>
            </div>
            {/* Added a subtle back link as overlay */}
            <div className="absolute top-6 right-6">
              <a href="/" className="text-[10px] text-zinc-400 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                Return Home &rarr;
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

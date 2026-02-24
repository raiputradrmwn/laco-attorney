"use client";

// Render a basic 404 page when a route is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it. This satisfies Next.js <html> requirements.
export default function GlobalNotFound() {
    return (
        <html lang="en">
            <body className="bg-black text-white flex min-h-screen items-center justify-center font-sans antialiased">
                <div className="text-center">
                    <h1 className="text-4xl font-black tracking-widest mb-4">404</h1>
                    <p className="text-zinc-500 uppercase tracking-widest text-xs">Jurisdiction Not Found</p>
                </div>
            </body>
        </html>
    );
}

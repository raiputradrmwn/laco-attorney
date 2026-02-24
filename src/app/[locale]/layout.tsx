import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Toaster } from "@/components/ui/sonner";
import { Playfair_Display, Inter } from "next/font/google"; // Moved fonts here
import "../globals.css"; // Adjusted path

const playfair = Playfair_Display({
    variable: "--font-serif",
    subsets: ["latin"],
    style: ["normal", "italic"],
});

const inter = Inter({
    variable: "--font-sans",
    subsets: ["latin"],
});

export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'id' }];
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const isSupportedLocale = routing.locales.includes(
        locale as (typeof routing.locales)[number]
    );

    // Ensure that the incoming `locale` is valid
    if (!isSupportedLocale) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground flex flex-col min-h-screen`}>
                <NextIntlClientProvider messages={messages}>
                    <div className="flex min-h-screen flex-col">
                        <main className="flex-1">{children}</main>
                    </div>
                    <Toaster richColors position="top-right" />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

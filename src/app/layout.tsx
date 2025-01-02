import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import QueryProvider from '@/providers/query-provider';

const publicSans = Public_Sans({
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'El Gastador',
    description: 'A web application for budget tracking',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${publicSans.className} ${publicSans.className} antialiased`}>
                <QueryProvider>
                    {children}
                    <Toaster />
                </QueryProvider>
            </body>
        </html>
    );
}

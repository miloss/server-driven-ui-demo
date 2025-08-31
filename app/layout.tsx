import type { Metadata } from 'next';
import '../src/index.css';

export const metadata: Metadata = {
    title: 'Server-Driven UI Demo',
    description: 'A Next.js app demonstrating server-driven UI with dynamic form rendering',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
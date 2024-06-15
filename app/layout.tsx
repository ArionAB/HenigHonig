import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Metadata } from "next";
import StoreProvider from "./StoreProvider";
import Navbar from "@/components/Navbar/Navbar";


const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(defaultUrl),
    title: {
        default: "Henig Honig, miere naturală polifloră și salcâm",
        template: '%s | Henig Honig'
    },
    description: "Descriere pt henig honig",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <StoreProvider>
            <html lang="en" className={GeistSans.className}>
                <body className="bg-background text-foreground">
                    <main className="min-h-screen flex flex-col items-center">
                        <Navbar />
                        {children}
                    </main>
                </body>
            </html>
        </StoreProvider>

    );
}

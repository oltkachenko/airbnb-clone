import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ToasterProvider from "@/providers/ToasterProvider";

const font = Nunito({ 
    subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                {children}
            </body>
        </html>
    );
}

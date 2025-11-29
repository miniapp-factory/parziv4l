import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MiniAppProvider } from "@/components/context/miniapp-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { description, title } from "@/lib/metadata";

const inter = localFont({
  src: "./InterVariable.ttf",
});

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <MiniAppProvider>
          <div className="font-sans min-h-screen flex flex-col">
            <Header />
            {children}
            <nav className="fixed bottom-0 left-0 w-full bg-background border-t border-border">
              <ul className="flex justify-around p-2">
                <li><a href="#symptom" className="text-sm">Symptoms</a></li>
                <li><a href="#analysis" className="text-sm">Analysis</a></li>
                <li><a href="#chat" className="text-sm">Chat</a></li>
              </ul>
            </nav>
            <Footer />
          </div>
        </MiniAppProvider>
      </body>
    </html>
  );
}

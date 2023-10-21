import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";
import { AuthProvider } from "@/store/auth-state";

export const metadata: Metadata = {
  title: "Discord",
  description: "Discord clone",
};

const font = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, "bg-white dark:bg-[#313338]")}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

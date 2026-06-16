import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Smart IDE App",
  description: "A minimal assistant prompt UI built with Next.js and reusable React components.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-neutral-950 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;

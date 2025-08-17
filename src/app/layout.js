import { Inter } from "next/font/google";
import Script from "next/script"; // Import the Script component
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Relative Escape Plan",
  description: "Get a fake call to escape awkward situations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* This is the new, correct way to add an external script in Next.js.
          The 'strategy' prop tells Next.js not to let this script block the page from loading.
        */}
        <Script 
          src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js" 
          strategy="beforeInteractive" 
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

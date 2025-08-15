import { Inter } from "next/font/google";
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
        {/* This script tag loads the Tone.js library, which we'll use to create the ringtone. */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

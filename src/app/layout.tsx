import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Book Shelf',
  description: 'Your personal library for book lovers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        
        {/* ========================================================= */}
        {/*  THIS IS YOUR GLOBAL ORANGE-TO-PINK GRADIENT WALLPAPER  */}
        {/* ========================================================= */}
<div className="absolute inset-0 -z-10" style={{ background: "white" }}>
        <svg
          className="w-full h-full"
          viewBox="0 0 1920 1078"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="paint0_linear_7_126" x1="533.5" y1="-250.046" x2="930.38" y2="1569.83" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FA7C54"/>
              <stop offset="1" stopColor="#EC2C5A"/>
            </linearGradient>
          </defs>
          <path d="M422.191 543.979C192.258 503.244 -0.0049549 1077.16 -0.0049549 1077.16L-24.5485 0.28931L2015.36 -70.4756L1632.2 225.998C1632.2 225.998 1048.5 730.186 840.631 745.682C632.759 761.179 626.854 580.237 422.191 543.979Z" fill="url(#paint0_linear_7_126)"/>
        </svg>
      </div>
        
        {/* All your pages (like the white panel) will render here */}
        {children}

      </body>
    </html>
  );
}
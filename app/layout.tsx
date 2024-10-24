
import { IBM_Plex_Sans } from 'next/font/google';
import "./globals.css";
import {cn} from "@/lib/utils"
import { ClerkProvider } from "@clerk/nextjs";


const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans'
});
// Example metadata
export const metadata = {
  title: 'IMImaginify',
  description: 'An AI-powered image generator'
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={cn("font-IBMPlex antialiased", ibmPlexSans.variable)}>
        {children}
      </body>
    </html>
  </ClerkProvider>
  
  );
}

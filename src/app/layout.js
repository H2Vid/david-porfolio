import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "david portfolio",
  description: "portfolio david sitompul",

  icons: {
    icon: "/profile.webp",
  },

  openGraph: {
    title: "David Sitompul — Web Developer & Web Designer",
    description: "Portfolio of David Sitompul, a Web Developer & Web Designer.",
    images: [
      {
        url: "/profile.webp",
        alt: "David Sitompul — Web Developer & Web Designer",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.className} scroll-smooth`}>
      <body className="cursor-none">
        <CustomCursor />
        <PageTransition />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

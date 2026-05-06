import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingEnquiry from "./components/FloatingEnquiry"; 

const poppins = Poppins({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://durg-bhumi-resort.com"),

  title: {
    default: "DurgBhumi Resort",
    template: "%s | DurgBhumi Resort",
  },

  description:
    "Experience luxury, peace, and nature at DurgBhumi Resort. Premium stays, fine dining, wellness, and unforgettable escapes in a beautiful natural setting.",

  keywords: [
    "DurgBhumi Resort",
    "Luxury Resort",
    "Nature Resort",
    "Forest Resort",
    "Hotel",
    "Vacation Stay",
    "Weekend Getaway",
    "Luxury Rooms",
    "Resort Booking",
    "Wellness Retreat",
  ],

  authors: [{ name: "DurgBhumi Resort" }],
  creator: "DurgBhumi Resort",
  publisher: "DurgBhumi Resort",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "DurgBhumi Resort",
    description:
      "Luxury nature resort offering elegant stays, dining, wellness, and memorable experiences.",
    url: "https://durg-bhumi-resort.com",
    siteName: "DurgBhumi Resort",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/common/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DurgBhumi Resort",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DurgBhumi Resort",
    description:
      "Luxury nature resort offering elegant stays, dining, wellness, and memorable experiences.",
    images: ["/images/common/og-image.jpg"],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  manifest: "/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#556B2F",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable}`}
    >
      <body>
        <Navbar/>
        <BootstrapClient />
        {children}
<Footer/>
        <FloatingEnquiry />
      </body>
    </html>
  );
}
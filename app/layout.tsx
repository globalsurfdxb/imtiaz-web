import FloatingRightIcons from "./components/common/FloatingIcons";
import { LenisProvider } from "@/app/contexts/LenisContext";
import "./globals.css";
import InnerFooter from "./components/layout/InnerFooter";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.uat.imtiaz.ae/"
  ),
  robots: {
    index: false,
    follow: false,
  },
  // ...any other existing metadata you already have here
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body className="antialiased">
        <LenisProvider>
          <FloatingRightIcons />
          {children}
          {/* <InnerFooter /> */}
          
          
        </LenisProvider>
        
        {/* <Script
        id="wotnot-chat"
          src="https://app.wotnot.io/chat-widget/6oLSHVYKARyW052813950292EguttAVa.js"
          strategy="lazyOnload"
        /> */}
      </body>
    </html>
  );
}
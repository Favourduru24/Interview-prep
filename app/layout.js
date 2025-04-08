import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Provider from "@/components/Provider";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "PrepWise",
  description: "An AI-powered platform Mock Interview ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
       <Provider>
      <body
        className={`${monaSans.className} antialiased pattern`}
      >
         <Toaster/>
        {children}
      </body>
      </Provider>
    </html>
  );
}

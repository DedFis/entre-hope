import type { Metadata } from "next";
import localFont from "next/font/local";
import './globals.css'

import { ClerkProvider } from "@clerk/nextjs";
import { Sidebar, Navbar } from "../components/ui";
// import { StateContextProvider } from "../context"; // Import the context provider

export const metadata: Metadata = {
  title: "Crowdfunding App",
  description: "A decentralized crowdfunding platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>  
      <html lang="en">
        <body>
          {/* <StateContextProvider> */}
            <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
              {/* Sidebar */}
              <div className="sm:flex hidden mr-10 relative">
                <Sidebar />
              </div>

              {/* Main Content */}
              <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
                <Navbar />
                {children}
              </div>
            </div>
          {/* </StateContextProvider> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
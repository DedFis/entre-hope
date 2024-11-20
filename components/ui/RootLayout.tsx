import type { Metadata } from "next";
import { StateContextProvider } from "@/context";
import { Sidebar, Navbar } from "./";

export const metadata: Metadata = {
    title: "Crowdfunding App",
    description: "A decentralized crowdfunding platform.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StateContextProvider>
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
    </StateContextProvider>
  );
};

export default RootLayout;

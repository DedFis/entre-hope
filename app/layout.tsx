"use client"

import localFont from "next/font/local";
import './globals.css'

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { usePathname } from "next/navigation";
import { RootLayout } from "@/components/ui";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  const route = usePathname()
  const isAuthRoute = route.startsWith("/sign-in") || route.startsWith("/sign-up");

  return isAuthRoute ? (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        }
      }}
    >  
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  ) : (
    <ClerkProvider>  
      <html lang="en">
        <body>
          <RootLayout>
            {children}
          </RootLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
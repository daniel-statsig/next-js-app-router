import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { getStableId, getStatsigValues } from "./StatsigHelpers"; // todo: Get values from statsig-node
import { BootstrappedStatsigProvider } from "./BootstrappedStatsigProvider";
import { StatsigUser } from "statsig-node";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: StatsigUser = {
    userID: "anonymous",
  };

  const stableID = getStableId();
  if (stableID) {
    user.customIDs = { stableID };
  }

  const { values, clientSdkKey } = await getStatsigValues(user);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <BootstrappedStatsigProvider
          clientSdkKey={clientSdkKey}
          initialUser={user}
          initialValues={values}
        >
          {children}
        </BootstrappedStatsigProvider>
      </body>
    </html>
  );
}

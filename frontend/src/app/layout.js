// import modules
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
import "@rainbow-me/rainbowkit/styles.css";
import Providers from "@/context/Providers";
import {headers} from "next/headers";

export const metadata = {
  title: "web3thrive",
  description: "Your gateway to future freelancing",
};

export default async function RootLayout({ children }) {
  const cookie = (await headers()).get("cookie");
  return (
    <html lang="en">
      <body>
        <Providers cookie={cookie}>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}

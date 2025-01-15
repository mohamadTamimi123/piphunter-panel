import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google"
import localFont from "next/font/local";

export  const kalame = localFont({
  src: "../config/kalame/KalamehWeb-Regular.woff2",
  variable: "--font-kalame",
});


export const kalameBold = localFont({
  src: "../config/kalame/KalamehWeb-Bold.woff2",
  variable: "--font-kalame-bold",
});
import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import initFirebase from "@/firebase";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  initFirebase();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider>
        <ClerkProvider {...pageProps}>
          <Component {...pageProps} />
        </ClerkProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};

import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
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
        <ClerkProvider
          appearance={{
            variables: { colorPrimary: "#000000" },
            elements: {
              formButtonPrimary:
                "bg-black border border-black border-solid hover:bg-white hover:text-black",
              socialButtonsBlockButton:
                "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
              socialButtonsBlockButtonText: "font-semibold",
              formButtonReset:
                "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
              membersPageInviteButton:
                "bg-black border border-black border-solid hover:bg-white hover:text-black",
              card: "bg-[#fafafa]",
            },
          }}
        >
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

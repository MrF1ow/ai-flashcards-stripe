"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAuth, useClerk } from "@clerk/nextjs";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";

export const Navbar = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();

  const handleSignIn = () => {
    router.push("/sign-in");
  };
  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleLogout = () => {
    signOut({ redirectUrl: "/" });
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Flashcards AI</p>
          </NextLink>
        </NavbarBrand>
        {isSignedIn && (
          <div className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </div>
        )}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
          {isSignedIn && <IoIosLogOut size={22} onClick={handleLogout} />}
        </NavbarItem>
        {!isSignedIn && (
          <NavbarItem className="hidden sm:flex gap-2">
            <Button
              className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
              radius="sm"
              size="md"
              variant="solid"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
            <Button
              className="bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white shadow-lg"
              radius="sm"
              size="md"
              variant="solid"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Flashcards AI",
  description:
    "Flashcards AI is a flashcard app that uses AI to help you learn faster.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Learn",
      href: "/learn",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Learn",
      href: "/learn",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/MrF1ow/ai-flashcards-stripe",
  },
};

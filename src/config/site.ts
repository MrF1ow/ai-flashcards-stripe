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
      label: "Generate",
      href: "/generate",
    },
    {
      label: "Flashcards",
      href: "/flashcards",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Generate",
      href: "/generate",
    },
    {
      label: "Flashcards",
      href: "/flashcards",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  sectionItems: [
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "Pricing",
      href: "#pricing",
    },
  ],
};

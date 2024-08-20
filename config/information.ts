import { TbWorld } from "react-icons/tb";
import { FaGear } from "react-icons/fa6";
import { PiMagicWandFill } from "react-icons/pi";
import { CardComponentProps, PricingPlanProps } from "@/types";

export const featureCards: CardComponentProps[] = [
  {
    Icon: PiMagicWandFill,
    title: "Simple Text Input",
    description:
      "Seamlessly convert your text input into interactive flashcards.",
  },
  {
    Icon: FaGear,
    title: "Smart Flashcards",
    description:
      "Our software breaks down concepts into concise flashcards, perfect for studying.",
  },
  {
    Icon: TbWorld,
    title: "Accessible Everywhere ",
    description:
      "Save and access your flashcard sets from any device, at any time.",
  },
];

export const pricingPlans: PricingPlanProps[] = [
  {
    type: "free",
    name: "Free Tier",
    price: "$0/mo",
    features: ["Limited number of flashcard generations (up to 3 per day)"],
  },
  {
    type: "pro",
    name: "Pro",
    price: "$10/mo",
    features: [
      "Advanced analysis",
      "Unlimited flashcard generations",
      "Ad-free experience",
      "Priority customer support",
    ],
  },
];

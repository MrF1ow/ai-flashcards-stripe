import { SVGProps } from "react";
import { IconType } from "react-icons";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FlashcardProps = {
  front: string;
  back: string;
};
export interface FlashcardSetProps {
  name: string;
  flashcards: FlashcardProps[];
}

export interface CardComponentProps {
  Icon: IconType;
  title: string;
  description: string;
}

export interface PricingPlanProps {
  type: "free" | "pro";
  name: string;
  price: string;
  features: string[];
}

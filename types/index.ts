import { SVGProps } from "react";

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

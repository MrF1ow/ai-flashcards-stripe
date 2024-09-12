import { motion } from "framer-motion";

import FeatureCard from "./components/feature-card";

import SectionLayout from "@/layouts/section";
import { title } from "@/components/primitives";
import { featureCards } from "@/config/information";

const FeaturesSection = () => {
  return (
    <SectionLayout color="#FF1CF7">
      <div className="w-full text-center pb-8">
        <div className="pb-8">
          <h1 className={title({ size: "sm" })}>
            Stop Wasting Time Making Flashcards!
          </h1>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {featureCards.map((card, index) => (
          <motion.div key={index} className="flex-1 min-w-0">
            <FeatureCard
              Icon={card.Icon}
              description={card.description}
              title={card.title}
            />
          </motion.div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default FeaturesSection;

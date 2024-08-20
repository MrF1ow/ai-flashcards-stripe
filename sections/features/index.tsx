import { motion } from "framer-motion";

import SectionLayout from "@/layouts/section";
import { subtitle, title } from "@/components/primitives";
import { featureCards } from "@/config/information";
import FeatureCard from "./components/feature-card";

const FeaturesSection = () => {
  return (
    <SectionLayout>
      <div className="w-full text-center pb-8">
        <div className="pb-8">
          <h1 className={title({ size: "sm", color: "violet" })}>
            Stop Wasting Time Making Flashcards! 
          </h1>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {featureCards.map((card, index) => (
          <motion.div key={index} className="flex-1 min-w-0">
            <FeatureCard
              Icon={card.Icon}
              title={card.title}
              description={card.description}
            />
          </motion.div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default FeaturesSection;
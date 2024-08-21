"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionLayout from "@/layouts/section";
import { title } from "@/components/primitives";
import { pricingPlans } from "@/config/information";
import PricingCard from "./components/pricing-card";

const PricingSection = () => {
  return (
    <SectionLayout>
      <div className="w-full text-center pb-8">
        <div className="pb-8">
          <h1 className={title({ size: "sm", color: "violet" })}>
            Get Started Today!
          </h1>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        {pricingPlans.map((card, index) => (
          <div key={index} className="flex-1 min-w-0">
            <PricingCard
              key={index}
              type={card.type}
              name={card.name}
              price={card.price}
              features={card.features}
            />
          </div>
        ))}
      </div>
    </SectionLayout>
  );
};

export default PricingSection;

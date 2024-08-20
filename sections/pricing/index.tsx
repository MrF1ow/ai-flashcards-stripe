"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionLayout from "@/layouts/section";

const PricingSection = () => {
  const plans = [
    {
      name: "Free Tier",
      price: "$0.00/mo",
      features: [
        "Limited number of flashcard generations (up to 3 per day)",
      ]
    },
    {
      name: "Premium Tier",
      price: "$4.99/mo",
      features: [
        "Advanced analysis",
        "Unlimited flashcard generations",
        "Ad-free experience",
        "Priority customer support"
      ]
    },
    {
      name: "Artist Tier",
      price: "$9.99/mo",
      features: [
        "All Premium Tier features",
        "Get to flex that you are rich"
      ]
    }
  ];

  return (
    <SectionLayout>
      <section className="py-20 bg-white" id="pricing">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Choosing the Right Plan</h3>
          <div className="grid grid-cols-1 gap-8">
            {plans.map((plan, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
              >
                <h4 className="text-2xl font-bold mb-4">{plan.name}</h4>
                <p className="text-xl mb-4">{plan.price}</p>
                <ul className="list-disc list-inside mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">{feature}</li>
                  ))}
                </ul>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300">
                  Choose Plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SectionLayout>
  );
};

export default PricingSection;
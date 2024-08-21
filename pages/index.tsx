import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button } from "@nextui-org/button";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { container, moveIn } from "@/components/movements";
import FeaturesSection from "@/sections/features";
import PricingSection from "@/sections/pricing";

export default function IndexPage() {
  const router = useRouter();

  return (
    <>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-allIsh">
          <div className="text-center">
            <motion.div
              animate="animate"
              initial="initial"
              variants={container}
            >
              <motion.h1
                className={title({
                  size: "lg",
                  color: "violet",
                  fullWidth: true,
                })}
                variants={moveIn}
              >
                Welcome to Flashcard AI
              </motion.h1>
              <br />
              <motion.h1
                className={title({ size: "sm", fullWidth: true })}
                variants={moveIn}
              >
                The easiest way to create flashcards from your text.
              </motion.h1>
              <motion.div
                className="pt-8 flex items-center justify-center gap-4"
                variants={moveIn}
              >
                <Button
                  color="secondary"
                  radius="md"
                  size="lg"
                  variant="shadow"
                  onClick={() => router.push("/generate")}
                >
                  Get Started
                </Button>
                <Button color="default" radius="md" size="lg" variant="ghost">
                  Learn More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </DefaultLayout>
      <FeaturesSection />
      <PricingSection />
    </>
  );
}

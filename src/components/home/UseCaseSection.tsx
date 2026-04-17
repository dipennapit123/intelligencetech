"use client";

import { motion } from "framer-motion";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/AnimatedSection";

const useCases = [
  { icon: "person", title: "Individuals", desc: "Personal intelligence tools to manage knowledge, automate basic tasks, and organize life." },
  { icon: "palette", title: "Creators", desc: "Sophisticated workflows for visual storytellers and digital architects to scale their output." },
  { icon: "corporate_fare", title: "Businesses", desc: "Enterprise-grade infrastructure with advanced security and multi-team collaboration built-in." },
];

export function UseCaseSection() {
  return (
    <section className="py-28 px-8 bg-surface-container-high/30">
      <div className="max-w-screen-2xl mx-auto">
        <FadeUp className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-6">
            Built for Every Scale
          </h2>
          <p className="text-on-surface-variant text-lg tracking-normal">
            Whether you are building your first app or managing a global
            enterprise, we have the tools to propel you forward.
          </p>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {useCases.map((uc) => (
            <StaggerItem key={uc.title}>
              <motion.div
                whileHover={{ y: -6, backgroundColor: "var(--color-surface-container-lowest)" }}
                transition={{ duration: 0.3 }}
                className="bg-surface p-14 group cursor-default"
              >
                <div className="mb-8">
                  <span className="material-symbols-outlined text-5xl text-outline-variant group-hover:text-primary transition-colors duration-300">
                    {uc.icon}
                  </span>
                </div>
                <h4 className="text-2xl mb-4 tracking-normal">{uc.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed tracking-normal">
                  {uc.desc}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

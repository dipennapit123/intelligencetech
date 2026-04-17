"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export type HeroData = {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  imageUrl: string;
  imageAlt: string;
};

const FALLBACK: HeroData = {
  eyebrow: "The Next Frontier",
  headlineLine1: "Intelligence,",
  headlineLine2: "Engineered.",
  body: "A growing ecosystem of intelligent SaaS products designed to streamline workflows, optimize growth, and redefine the standard of modern enterprise tools.",
  primaryCta: { label: "Explore Products", href: "/products" },
  secondaryCta: { label: "Watch Demo", href: "/updates" },
  imageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBvKMEBsEr8oTeuZQHM5ffRxWUc6r2X1U7VR8d2uavy9sMROUpRlZuW2Fdr9SOu8X6tvnmzR4IUnMDp5mxQkFXQiizPTxxiFZkkJ_9tLUEEL2BoIs6cELTON6Nv_cCECnkI4n17gmEZrWwmCm679KdRofXtk41i0ObXshs3zAoBVhf4kCDUpl2tpHQ6xrwNJBG_uLcO2d4vfPGowrXkgrKiSm7qzfhk8jDryu0uq8Gj1dM0em_4n9SlZ6M6KGVMQB0TofApmGI9QP0Z",
  imageAlt:
    "Abstract 3D architectural render with glowing amber nodes and sleek metallic surfaces representing neural network architecture",
};

export function HeroSection({ data }: { data?: HeroData | null }) {
  const d = data ?? FALLBACK;

  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24 md:pb-36 px-4 sm:px-6 md:px-8">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center gap-10 sm:gap-14 md:gap-20">
        <div className="w-full md:w-1/2 space-y-7 sm:space-y-9 md:space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs tracking-widest uppercase"
          >
            {d.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight"
          >
            {d.headlineLine1}
            <br />
            <span className="text-primary">{d.headlineLine2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-lg leading-relaxed tracking-normal"
          >
            {d.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-5 pt-2 w-full"
          >
            <Link
              className="bg-primary text-on-primary px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center"
              href={d.primaryCta.href}
            >
              {d.primaryCta.label}
            </Link>
            <Link
              className="bg-surface-container-high text-on-surface px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg hover:bg-surface-container-highest transition-all hover:-translate-y-0.5 text-center"
              href={d.secondaryCta.href}
            >
              {d.secondaryCta.label}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          className="w-full md:w-1/2 relative"
        >
          <div className="aspect-4/3 sm:aspect-square bg-surface-container-low rounded-3xl sm:rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt={d.imageAlt}
              src={d.imageUrl}
            />
          </div>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -right-12 w-64 h-64 bg-primary-container/20 blur-[100px] -z-10"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.45, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary-container/30 blur-[100px] -z-10"
          />
        </motion.div>
      </div>
    </section>
  );
}

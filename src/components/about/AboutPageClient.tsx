"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/AnimatedSection";

type AboutData = {
  label: string;
  heading: string;
  body: string;
  pillars: Array<{ icon: string; title: string; desc: string }>;
  stats: Array<{ value: string; label: string }>;
};

const FALLBACK: AboutData = {
  label: "About Us",
  heading: "We build the tools that build the future.",
  body: "Intelligence Tech is a product-driven technology company building a connected ecosystem of SaaS tools designed for the modern enterprise. From autonomous scaling to generative automation, our products share a singular intelligence layer that makes every tool smarter.",
  pillars: [
    { icon: "rocket_launch", title: "Our Mission", desc: "To democratize intelligent software — making enterprise-grade tools accessible to teams of every size." },
    { icon: "visibility", title: "Our Vision", desc: "A world where every business decision is powered by interconnected, self-optimizing software systems." },
    { icon: "diversity_3", title: "Our Culture", desc: "Remote-first, builder-focused, and deeply committed to shipping products that people genuinely love." },
  ],
  stats: [
    { value: "4+", label: "Products Shipped" },
    { value: "99.9%", label: "Platform Uptime" },
    { value: "10K+", label: "Active Users" },
    { value: "40%", label: "Avg. Cost Savings" },
  ],
};

export function AboutPageClient({ data }: { data?: AboutData | null }) {
  const d = data ?? FALLBACK;

  return (
    <main>
      <section className="pt-20 sm:pt-24 md:pt-28 pb-14 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-screen-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="text-primary tracking-widest text-xs uppercase block mb-4">
              {d.label}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-6 sm:mb-8">{d.heading}</h1>
            <p className="text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed tracking-normal">
              {d.body}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-surface-container-low">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {d.pillars.map((item, i) => (
              <FadeUp key={item.title} delay={i * 0.15}>
                <div className="space-y-4">
                  <span className="material-symbols-outlined text-primary text-4xl">{item.icon}</span>
                  <h3 className="text-2xl tracking-normal">{item.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed tracking-normal">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp>
            <h2 className="text-3xl sm:text-4xl tracking-tight mb-8 sm:mb-12">By the numbers</h2>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {d.stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl text-primary tracking-tight mb-2">{stat.value}</div>
                  <div className="text-on-surface-variant text-sm uppercase tracking-widest">{stat.label}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

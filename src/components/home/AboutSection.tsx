"use client";

import Link from "next/link";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/AnimatedSection";

export type AboutData = {
  label: string;
  heading: string;
  body: string;
  pillars: Array<{ icon: string; title: string; desc: string }>;
  stats: Array<{ value: string; label: string }>;
};

const FALLBACK: AboutData = {
  label: "About Us",
  heading: "We build the tools that build the future.",
  body: "Intelligence Tech is a product-driven technology company building a connected ecosystem of SaaS tools designed for the modern enterprise. Our platform shares a singular intelligence layer that makes every tool smarter — together.",
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

export function AboutSection({ data }: { data?: AboutData | null }) {
  const d = data ?? FALLBACK;

  return (
    <section className="py-28 px-8 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 items-start">
          <FadeUp className="space-y-7 max-w-2xl">
            <span className="text-primary tracking-widest text-xs uppercase block">
              {d.label}
            </span>
            <h2 className="text-4xl md:text-5xl tracking-tight leading-tight">
              {d.heading}
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed tracking-normal">
              {d.body}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/about"
                className="bg-primary text-on-primary px-7 py-3 rounded-xl hover:brightness-110 transition-all shadow-lg hover:shadow-xl"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="bg-surface-container-high text-on-surface px-7 py-3 rounded-xl hover:bg-surface-container-highest transition-all"
              >
                Contact Us
              </Link>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
            {d.pillars.map((item) => (
              <StaggerItem key={item.title} className="bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">
                      {item.icon}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl tracking-normal">{item.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed tracking-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="mt-20 pt-14 border-t border-outline-variant/20">
          <FadeUp>
            <h3 className="text-3xl md:text-4xl tracking-tight mb-10">
              By the numbers
            </h3>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {d.stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl text-primary tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className="text-on-surface-variant text-[11px] uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

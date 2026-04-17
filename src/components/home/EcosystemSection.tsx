"use client";

import { motion } from "framer-motion";
import { FadeUp, SlideInLeft, SlideInRight } from "@/components/motion/AnimatedSection";

export function EcosystemSection() {
  return (
    <section className="py-28 px-8 overflow-hidden bg-surface">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <SlideInLeft className="w-full md:w-2/5 order-2 md:order-1">
            <div className="relative">
              <div className="w-full aspect-square flex items-center justify-center">
                <div className="relative w-80 h-80">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-outline-variant/30"
                  />
                  <div className="absolute inset-0 m-auto w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-2xl z-20">
                    <span
                      className="material-symbols-outlined text-on-primary text-4xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      dataset
                    </span>
                  </div>
                  {[
                    { pos: "top-0 left-1/2 -translate-x-1/2", icon: "analytics", color: "text-primary" },
                    { pos: "bottom-0 left-1/2 -translate-x-1/2", icon: "cloud_sync", color: "text-secondary" },
                    { pos: "left-0 top-1/2 -translate-y-1/2", icon: "security", color: "text-primary" },
                    { pos: "right-0 top-1/2 -translate-y-1/2", icon: "api", color: "text-secondary" },
                  ].map((node, i) => (
                    <motion.div
                      key={node.icon}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.8, delay: 0.35 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ scale: 1.15, y: -4 }}
                      className={`absolute ${node.pos} w-16 h-16 bg-white shadow-xl rounded-xl flex items-center justify-center border border-outline-variant/10`}
                    >
                      <span className={`material-symbols-outlined ${node.color}`}>
                        {node.icon}
                      </span>
                    </motion.div>
                  ))}
                  <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100">
                    <line className="text-outline-variant" stroke="currentColor" strokeWidth="0.5" x1="50" x2="50" y1="20" y2="50" />
                    <line className="text-outline-variant" stroke="currentColor" strokeWidth="0.5" x1="50" x2="50" y1="80" y2="50" />
                    <line className="text-outline-variant" stroke="currentColor" strokeWidth="0.5" x1="20" x2="50" y1="50" y2="50" />
                    <line className="text-outline-variant" stroke="currentColor" strokeWidth="0.5" x1="80" x2="50" y1="50" y2="50" />
                  </svg>
                </div>
              </div>
            </div>
          </SlideInLeft>

          <SlideInRight className="w-full md:w-3/5 order-1 md:order-2 space-y-8">
            <span className="text-primary tracking-widest text-xs uppercase block">
              Unified Engine
            </span>
            <h2 className="text-4xl md:text-5xl leading-tight tracking-tight">
              Connected by a singular intelligence layer.
            </h2>
            <p className="text-lg text-on-surface-variant leading-relaxed tracking-normal">
              Every tool in the Intelligence Tech ecosystem communicates through
              our proprietary Neural Mesh. This ensures that data gathered in
              OmniGraph directly informs the automation sequences in FlowGenie,
              creating a self-optimizing loop.
            </p>
            <ul className="space-y-5">
              {[
                { title: "Zero-Config Interoperability", desc: "Products sync instantly with a single unified identity." },
                { title: "Universal Data Fabric", desc: "One source of truth across all organizational functions." },
              ].map((item, i) => (
                <FadeUp key={item.title} delay={0.1 * i}>
                  <li className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-0.5">check_circle</span>
                    <div>
                      <strong className="block text-on-surface text-base">{item.title}</strong>
                      <span className="text-sm text-on-surface-variant tracking-normal">{item.desc}</span>
                    </div>
                  </li>
                </FadeUp>
              ))}
            </ul>
          </SlideInRight>
        </div>
      </div>
    </section>
  );
}

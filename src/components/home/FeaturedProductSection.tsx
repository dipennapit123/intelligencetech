"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FadeUp, ScaleIn } from "@/components/motion/AnimatedSection";

export function FeaturedProductSection() {
  return (
    <section className="py-36 px-8">
      <div className="max-w-screen-2xl mx-auto bg-inverse-surface rounded-[2.5rem] p-12 md:p-20 overflow-hidden relative">
        <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <FadeUp className="w-full lg:w-1/2 space-y-8">
            <div className="flex items-center gap-2 text-primary-container text-sm tracking-wider">
              <span className="material-symbols-outlined">stars</span>
              Featured Product
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-none">
              ScaleWise Enterprise
            </h2>
            <p className="text-lg text-white/60 leading-relaxed tracking-normal">
              The industry standard for autonomous infrastructure. Predict load
              before it happens and scale without a single manual intervention.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              {[
                { value: "99.9%", label: "Uptime Guaranteed" },
                { value: "40%", label: "Cost Reduction" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.85, delay: 0.55 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-white text-3xl mb-1">{stat.value}</div>
                  <div className="text-white/40 text-xs uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
            <Link
              className="inline-flex bg-primary text-on-primary px-8 py-4 rounded-xl text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              href="/products/scalewise"
            >
              Try ScaleWise
            </Link>
          </FadeUp>

          <ScaleIn className="w-full lg:w-1/2">
            <div className="bg-zinc-900 rounded-2xl p-4 shadow-2xl border border-zinc-800">
              <div className="flex items-center gap-2 mb-4 px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="aspect-video bg-zinc-950 rounded-lg overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full object-cover opacity-60"
                  alt="Clean dashboard interface with glowing orange line charts and dark data tables showing cloud infrastructure metrics"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOAbucxLWL1CQOOp8fEMXo9d_126zxnkKl7gJ0DgtlCpQ1nXKbcfhgOxvp1DOQCyWEVmh_xlajAKJSkHLJhyzU64zdQWyHtpAvgbdNl7qKBYIi8MgWaso7jDhOM6uQXnhNSgpjZEDJ4P9_CfUemm92G0XH2Jgdq-OWVEUfK-X0ZLnrEFq4iKXR3cWG6E4VflrHlrAUg4id-oBHmokGsanM_XG9vapk1Oqyl-5GfbKS_kNWdzLu5jPYEmKeREajgFXGrJEuosl7qjgE"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.95, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center"
                      >
                        <span className="material-symbols-outlined text-on-primary-container">
                          bolt
                        </span>
                      </motion.div>
                      <div>
                        <div className="text-white text-sm tracking-normal">
                          Autonomous Scaling Active
                        </div>
                        <div className="text-white/50 text-[10px] tracking-wider">
                          Processing 14,281 events/sec
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>

        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { FadeUp } from "@/components/motion/AnimatedSection";
import { useState } from "react";

type ContactData = {
  eyebrow: string;
  heading: string;
  body: string;
  details: Array<{ icon: string; label: string; value: string }>;
};

const FALLBACK: ContactData = {
  eyebrow: "Contact Us",
  heading: "Let's talk.",
  body: "Whether you have a question about our products, need a demo, or want to explore partnership opportunities — we'd love to hear from you.",
  details: [
    { icon: "mail", label: "Email", value: "support@intelligencetech.com" },
    { icon: "location_on", label: "Headquarters", value: "500 Silicon Way, San Francisco, CA 94105" },
    { icon: "schedule", label: "Business Hours", value: "Mon – Fri, 9:00 AM – 6:00 PM PST" },
  ],
};

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface tracking-normal focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all";

export function ContactPageClient({ data }: { data?: ContactData | null }) {
  const d = data ?? FALLBACK;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message,
          website,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="pt-28 pb-20 px-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-primary tracking-widest text-xs uppercase block mb-4">
                {d.eyebrow}
              </span>
              <h1 className="text-5xl md:text-6xl tracking-tight mb-8">{d.heading}</h1>
              <p className="text-xl text-on-surface-variant leading-relaxed tracking-normal mb-12">
                {d.body}
              </p>

              <div className="space-y-8">
                {d.details.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-primary mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-on-surface text-sm uppercase tracking-widest mb-1">{item.label}</div>
                      <div className="text-on-surface-variant tracking-normal">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <FadeUp delay={0.2}>
              {submitted ? (
                <div className="bg-surface-container-low rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                  <span className="material-symbols-outlined text-primary text-6xl">check_circle</span>
                  <h3 className="text-2xl tracking-normal">Message sent!</h3>
                  <p className="text-on-surface-variant tracking-normal">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => void handleSubmit(e)}
                  className="relative bg-surface-container-low rounded-2xl p-10 space-y-6"
                >
                  {error && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm text-on-surface tracking-normal" htmlFor="contact-first">
                        First Name
                      </label>
                      <input
                        id="contact-first"
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="given-name"
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-on-surface tracking-normal" htmlFor="contact-last">
                        Last Name
                      </label>
                      <input
                        id="contact-last"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="family-name"
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-on-surface tracking-normal" htmlFor="contact-email">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-on-surface tracking-normal" htmlFor="contact-message">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`${inputClass} resize-none`}
                      minLength={10}
                    />
                  </div>
                  {/* Honeypot — leave hidden; bots often fill this */}
                  <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-on-primary py-4 rounded-xl text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl disabled:opacity-60"
                  >
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}

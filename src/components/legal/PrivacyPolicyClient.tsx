"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion/AnimatedSection";

type PrivacySection = {
  title: string;
  type: "cards" | "bullets" | "mixed" | "paragraph";
  body?: string;
  intro?: string;
  items?: Array<string | { title: string; body: string }>;
};

type PrivacyData = {
  lastUpdated: string;
  intro: string;
  sections: PrivacySection[];
  contactEmail: string;
  contactAddress: string;
};

const FALLBACK: PrivacyData = {
  lastUpdated: "April 15, 2026",
  intro: "At Intelligence Tech, protecting your privacy is fundamental to our mission. This policy explains how we collect, use, and safeguard your information.",
  sections: [
    {
      title: "Information we collect",
      type: "cards",
      items: [
        { title: "Information you provide", body: "Account details, contact information, and any content you submit through our platform." },
        { title: "Usage information", body: "How you interact with our services, including pages visited, features used, and time spent." },
        { title: "Cookies & tracking", body: "We use cookies and similar technologies to remember preferences and improve experience." },
        { title: "Log data", body: "Server logs that include IP address, browser type, and referring pages." },
      ],
    },
    {
      title: "How we use information",
      type: "bullets",
      items: [
        "To provide, maintain, and improve our services",
        "To communicate with you about updates and changes",
        "To detect and prevent fraud or abuse",
        "To comply with legal obligations",
        "To personalize your experience",
      ],
    },
    {
      title: "How we share information",
      type: "mixed",
      intro: "We do not sell your personal information. We may share data with:",
      items: [
        "Service providers who assist in operations",
        "Legal authorities when required by law",
        "Business partners with your consent",
        "Affiliated companies within our ecosystem",
      ],
    },
    {
      title: "Data retention & security",
      type: "paragraph",
      body: "We retain your data only as long as necessary for the purposes outlined in this policy. We employ industry-standard encryption, access controls, and monitoring to protect your information.",
    },
    {
      title: "Your choices & rights",
      type: "paragraph",
      body: "You can access, update, or delete your account information at any time. You may opt out of marketing communications. Depending on your jurisdiction, you may have additional rights under GDPR, CCPA, or similar regulations.",
    },
  ],
  contactEmail: "support@intelligencetech.com",
  contactAddress: "HQ: 500 Silicon Way, CA",
};

function SectionBlock({ title, children, tone = "white" }: { title: string; children: React.ReactNode; tone?: "white" | "grey" }) {
  return (
    <section className={tone === "grey" ? "bg-surface-container-low" : "bg-surface"}>
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <FadeUp className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface">{title}</h2>
          <div className="text-on-surface-variant leading-relaxed">{children}</div>
        </FadeUp>
      </div>
    </section>
  );
}

export function PrivacyPolicyClient({ data }: { data?: Record<string, unknown> | null }) {
  const d = (data as unknown as PrivacyData) ?? FALLBACK;

  return (
    <main className="pt-28">
      <section className="bg-surface">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
          <FadeUp className="space-y-5">
            <span className="text-primary font-bold tracking-widest text-[0.6875rem] uppercase block">Legal</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-on-surface">
              Privacy Policy<span className="text-primary">.</span>
            </h1>
            <p className="text-on-surface-variant max-w-2xl leading-relaxed">{d.intro}</p>
            <p className="text-sm text-on-surface-variant">
              Last updated: <span className="font-semibold text-on-surface">{d.lastUpdated}</span>
            </p>
          </FadeUp>
        </div>
      </section>

      {d.sections.map((sec, idx) => {
        const tone = idx % 2 === 0 ? "grey" : "white";

        if (sec.type === "cards") {
          return (
            <SectionBlock key={sec.title} title={sec.title} tone={tone as "grey" | "white"}>
              <StaggerContainer className="grid md:grid-cols-2 gap-6 md:gap-8 mt-8">
                {(sec.items as Array<{ title: string; body: string }>)?.map((card) => (
                  <StaggerItem key={card.title} className="rounded-2xl border border-outline-variant/15 bg-surface px-6 py-6 shadow-[0_18px_48px_rgba(20,33,61,0.06)]">
                    <div className="space-y-2">
                      <div className="font-bold text-on-surface">{card.title}</div>
                      <div className="text-sm text-on-surface-variant leading-relaxed">{card.body}</div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </SectionBlock>
          );
        }

        if (sec.type === "bullets") {
          return (
            <SectionBlock key={sec.title} title={sec.title} tone={tone as "grey" | "white"}>
              <ul className="mt-6 space-y-3">
                {(sec.items as string[])?.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary mt-[2px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SectionBlock>
          );
        }

        if (sec.type === "mixed") {
          return (
            <SectionBlock key={sec.title} title={sec.title} tone={tone as "grey" | "white"}>
              <div className="mt-6 space-y-4">
                {sec.intro && <p>{sec.intro}</p>}
                <ul className="space-y-3">
                  {(sec.items as string[])?.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary-container" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionBlock>
          );
        }

        return (
          <SectionBlock key={sec.title} title={sec.title} tone={tone as "grey" | "white"}>
            <div className="mt-6 space-y-4">
              <p>{sec.body}</p>
            </div>
          </SectionBlock>
        );
      })}

      <SectionBlock title="Contact us" tone={d.sections.length % 2 === 0 ? "grey" : "white"}>
        <div className="mt-6 space-y-3">
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a className="text-primary font-bold underline underline-offset-4" href={`mailto:${d.contactEmail}`}>{d.contactEmail}</a>.
          </p>
          <p className="text-sm text-on-surface-variant">{d.contactAddress}</p>
        </div>
      </SectionBlock>
    </main>
  );
}

import { fetchSiteContent } from "@/lib/fetchContent";
import { AboutPageClient } from "@/components/about/AboutPageClient";

export const metadata = {
  title: "About Us",
  description: "Learn about Intelligence Tech — the team and mission behind the ecosystem.",
};

export default async function AboutPage() {
  const aboutData = await fetchSiteContent<{
    label: string;
    heading: string;
    body: string;
    pillars: Array<{ icon: string; title: string; desc: string }>;
    stats: Array<{ value: string; label: string }>;
  }>("about");

  return <AboutPageClient data={aboutData} />;
}

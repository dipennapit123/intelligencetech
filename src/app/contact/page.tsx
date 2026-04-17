import { fetchSiteContent } from "@/lib/fetchContent";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with the Intelligence Tech team.",
};

export default async function ContactPage() {
  const contactData = await fetchSiteContent<{
    eyebrow: string;
    heading: string;
    body: string;
    details: Array<{ icon: string; label: string; value: string }>;
  }>("contact_info");

  return <ContactPageClient data={contactData} />;
}

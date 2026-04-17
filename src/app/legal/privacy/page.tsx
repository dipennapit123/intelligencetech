import { fetchSiteContent } from "@/lib/fetchContent";
import { PrivacyPolicyClient } from "@/components/legal/PrivacyPolicyClient";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Intelligence Tech.",
};

export default async function PrivacyPage() {
  const data = await fetchSiteContent<Record<string, unknown>>("privacy_policy");
  return <PrivacyPolicyClient data={data} />;
}

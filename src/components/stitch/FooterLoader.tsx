import { fetchSiteContent } from "@/lib/fetchContent";
import { StitchFooter, FooterData } from "./StitchFooter";

export async function FooterLoader() {
  const data = await fetchSiteContent<FooterData>("footer");
  return <StitchFooter data={data} />;
}

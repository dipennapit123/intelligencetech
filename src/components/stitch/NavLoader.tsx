import { fetchSiteContent } from "@/lib/fetchContent";
import { StitchTopNav, NavData } from "./StitchTopNav";

export async function NavLoader() {
  const data = await fetchSiteContent<NavData>("nav_links");
  return <StitchTopNav data={data} />;
}

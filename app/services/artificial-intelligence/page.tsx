import type { Metadata } from "next";
import { SITE, SERVICE_PAGES } from "../../lib/constants";
import ServiceDetailTemplate from "../../components/ServiceDetailTemplate";

const service = SERVICE_PAGES.find((s) => s.slug === "artificial-intelligence")!;

export const metadata: Metadata = {
  title: service.meta.title,
  description: service.meta.description,
  openGraph: { title: service.meta.title, description: service.meta.description, images: [{ url: `${SITE.url}/opengraph-image.png`, width: 1200, height: 630 }] },
};

export default function ArtificialIntelligencePage() {
  return <ServiceDetailTemplate service={service} />;
}

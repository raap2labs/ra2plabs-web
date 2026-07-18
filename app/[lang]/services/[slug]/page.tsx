import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE, SERVICE_PAGES } from "../../../lib/constants";
import { getDictionary } from "../../dictionaries";
import { hasLocale, type Locale } from "../../locales";
import ServiceDetailTemplate from "../../../components/ServiceDetailTemplate";

export async function generateStaticParams() {
  const slugs = SERVICE_PAGES.map((s) => s.slug);
  const locales: Locale[] = ["es", "en"];
  return locales.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};

  const servicePage = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!servicePage) return {};

  return {
    title: `${servicePage.meta.title}`,
    description: servicePage.meta.description,
    openGraph: {
      title: `${servicePage.meta.title}`,
      description: servicePage.meta.description,
      images: [{ url: `${SITE.url}/opengraph-image.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const serviceList = dict.services_list as {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    benefits: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
  }[];
  const localized = serviceList.find((s) => s.slug === slug);

  if (!localized) notFound();

  const generic = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!generic) notFound();

  return (
    <ServiceDetailTemplate
      service={{
        ...generic,
        title: localized.title,
        subtitle: localized.subtitle,
        description: localized.description,
        benefits: localized.benefits,
        faq: localized.faq,
      }}
    />
  );
}

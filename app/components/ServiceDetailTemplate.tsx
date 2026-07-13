import type { ServicePageData } from "../lib/constants";
import ServiceHero from "./ServiceHero";
import ServiceBenefits from "./ServiceBenefits";
import ServiceTechStack from "./ServiceTechStack";
import ServiceFAQ from "./ServiceFAQ";
import CTA from "./CTA";
import Process from "./Process";

export default function ServiceDetailTemplate({
  service,
}: {
  service: ServicePageData;
}) {
  return (
    <>
      <ServiceHero
        title={service.title}
        subtitle={service.subtitle}
        description={service.description}
        heroGradient={service.heroGradient}
        heroIcon={service.heroIcon}
      />
      <ServiceBenefits benefits={service.benefits} />
      <Process />
      <ServiceTechStack technologies={service.technologies} />
      <ServiceFAQ faq={service.faq} />
      <CTA />
    </>
  );
}

"use client";

import { useState } from "react";
import SectionTitle from "./SectionTitle";
import Reveal from "./Reveal";
import { ChevronRight } from "./Icons";
import { SECTION } from "../lib/constants";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faq: FAQItem[];
}

export default function ServiceFAQ({ faq }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={SECTION.PADDING}>
      <div className={SECTION.CONTAINER}>
        <Reveal>
          <SectionTitle
            tag="FAQ"
            title="Preguntas Frecuentes"
            description="Resolvemos tus dudas sobre nuestros servicios."
          />
        </Reveal>
        <div className="mt-16 max-w-3xl mx-auto space-y-3">
          {faq.map((item, i) => (
            <div
              key={i}
              className="card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 hover:bg-white/[0.02]"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="text-sm font-medium leading-snug pr-4">
                  {item.question}
                </span>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                    openIndex === i ? "rotate-90" : ""
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                className={`transition-all duration-400 ease-premium overflow-hidden ${
                  openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

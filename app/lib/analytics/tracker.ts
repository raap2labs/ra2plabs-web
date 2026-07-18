import { trackEvent } from "./providers";
import { EVENTS } from "./events";

export function trackPageView(path: string) {
  trackEvent(EVENTS.PAGE_VIEW, { path });
}

export function trackCTA(label: string, extra?: Record<string, string | number | boolean>) {
  trackEvent(EVENTS.CTA_CLICK, { label, ...extra });
}

export function trackContactSubmit(service: string, success: boolean) {
  trackEvent(EVENTS.CONTACT_SUBMIT, { service, success });
}

export function trackWhatsApp(label: string) {
  trackEvent(EVENTS.WHATSAPP_CLICK, { label });
}

export function trackNavClick(label: string) {
  trackEvent(EVENTS.NAV_CLICK, { label });
}

export function trackScrollDepth(percent: number) {
  trackEvent(EVENTS.SCROLL_DEPTH, { percent });
}

export function trackNexusMessage(direction: "user" | "assistant") {
  trackEvent(EVENTS.NEXUS_MESSAGE, { direction });
}

export function trackNexusLeadQualified(
  score: "hot" | "warm" | "cold",
  source: string,
) {
  trackEvent(EVENTS.NEXUS_LEAD_QUALIFIED, { score, source });
}

export function trackMeetingBooked(duration: number) {
  trackEvent(EVENTS.MEETING_BOOKED, { duration });
}

export function trackCaseStudyClick(title: string) {
  trackEvent(EVENTS.CASE_STUDY_CLICK, { title });
}

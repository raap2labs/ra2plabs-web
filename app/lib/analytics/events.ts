export const EVENTS = {
  PAGE_VIEW: "page_view",
  CTA_CLICK: "cta_click",
  CONTACT_SUBMIT: "contact_submit",
  WHATSAPP_CLICK: "whatsapp_click",
  NAV_CLICK: "nav_click",
  SCROLL_DEPTH: "scroll_depth",
  NEXUS_MESSAGE: "nexus_message",
  NEXUS_LEAD_QUALIFIED: "nexus_lead_qualified",
  MEETING_BOOKED: "meeting_booked",
  CASE_STUDY_CLICK: "case_study_click",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

export type EventProps = Record<string, string | number | boolean>;

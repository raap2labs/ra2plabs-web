export const EVENTS = {
  CTA_CLICK: "cta_click",
  CONTACT_SUBMIT: "contact_submit",
  WHATSAPP_CLICK: "whatsapp_click",
  NAV_CLICK: "nav_click",
  SCROLL_DEPTH: "scroll_depth",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

export type EventProps = Record<string, string | number | boolean>;

export interface TrackEvent {
  name: EventName;
  props?: EventProps;
}

import { invite } from "@/data/invite";

/** WhatsApp RSVP URL */
export function buildWhatsappRsvpUrl(
  number: string,
  brideName: string,
  groomName: string
): string {
  const message = `Assalamu Alaikum!\n\nI will Insha Allah attend the Nikah of ${brideName} & ${groomName} on Saturday, 19 December 2026.\n\nName: ____\nGuests: ____`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp share URL (send invite to others) */
export function buildShareUrl(url?: string): string {
  const siteUrl = url ?? (typeof window !== "undefined" ? window.location.href : "https://zeba-yasin.vercel.app");
  const text = `✦ You are warmly invited ✦\n\nNikah of ${invite.bride.name} & ${invite.groom.name}\nSaturday, 19 December 2026 • 11:45 AM\nArsh Garden, Hubli\n\n${siteUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

// Legacy compat exports
export function whatsappRsvpUrl(): string {
  return buildWhatsappRsvpUrl(invite.rsvp.whatsapp, invite.bride.name, invite.groom.name);
}
export function whatsappShareUrl(url: string): string {
  return buildShareUrl(url);
}

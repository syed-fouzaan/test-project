interface EventData {
  title: string;
  startISO: string;
  durationMinutes: number;
  venue: { name: string; address: string; mapsUrl: string };
}

function padNum(n: number) { return String(n).padStart(2, "0"); }

function toISTString(d: Date): string {
  const ist = new Date(d.getTime() + (5.5 * 60 - d.getTimezoneOffset()) * 60000);
  return (
    ist.getFullYear() +
    padNum(ist.getMonth() + 1) +
    padNum(ist.getDate()) +
    "T" +
    padNum(ist.getHours()) +
    padNum(ist.getMinutes()) +
    "00"
  );
}

function toUTCString(d: Date): string {
  return (
    d.getUTCFullYear() +
    padNum(d.getUTCMonth() + 1) +
    padNum(d.getUTCDate()) +
    "T" +
    padNum(d.getUTCHours()) +
    padNum(d.getUTCMinutes()) +
    "00Z"
  );
}

export function generateICS(event: EventData): string {
  const start = new Date(event.startISO);
  const end   = new Date(start.getTime() + event.durationMinutes * 60 * 1000);

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nikah Invite//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Kolkata",
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:IST",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `DTSTART;TZID=Asia/Kolkata:${toISTString(start)}`,
    `DTEND;TZID=Asia/Kolkata:${toISTString(end)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.venue.name}\\, ${event.venue.address}`,
    "DESCRIPTION:Insha Allah\\, you are warmly invited to the Nikah of Zeba Kausar and Mohammed Yasin on Saturday\\, 19 December 2026 at Arsh Garden\\, Hubli.",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder",
    "TRIGGER:-PT24H",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

/** Returns a data: URI for the .ics so it works as a plain <a href download> */
export function buildIcsDataUrl(event: EventData): string {
  const ics = generateICS(event);
  const encoded = encodeURIComponent(ics);
  return `data:text/calendar;charset=utf-8,${encoded}`;
}

/** Google Calendar URL */
export function buildGoogleCalendarUrl(event: EventData): string {
  const start = new Date(event.startISO);
  const end   = new Date(start.getTime() + event.durationMinutes * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toUTCString(start)}/${toUTCString(end)}`,
    details: "Insha Allah, you are warmly invited to the Nikah of Zeba Kausar and Mohammed Yasin on Saturday, 19 December 2026 at Arsh Garden, Hubli.",
    location: `${event.venue.name}, ${event.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// (Legacy compat removed — use buildGoogleCalendarUrl / buildIcsDataUrl directly)


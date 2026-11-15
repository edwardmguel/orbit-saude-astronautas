/** Illustrated (SVG) avatars of the demo astronauts. */
interface AvatarSpec {
  skin: string;
  skinShade: string;
  hair: string;
  style: "short" | "bun" | "bob" | "buzz";
  bg: [string, string];
  patch: string;
}

const SPECS: Record<string, AvatarSpec> = {
  "astronaut-002": { skin: "#E9B993", skinShade: "#D49E78", hair: "#3B2418", style: "bun", bg: ["#123049", "#0B1B2B"], patch: "#21C5EF" },
  "astronaut-003": { skin: "#C98E68", skinShade: "#AF7653", hair: "#1E1A18", style: "short", bg: ["#16323F", "#0B1B2B"], patch: "#16A9C4" },
  "astronaut-004": { skin: "#F0C9A6", skinShade: "#D9AE8A", hair: "#121418", style: "bob", bg: ["#1A2C47", "#0B1B2B"], patch: "#38BDF8" },
};

function hairPath(style: AvatarSpec["style"], color: string) {
  switch (style) {
    case "bun":
      return `<circle cx="100" cy="46" r="15" fill="${color}"/><path d="M62 92c0-26 16-42 38-42s38 16 38 42c-6-14-20-22-38-22s-32 8-38 22z" fill="${color}"/>`;
    case "bob":
      return `<path d="M58 104c-2-34 14-56 42-56s44 22 42 56c-3 10-8 14-12 14 2-22-4-40-30-44-26 4-32 22-30 44-4 0-9-4-12-14z" fill="${color}"/>`;
    case "short":
      return `<path d="M63 90c-2-26 14-42 37-42 24 0 39 15 37 42-5-12-14-18-22-19-10 6-30 6-52 19z" fill="${color}"/>`;
    default:
      return `<path d="M64 86c2-22 16-35 36-35s34 13 36 35c-10-10-22-14-36-14s-26 4-36 14z" fill="${color}"/>`;
  }
}

export function demoAvatar(id: string): string | undefined {
  const s = SPECS[id];
  if (!s) return undefined;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.bg[0]}"/><stop offset="1" stop-color="${s.bg[1]}"/></linearGradient>
<linearGradient id="suit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E8EEF5"/><stop offset="1" stop-color="#AFC0D2"/></linearGradient></defs>
<rect width="200" height="200" fill="url(#g)"/>
<circle cx="34" cy="30" r="1.2" fill="#91A4B8" opacity=".6"/><circle cx="168" cy="44" r="1" fill="#91A4B8" opacity=".5"/><circle cx="150" cy="18" r="1.4" fill="#21C5EF" opacity=".5"/><circle cx="22" cy="92" r="1" fill="#91A4B8" opacity=".4"/>
<ellipse cx="100" cy="118" rx="64" ry="64" fill="none" stroke="#21C5EF" stroke-opacity=".08" stroke-width="10"/>
<path d="M28 200c4-38 32-58 72-58s68 20 72 58z" fill="url(#suit)"/>
<path d="M76 146c6 10 14 15 24 15s18-5 24-15" fill="none" stroke="#7F93AA" stroke-width="3"/>
<rect x="128" y="166" width="20" height="13" rx="3" fill="${s.patch}" opacity=".9"/>
<rect x="52" y="168" width="18" height="6" rx="2" fill="#5D7189"/>
<path d="M88 124h24v22c-4 4-8 6-12 6s-8-2-12-6z" fill="${s.skinShade}"/>
<ellipse cx="100" cy="94" rx="34" ry="40" fill="${s.skin}"/>
<ellipse cx="66" cy="98" rx="5" ry="8" fill="${s.skinShade}"/><ellipse cx="134" cy="98" rx="5" ry="8" fill="${s.skinShade}"/>
${hairPath(s.style, s.hair)}
<ellipse cx="87" cy="98" rx="3.2" ry="3.6" fill="#1B2430"/><ellipse cx="113" cy="98" rx="3.2" ry="3.6" fill="#1B2430"/>
<path d="M80 89q7-4 14 0M106 89q7-4 14 0" stroke="${s.hair}" stroke-width="2.4" fill="none" stroke-linecap="round" opacity=".8"/>
<path d="M100 101v10" stroke="${s.skinShade}" stroke-width="3" stroke-linecap="round"/>
<path d="M90 118q10 6 20 0" stroke="#9A5A4A" stroke-width="2.6" fill="none" stroke-linecap="round"/>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

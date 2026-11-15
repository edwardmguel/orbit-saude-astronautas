/**
 * Official Orbit icon rebuilt in SVG (same geometry and colors as the original):
 * navy square, central ring, tilted elliptical orbit and a small circle on the orbit.
 */
export const ORBIT = { cx: 150, cy: 150, rx: 110, ry: 40, rot: -27 };
export const DOT_T0 = -0.2; // angular parameter of the small circle's original position

const RAD = (ORBIT.rot * Math.PI) / 180;

/** Exact point on the orbit ellipse for parameter t (rad). */
export function orbitPoint(t: number) {
  const lx = ORBIT.rx * Math.cos(t);
  const ly = ORBIT.ry * Math.sin(t);
  return {
    x: ORBIT.cx + lx * Math.cos(RAD) - ly * Math.sin(RAD),
    y: ORBIT.cy + lx * Math.sin(RAD) + ly * Math.cos(RAD),
  };
}

export const ICON_COLORS = { bg: "#0A1424", ring: "#38BDF8", orbit: "#1CACC4", dot: "#3DBEF7" };

interface Props {
  size?: number;
  t?: number; // small circle position
  glow?: number; // 0..1 trail glow
  rounded?: boolean;
  className?: string;
  title?: string;
  trail?: number[];
}

export function OrbitaLogo({ size = 40, t = DOT_T0, glow = 0, rounded = true, className, title = "Orbit", trail }: Props) {
  const p = orbitPoint(t);
  const back = `M${ORBIT.cx - ORBIT.rx} ${ORBIT.cy} A${ORBIT.rx} ${ORBIT.ry} 0 0 1 ${ORBIT.cx + ORBIT.rx} ${ORBIT.cy}`;
  const front = `M${ORBIT.cx + ORBIT.rx} ${ORBIT.cy} A${ORBIT.rx} ${ORBIT.ry} 0 0 1 ${ORBIT.cx - ORBIT.rx} ${ORBIT.cy}`;
  const id = `og${Math.round(size)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 300 300" className={className} role="img" aria-label={title}>
      <defs>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect width="300" height="300" rx={rounded ? 66 : 0} fill={ICON_COLORS.bg} />
      <g transform={`rotate(${ORBIT.rot} ${ORBIT.cx} ${ORBIT.cy})`}>
        <path d={back} fill="none" stroke={ICON_COLORS.orbit} strokeWidth="13" />
      </g>
      <circle cx="150" cy="150" r="46" fill="none" stroke={ICON_COLORS.ring} strokeWidth="17" />
      <g transform={`rotate(${ORBIT.rot} ${ORBIT.cx} ${ORBIT.cy})`}>
        <path d={front} fill="none" stroke={ICON_COLORS.orbit} strokeWidth="13" />
      </g>
      {trail?.map((tt, i) => {
        const q = orbitPoint(tt);
        return <circle key={i} cx={q.x} cy={q.y} r={17 - i * 1.6} fill="#21C5EF" opacity={(0.32 - i * 0.035) * glow} />;
      })}
      {glow > 0 && <circle cx={p.x} cy={p.y} r={30} fill="#21C5EF" opacity={0.55 * glow} filter={`url(#${id}-glow)`} />}
      <circle cx={p.x} cy={p.y} r="17" fill={ICON_COLORS.dot} />
    </svg>
  );
}

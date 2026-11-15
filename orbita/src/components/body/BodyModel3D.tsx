import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Billboard, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { Sex, Status } from "@/types";
import type { RegionId } from "@/data/bodyRegions";
import { REGION_BY_ID } from "@/data/bodyRegions";
import { STATUS_META } from "@/lib/health";
import { prefersReducedMotion } from "@/lib/util";

/* ---------- Holographic material (fresnel) ---------- */
function makeHoloMaterial(color: string) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uIntensity: { value: 1 },
      uBase: { value: 0.06 },
    },
    vertexShader: `
      varying vec3 vN; varying vec3 vV;
      void main(){
        vec4 mv = modelViewMatrix * vec4(position,1.0);
        vN = normalize(normalMatrix * normal);
        vV = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; uniform float uIntensity; uniform float uBase;
      varying vec3 vN; varying vec3 vV;
      void main(){
        float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.2);
        float a = (uBase + f * 0.85) * uIntensity;
        gl_FragColor = vec4(uColor * (0.55 + f), clamp(a, 0.0, 1.0));
      }`,
  });
}

type Hit = { region: RegionId; hover: RegionId | null; selected: RegionId | null; setHover: (r: RegionId | null) => void; onSelect: (r: RegionId) => void };

function useRegionHandlers({ region, setHover, onSelect }: Pick<Hit, "region" | "setHover" | "onSelect">) {
  return {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHover(region);
      document.body.style.cursor = "pointer";
    },
    onPointerOut: () => {
      setHover(null);
      document.body.style.cursor = "";
    },
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      if (e.delta > 6) return; // drag for rotation, not selection
      onSelect(region);
    },
  };
}

/** Holographic "shell" mesh that responds to hover/selection. */
function Shell({ geometry, region, position, quaternion, scale, interactive = true, ctx, color = "#21C5EF" }: {
  geometry: THREE.BufferGeometry;
  region: RegionId;
  position?: THREE.Vector3Tuple;
  quaternion?: THREE.Quaternion;
  scale?: THREE.Vector3Tuple;
  interactive?: boolean;
  ctx: Omit<Hit, "region">;
  color?: string;
}) {
  const mat = useMemo(() => makeHoloMaterial(color), [color]);
  const handlers = useRegionHandlers({ region, setHover: ctx.setHover, onSelect: ctx.onSelect });
  const active = ctx.selected === region || ctx.selected === "body";
  const hover = ctx.hover === region;
  useFrame(() => {
    const target = active ? 2.1 : hover ? 1.6 : 1;
    mat.uniforms.uIntensity.value += (target - mat.uniforms.uIntensity.value) * 0.15;
    mat.uniforms.uBase.value += ((active ? 0.16 : 0.05) - mat.uniforms.uBase.value) * 0.15;
  });
  return (
    <mesh
      geometry={geometry}
      material={mat}
      position={position}
      quaternion={quaternion}
      scale={scale}
      {...(interactive ? handlers : { raycast: () => null })}
    />
  );
}

/** Internal organ: own glow, highlighted when selected. */
function Organ({ geometry, region, position, scale, rotation, ctx, color = "#16A9C4", hitScale = 1 }: {
  geometry: THREE.BufferGeometry;
  region: RegionId;
  position: THREE.Vector3Tuple;
  scale?: THREE.Vector3Tuple;
  rotation?: THREE.Euler | THREE.Vector3Tuple;
  ctx: Omit<Hit, "region">;
  color?: string;
  hitScale?: number;
}) {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  const handlers = useRegionHandlers({ region, setHover: ctx.setHover, onSelect: ctx.onSelect });
  const active = ctx.selected === region;
  const hover = ctx.hover === region;
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pulse = active ? 0.35 * Math.sin(clock.elapsedTime * 3) : 0;
    const target = active ? 2.4 + pulse : hover ? 1.6 : 0.55;
    ref.current.emissiveIntensity += (target - ref.current.emissiveIntensity) * 0.12;
    ref.current.opacity += ((active ? 0.95 : hover ? 0.8 : 0.55) - ref.current.opacity) * 0.12;
  });
  return (
    <group position={position} rotation={rotation as THREE.Euler}>
      <mesh geometry={geometry} scale={scale} raycast={() => null}>
        <meshStandardMaterial ref={ref} color={active ? "#bff3ff" : color} emissive={active ? "#21C5EF" : color} emissiveIntensity={0.55} transparent opacity={0.55} roughness={0.4} metalness={0.1} depthWrite={false} />
      </mesh>
      <mesh geometry={geometry} scale={(scale ?? [1, 1, 1]).map((s) => s * hitScale) as THREE.Vector3Tuple} {...handlers}>
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function limb(a: THREE.Vector3Tuple, b: THREE.Vector3Tuple) {
  const va = new THREE.Vector3(...a);
  const vb = new THREE.Vector3(...b);
  const dir = vb.clone().sub(va);
  const len = dir.length();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  const mid = va.clone().add(vb).multiplyScalar(0.5);
  return { len, q, mid: mid.toArray() as THREE.Vector3Tuple };
}

const ANCHORS: Record<RegionId, THREE.Vector3Tuple> = {
  head: [0, 1.7, 0.03],
  eyes: [0.037, 1.645, 0.115],
  heart: [0.035, 1.33, 0.07],
  lungs: [-0.085, 1.34, 0.06],
  immune: [0.085, 1.14, 0.06],
  abdomen: [-0.02, 1.07, 0.1],
  bones: [0, 0.97, 0.02],
  muscles: [-0.1, 0.72, 0.075],
  body: [0, 1.22, 0.13],
};

function Marker({ region, status }: { region: RegionId; status: Status }) {
  const ring = useRef<THREE.Mesh>(null);
  const color = status === "no_data" ? "#21C5EF" : STATUS_META[status].color;
  useFrame(({ clock }) => {
    if (!ring.current) return;
    const t = (clock.elapsedTime * 0.9) % 1;
    ring.current.scale.setScalar(1 + t * 2.2);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - t);
  });
  return (
    <group position={ANCHORS[region]}>
      <Billboard>
        <mesh renderOrder={10}>
          <circleGeometry args={[0.014, 24]} />
          <meshBasicMaterial color="#ffffff" depthTest={false} transparent />
        </mesh>
        <mesh renderOrder={9}>
          <circleGeometry args={[0.028, 32]} />
          <meshBasicMaterial color={color} depthTest={false} transparent opacity={0.55} />
        </mesh>
        <mesh ref={ring} renderOrder={8}>
          <ringGeometry args={[0.03, 0.036, 40]} />
          <meshBasicMaterial color={color} depthTest={false} transparent opacity={0.6} />
        </mesh>
      </Billboard>
      <Html position={[0.06, 0.04, 0]} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
        <div className="whitespace-nowrap rounded-md border border-cyan/40 bg-[#07111f]/85 px-2 py-1 font-display text-[10px] font-semibold tracking-[0.16em] text-cyan shadow-[0_0_16px_-4px_#21c5ef]">
          {REGION_BY_ID[region].title}
        </div>
      </Html>
    </group>
  );
}

function Body({ sex, selected, onSelect, statuses }: { sex: Sex; selected: RegionId | null; onSelect: (r: RegionId) => void; statuses: Record<RegionId, Status> }) {
  const [hover, setHover] = useState<RegionId | null>(null);
  const ctx = { hover, selected, setHover, onSelect };
  const F = sex === "F";

  const g = useMemo(() => {
    // Torso profile (radius x height) — anatomical proportions by sex
    const prof: [number, number][] = F
      ? [[0.0, 0.88], [0.12, 0.9], [0.178, 0.96], [0.17, 1.02], [0.125, 1.1], [0.13, 1.2], [0.148, 1.3], [0.155, 1.37], [0.162, 1.42], [0.11, 1.465], [0.055, 1.485], [0.0, 1.49]]
      : [[0.0, 0.88], [0.12, 0.9], [0.16, 0.96], [0.152, 1.03], [0.142, 1.1], [0.152, 1.2], [0.168, 1.3], [0.183, 1.37], [0.19, 1.42], [0.12, 1.465], [0.06, 1.485], [0.0, 1.49]];
    const torso = new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r, y)), 48);
    const sphere = new THREE.SphereGeometry(1, 40, 28);
    return { torso, sphere };
  }, [F]);

  const shoulderX = F ? 0.168 : 0.198;
  const hipX = F ? 0.098 : 0.09;
  const armR = F ? 0.036 : 0.043;
  const foreR = F ? 0.03 : 0.035;
  const thighR = F ? 0.07 : 0.066;
  const shinR = F ? 0.045 : 0.047;

  const parts = useMemo(() => {
    const L = (a: THREE.Vector3Tuple, b: THREE.Vector3Tuple, r: number) => {
      const { len, q, mid } = limb(a, b);
      return { geo: new THREE.CapsuleGeometry(r, Math.max(0.01, len - r * 0.4), 8, 20), q, mid };
    };
    const out: { geo: THREE.BufferGeometry; q: THREE.Quaternion; mid: THREE.Vector3Tuple }[] = [];
    for (const s of [-1, 1]) {
      out.push(L([s * (shoulderX + 0.01), 1.41, 0], [s * (shoulderX + 0.055), 1.13, -0.005], armR));
      out.push(L([s * (shoulderX + 0.055), 1.12, -0.005], [s * (shoulderX + 0.095), 0.87, 0.03], foreR));
      out.push(L([s * hipX, 0.92, 0], [s * (hipX + 0.005), 0.5, 0.005], thighR));
      out.push(L([s * (hipX + 0.005), 0.49, 0.005], [s * (hipX + 0.01), 0.09, -0.01], shinR));
    }
    return out;
  }, [shoulderX, hipX, armR, foreR, thighR, shinR]);

  const bones = useMemo(() => {
    const vert = new THREE.CylinderGeometry(0.016, 0.016, 0.022, 10);
    const pelvis = new THREE.TorusGeometry(0.085, 0.018, 10, 32);
    const femur = new THREE.CylinderGeometry(0.012, 0.014, 0.38, 10);
    const rib = new THREE.TorusGeometry(1, 0.06, 6, 32, Math.PI * 1.25);
    return { vert, pelvis, femur, rib };
  }, []);

  const organs = useMemo(
    () => ({
      brain: new THREE.SphereGeometry(1, 32, 24),
      eye: new THREE.SphereGeometry(0.016, 20, 16),
      heart: new THREE.SphereGeometry(1, 28, 20),
      lung: new THREE.CapsuleGeometry(1, 1.2, 8, 20),
      stomach: new THREE.SphereGeometry(1, 24, 18),
      gut: new THREE.TorusKnotGeometry(0.045, 0.012, 80, 8, 2, 5),
      node: new THREE.SphereGeometry(1, 14, 10),
    }),
    [],
  );

  const shellColor = "#21C5EF";
  return (
    <group>
      {/* Head and neck */}
      <Shell geometry={g.sphere} region="head" position={[0, 1.635, 0.005]} scale={F ? [0.094, 0.118, 0.108] : [0.1, 0.122, 0.112]} ctx={ctx} color={shellColor} />
      <Shell geometry={g.sphere} region="head" interactive={false} position={[0, 1.515, -0.005]} scale={[0.048, 0.06, 0.048]} ctx={ctx} color={shellColor} />
      {F ? (
        <Shell geometry={g.sphere} region="head" interactive={false} position={[0, 1.6, -0.04]} scale={[0.105, 0.14, 0.09]} ctx={ctx} color="#16A9C4" />
      ) : (
        <Shell geometry={g.sphere} region="head" interactive={false} position={[0, 1.68, -0.01]} scale={[0.103, 0.085, 0.108]} ctx={ctx} color="#16A9C4" />
      )}
      <Organ geometry={organs.brain} region="head" position={[0, 1.665, -0.005]} scale={[0.072, 0.06, 0.082]} ctx={ctx} color="#1CACC4" hitScale={1.2} />
      <Organ geometry={organs.eye} region="eyes" position={[0.037, 1.643, F ? 0.095 : 0.1]} ctx={ctx} color="#7FE3FF" hitScale={2.6} />
      <Organ geometry={organs.eye} region="eyes" position={[-0.037, 1.643, F ? 0.095 : 0.1]} ctx={ctx} color="#7FE3FF" hitScale={2.6} />

      {/* Torso (non-interactive: allows clicking internal organs) */}
      <Shell geometry={g.torso} region="body" interactive={false} scale={[1, 1, 0.62]} ctx={ctx} color={shellColor} />
      {F &&
        [-1, 1].map((s) => <Shell key={s} geometry={g.sphere} region="body" interactive={false} position={[s * 0.07, 1.3, 0.05]} scale={[0.052, 0.048, 0.042]} ctx={ctx} color={shellColor} />)}
      {[-1, 1].map((s) => (
        <Shell key={`d${s}`} geometry={g.sphere} region="muscles" position={[s * shoulderX, 1.415, 0]} scale={[0.058, 0.05, 0.058]} ctx={ctx} color={shellColor} />
      ))}

      {/* Limbs: muscles */}
      {parts.map((p, i) => (
        <Shell key={i} geometry={p.geo} region="muscles" position={p.mid} quaternion={p.q} ctx={ctx} color={shellColor} />
      ))}
      {[-1, 1].map((s) => (
        <group key={`h${s}`}>
          <Shell geometry={g.sphere} region="muscles" position={[s * (shoulderX + 0.105), 0.815, 0.035]} scale={[0.028, 0.06, 0.04]} ctx={ctx} color={shellColor} />
          <Shell geometry={g.sphere} region="muscles" position={[s * (hipX + 0.012), 0.04, 0.04]} scale={[0.045, 0.035, 0.105]} ctx={ctx} color={shellColor} />
        </group>
      ))}

      {/* Skeleton: spine, pelvis, femurs, ribs */}
      <group>
        {Array.from({ length: 22 }).map((_, i) => (
          <Organ key={i} geometry={bones.vert} region="bones" position={[0, 0.99 + i * 0.022, -0.055 + Math.sin(i / 3.5) * 0.008]} ctx={ctx} color="#91A4B8" hitScale={1.8} />
        ))}
        <Organ geometry={bones.pelvis} region="bones" position={[0, 0.96, -0.005]} rotation={[Math.PI / 2.4, 0, 0]} scale={[F ? 1.15 : 1, 1, 1]} ctx={ctx} color="#91A4B8" hitScale={1.1} />
        {[-1, 1].map((s) => (
          <Organ key={s} geometry={bones.femur} region="bones" position={[s * (hipX + 0.002), 0.71, 0.003]} ctx={ctx} color="#91A4B8" hitScale={1.4} />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={`r${i}`} geometry={bones.rib} position={[0, 1.38 - i * 0.04, -0.01]} rotation={[Math.PI / 2, 0, Math.PI * 1.875]} scale={[0.13 - i * 0.002, 0.08, 0.13]} raycast={() => null}>
            <meshBasicMaterial color="#91A4B8" transparent opacity={selected === "bones" ? 0.45 : 0.12} depthWrite={false} />
          </mesh>
        ))}
      </group>

      {/* Organs */}
      <Organ geometry={organs.lung} region="lungs" position={[-0.072, 1.33, 0.005]} scale={[0.05, 0.05, 0.045]} rotation={[0, 0, 0.12]} ctx={ctx} color="#1597B5" hitScale={1.35} />
      <Organ geometry={organs.lung} region="lungs" position={[0.078, 1.33, 0.005]} scale={[0.046, 0.048, 0.043]} rotation={[0, 0, -0.12]} ctx={ctx} color="#1597B5" hitScale={1.35} />
      <Organ geometry={organs.heart} region="heart" position={[0.022, 1.315, 0.045]} scale={[0.038, 0.045, 0.034]} rotation={[0, 0, -0.5]} ctx={ctx} color="#38BDF8" hitScale={1.7} />
      <Organ geometry={organs.stomach} region="abdomen" position={[0.035, 1.16, 0.04]} scale={[0.055, 0.04, 0.035]} rotation={[0, 0, 0.4]} ctx={ctx} color="#16A9C4" />
      <Organ geometry={organs.gut} region="abdomen" position={[0, 1.04, 0.035]} rotation={[0, 0, 0]} scale={[1.05, 0.9, 0.6]} ctx={ctx} color="#16A9C4" hitScale={1.2} />
      {/* Immune system: spleen and lymph nodes */}
      <Organ geometry={organs.node} region="immune" position={[0.088, 1.15, -0.01]} scale={[0.026, 0.038, 0.02]} ctx={ctx} color="#5EEAD4" hitScale={1.6} />
      {(
        [
          [0.045, 1.5, 0.02],
          [-0.045, 1.5, 0.02],
          [0.15, 1.36, 0.0],
          [-0.15, 1.36, 0.0],
          [0.075, 0.93, 0.05],
          [-0.075, 0.93, 0.05],
          [0, 1.42, 0.06],
        ] as THREE.Vector3Tuple[]
      ).map((p, i) => (
        <Organ key={`n${i}`} geometry={organs.node} region="immune" position={p} scale={[0.011, 0.011, 0.011]} ctx={ctx} color="#5EEAD4" hitScale={3} />
      ))}

      {selected && <Marker region={selected} status={statuses[selected]} />}
    </group>
  );
}

function Platform({ selected, onSelect }: { selected: boolean; onSelect: () => void }) {
  const ring = useRef<THREE.Mesh>(null);
  const scan = useRef<THREE.Mesh>(null);
  const reduced = prefersReducedMotion();
  useFrame(({ clock }) => {
    if (ring.current) ring.current.rotation.z = clock.elapsedTime * 0.25;
    if (scan.current && !reduced) {
      const y = ((clock.elapsedTime * 0.22) % 1) * 1.85;
      scan.current.position.y = y;
      (scan.current.material as THREE.MeshBasicMaterial).opacity = 0.12 * Math.sin((y / 1.85) * Math.PI);
    }
  });
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]} onClick={(e) => { e.stopPropagation(); if (e.delta <= 6) onSelect(); }} onPointerOver={() => (document.body.style.cursor = "pointer")} onPointerOut={() => (document.body.style.cursor = "")}>
        <ringGeometry args={[0.3, 0.42, 64]} />
        <meshBasicMaterial color="#21C5EF" transparent opacity={selected ? 0.4 : 0.12} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]} raycast={() => null}>
        <ringGeometry args={[0.46, 0.47, 64, 1, 0, Math.PI * 1.4]} />
        <meshBasicMaterial color="#21C5EF" transparent opacity={0.45} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh ref={scan} rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
        <ringGeometry args={[0.0, 0.32, 48]} />
        <meshBasicMaterial color="#21C5EF" transparent opacity={0.1} side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <gridHelper args={[3, 30, "#16A9C4", "#0f2b40"]} position={[0, 0, 0]} />
    </group>
  );
}

export default function BodyModel3D({ sex, selected, onSelect, statuses }: { sex: Sex; selected: RegionId | null; onSelect: (r: RegionId) => void; statuses: Record<RegionId, Status> }) {
  const [interacting, setInteracting] = useState(false);
  const reduced = prefersReducedMotion();
  return (
    <Canvas
      camera={{ position: [0.95, 1.2, 2.75], fov: 38, near: 0.05, far: 30 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      onPointerMissed={() => undefined}
      style={{ touchAction: "none" }}
      aria-label="Interactive 3D body model"
    >
      <ambientLight intensity={0.5} color="#9fdcff" />
      <pointLight position={[1.5, 2.5, 2]} intensity={14} color="#21C5EF" />
      <pointLight position={[-1.5, 1, -1.5]} intensity={8} color="#16A9C4" />
      <group scale={sex === "F" ? 0.95 : 1}>
        <Body sex={sex} selected={selected} onSelect={onSelect} statuses={statuses} />
      </group>
      <Platform selected={selected === "body"} onSelect={() => onSelect("body")} />
      <OrbitControls
        target={[0, 0.9, 0]}
        enablePan={false}
        minDistance={0.9}
        maxDistance={3.6}
        minPolarAngle={0.35}
        maxPolarAngle={1.75}
        enableDamping
        autoRotate={!interacting && !selected && !reduced}
        autoRotateSpeed={0.7}
        onStart={() => setInteracting(true)}
      />
    </Canvas>
  );
}

// RealisticHumanEye.jsx
import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

// -----------------------------------------------------------------------------
// Realistic Human Eye (single-file React component for React 18 + R3F v8)
// - Much more anatomically-correct iris (concave, displaced), real pupil hole
// - Sclera with veins + normal map, cornea as convex refractive cap
// - Eyelids (simple geometry), extraocular muscles, optic nerve bump
// - Section (cutaway) toggle using clipping plane
// - All textures are generated procedurally (no external assets required)
// -----------------------------------------------------------------------------

export default function RealisticHumanEye() {
  return (
    <div style={{ width: "100%", height: "100vh", background: "#0b1020" }}>
      <Canvas
        camera={{ position: [0, 0, 3.6], fov: 45 }}
        gl={{ antialias: true, localClippingEnabled: true }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 6, 6]} intensity={0.9} />
        <directionalLight position={[-6, -3, -4]} intensity={0.25} />

        <Scene />

        <OrbitControls enablePan={false} minDistance={1.8} maxDistance={10} />
      </Canvas>

      {/* Minimal instructions */}
      <div style={{ position: "absolute", left: 14, top: 14, zIndex: 20 }}>
        <div style={{ color: "#fff", background: "rgba(0,0,0,0.35)", padding: 10, borderRadius: 8 }}>
          <div style={{ fontWeight: 700 }}>Realistic Human Eye</div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>Drag to rotate · Scroll to zoom · Click pupil to toggle</div>
        </div>
      </div>
    </div>
  );
}

function Scene() {
  // toggles and UI state
  const [cutaway, setCutaway] = useState(true);
  const [showVeins, setShowVeins] = useState(true);
  const [irisHue, setIrisHue] = useState(0.25);
  const [showEyelids, setShowEyelids] = useState(true);

  // small DOM controls injected so this component is plug-and-play
  useEffect(() => {
    const id = "eye-controls-embedded";
    if (document.getElementById(id)) return;
    const root = document.createElement("div");
    root.id = id;
    root.style.position = "absolute";
    root.style.right = "14px";
    root.style.top = "14px";
    root.style.zIndex = 20;
    root.style.background = "rgba(0,0,0,0.35)";
    root.style.padding = "10px";
    root.style.borderRadius = "8px";
    root.style.color = "white";
    root.style.fontFamily = "system-ui, -apple-system, 'Segoe UI', Roboto";
    root.innerHTML = `
      <div style=\"font-weight:700;margin-bottom:6px\">Controls</div>
      <label style=\"display:block;margin-bottom:6px\"><input type=\"checkbox\" id=\"cutawayCb\" checked /> Cutaway</label>
      <label style=\"display:block;margin-bottom:6px\"><input type=\"checkbox\" id=\"veinCb\" checked /> Scleral veins</label>
      <label style=\"display:block;margin-bottom:6px\">Iris hue: <input id=\"irisRange\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" value=\"${irisHue}\" style=\"width:120px\"/></label>
      <label style=\"display:block;margin-bottom:6px\"><input type=\"checkbox\" id=\"eyelidCb\" checked /> Show eyelids</label>
    `;

    document.body.appendChild(root);
    const cut = document.getElementById("cutawayCb");
    const vein = document.getElementById("veinCb");
    const iris = document.getElementById("irisRange");
    const eyelid = document.getElementById("eyelidCb");
    cut.checked = cutaway;
    vein.checked = showVeins;
    eyelid.checked = showEyelids;
    function sync() {
      setCutaway(cut.checked);
      setShowVeins(vein.checked);
      setIrisHue(parseFloat(iris.value));
      setShowEyelids(eyelid.checked);
    }
    cut.addEventListener("change", sync);
    vein.addEventListener("change", sync);
    iris.addEventListener("input", sync);
    eyelid.addEventListener("change", sync);

    return () => { root.remove(); };
  }, []);

  return (
    <group>
      <EyeModel cutaway={cutaway} showVeins={showVeins} irisHue={irisHue} showEyelids={showEyelids} />
    </group>
  );
}

function EyeModel({ cutaway = true, showVeins = true, irisHue = 0.25, showEyelids = true }) {
  // clipping plane for cutaway slicing (slice along +X axis)
  const clipPlane = useMemo(() => new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0), []);

  // Procedural canvases
  const irisColorCanvas = useMemo(() => generateIrisColorCanvas(2048, irisHue), [irisHue]);
  const irisDispCanvas = useMemo(() => generateIrisDispCanvas(2048), []);
  const scleraVeinCanvas = useMemo(() => generateScleraVeinCanvas(2048), []);

  // Normal maps computed from grayscale displacement/vein maps
  const irisNormalCanvas = useMemo(() => generateNormalFromGrayscaleCanvas(irisDispCanvas, 1.2), [irisDispCanvas]);
  const scleraNormalCanvas = useMemo(() => generateNormalFromGrayscaleCanvas(scleraVeinCanvas, 0.55), [scleraVeinCanvas]);

  // Three textures
  const irisColorTex = useMemo(() => new THREE.CanvasTexture(irisColorCanvas), [irisColorCanvas]);
  const irisDispTex = useMemo(() => new THREE.CanvasTexture(irisDispCanvas), [irisDispCanvas]);
  const irisNormalTex = useMemo(() => new THREE.CanvasTexture(irisNormalCanvas), [irisNormalCanvas]);
  const scleraTex = useMemo(() => new THREE.CanvasTexture(scleraVeinCanvas), [scleraVeinCanvas]);
  const scleraNormalTex = useMemo(() => new THREE.CanvasTexture(scleraNormalCanvas), [scleraNormalCanvas]);

  useEffect(() => {
    [irisColorTex, irisDispTex, irisNormalTex, scleraTex, scleraNormalTex].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.anisotropy = 16;
      t.needsUpdate = true;
    });
  }, [irisColorTex, irisDispTex, irisNormalTex, scleraTex, scleraNormalTex]);

  // create concave iris geometry by displacing a dense circle mesh along -Z
  const irisGeo = useMemo(() => {
    const radius = 0.46;
    const segs = 1024; // high detail
    const geo = new THREE.CircleGeometry(radius, segs);
    const nonIdx = geo.toNonIndexed();
    const pos = nonIdx.attributes.position;

    // fetch displacement image data from canvas
    const ctx = irisDispCanvas.getContext("2d");
    const imgData = ctx.getImageData(0, 0, irisDispCanvas.width, irisDispCanvas.height).data;
    const w = irisDispCanvas.width;
    const h = irisDispCanvas.height;

    function sample(u, v) {
      const x = Math.max(0, Math.min(w - 1, Math.floor(u * (w - 1))));
      const y = Math.max(0, Math.min(h - 1, Math.floor(v * (h - 1))));
      const i = (y * w + x) * 4;
      const r = imgData[i], g = imgData[i + 1], b = imgData[i + 2];
      return (r + g + b) / (3 * 255);
    }

    // displace: inner radius less displacement, outer more; negative z for concave
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const u = 0.5 + x / (radius * 2);
      const v = 0.5 + y / (radius * 2);
      const r = Math.sqrt(x * x + y * y);
      const radialFade = Math.max(0, 1 - (r / radius));
      const d = sample(u, v);
      const depth = -0.12 * (0.25 + d * 0.85) * radialFade; // deeper near center
      pos.setZ(i, depth);
    }
    nonIdx.computeVertexNormals();
    return nonIdx;
  }, [irisDispCanvas]);

  // refs for animation (pupil dilation etc.)
  const group = useRef();
  const pupil = useRef();
  const [dilated, setDilated] = useState(false);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.16) * 0.05;
      group.current.rotation.x = Math.sin(t * 0.12) * 0.03;
    }
    if (pupil.current) {
      const target = dilated ? 0.34 : 0.6;
      const cur = pupil.current.scale.x;
      const next = cur + (target - cur) * Math.min(delta * 6, 1);
      pupil.current.scale.set(next, next, next);
    }
  });

  function onPupilClick(e) {
    e.stopPropagation();
    setDilated((s) => !s);
  }

  // eyelids (simple geometry) - two dome-like caps
  const eyelidMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xffd6c4, roughness: 0.85 }), []);

  return (
    <group ref={group} position={[0, 0, 0]}>
      {/* Sclera outer sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.0, 128, 128]} />
        <meshPhysicalMaterial
          map={scleraTex}
          normalMap={scleraNormalTex}
          roughness={0.82}
          metalness={0}
          clearcoat={0.04}
          clippingPlanes={cutaway ? [clipPlane] : []}
          clipShadows={true}
        />
      </mesh>

      {/* Inner cavity / vitreous */}
      <mesh>
        <sphereGeometry args={[0.96, 128, 128]} />
        <meshPhysicalMaterial color={0xffffff} transparent opacity={0.04} transmission={0.95} clippingPlanes={cutaway ? [clipPlane] : []} />
      </mesh>

      {/* Iris (concave displaced circle) */}
      <mesh geometry={irisGeo} position={[0, 0, 0.915]} rotation={[0, 0, 0]} onPointerDown={(e) => e.stopPropagation()}>
        <meshStandardMaterial
          map={irisColorTex}
          normalMap={irisNormalTex}
          roughness={0.45}
          metalness={0}
          alphaMap={makePupilAlphaMap(1024)}
          transparent={true}
          side={THREE.DoubleSide}
          clippingPlanes={cutaway ? [clipPlane] : []}
          clipShadows={true}
        />
      </mesh>

      {/* Pupil depth (recessed dark cylinder + inner sphere) */}
      <group position={[0, 0, 0.885]} onClick={onPupilClick}>
        <mesh ref={pupil}>
          <cylinderGeometry args={[0.17, 0.17, 0.09, 64]} />
          <meshStandardMaterial color={0x000000} roughness={0.06} metalness={0} />
        </mesh>
        <mesh position={[0, 0, -0.06]}>
          <sphereGeometry args={[0.155, 64, 64]} />
          <meshStandardMaterial color={0x020202} roughness={0.02} metalness={0} />
        </mesh>
      </group>

      {/* Cornea (convex cap) */}
      <mesh position={[0, 0, 0.98]}> 
        <sphereGeometry args={[0.995, 128, 128, 0, Math.PI * 2, 0, Math.PI / 1.9]} />
        <meshPhysicalMaterial
          transparent
          transmission={0.96}
          thickness={0.09}
          roughness={0.02}
          ior={1.376}
          reflectivity={0.6}
          clearcoat={1}
          clearcoatRoughness={0.02}
          clippingPlanes={cutaway ? [clipPlane] : []}
          clipShadows={true}
        />
      </mesh>

      {/* Specular highlight on cornea */}
      <mesh position={[0.36, 0.33, 0.82]}> 
        <sphereGeometry args={[0.064, 32, 32]} />
        <meshBasicMaterial color={0xffffff} transparent opacity={0.6} />
      </mesh>

      {/* Lens (internal) - simplified biconvex */}
      <mesh position={[0, 0, 0.72]}> 
        <sphereGeometry args={[0.21, 64, 64]} />
        <meshPhysicalMaterial color={0xffffff} transparent opacity={0.12} transmission={0.9} ior={1.41} roughness={0.05} clippingPlanes={cutaway ? [clipPlane] : []} />
      </mesh>

      {/* Optic nerve bump at back */}
      <mesh position={[0, -0.22, -0.92]} rotation={[0.4, 0, 0]}> 
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color={0xedae9a} roughness={0.9} clippingPlanes={cutaway ? [clipPlane] : []} />
      </mesh>

      {/* Extraocular muscles (simplified cylinders) */}
      <group>
        {[0, 60, -60, 120].map((ang, i) => (
          <mesh key={i} position={[Math.cos((ang * Math.PI) / 180) * 1.45, Math.sin((ang * Math.PI) / 180) * -0.15, -0.3]} rotation={[0, 0, (ang * Math.PI) / 180]}> 
            <cylinderGeometry args={[0.06, 0.06, 1.4, 24]} />
            <meshStandardMaterial color={0xffcfcf} roughness={0.85} />
          </mesh>
        ))}
      </group>

      {/* Eyelids - simple shell geometries for visual top/bottom */}
      {showEyelids && (
        <group>
          <mesh position={[0, 0.48, 0.12]} rotation={[-0.85, 0, 0]}> 
            <sphereGeometry args={[1.02, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={0xffd6c4} roughness={0.9} metalness={0} transparent opacity={0.95} />
          </mesh>
          <mesh position={[0, -0.48, 0.12]} rotation={[0.85, 0, 0]}> 
            <sphereGeometry args={[1.02, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={0xffd6c4} roughness={0.9} metalness={0} transparent opacity={0.95} />
          </mesh>
        </group>
      )}

      {/* HTML label */}
      <Html position={[0, -1.6, 0]} occlude>
        <div style={{ color: "white", textAlign: "center", fontSize: 12 }}>Anatomical eye — click pupil to dilate</div>
      </Html>
    </group>
  );
}

// ---------------------------- Helpers: procedural canvas textures ----------------------------

function generateIrisColorCanvas(size = 2048, hue = 0.25) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  const cx = size / 2, cy = size / 2;

  // base radial gradient (hue control tuned for natural iris tones)
  const baseHue = 200 - hue * 140; // 200 -> bluish, 60 -> brownish
  const g = ctx.createRadialGradient(cx, cy, 8, cx, cy, size / 2);
  g.addColorStop(0, `hsl(${baseHue}, 30%, 8%)`);
  g.addColorStop(0.1, `hsl(${baseHue + 8}, 45%, 20%)`);
  g.addColorStop(0.35, `hsl(${baseHue - 8}, 62%, 38%)`);
  g.addColorStop(0.62, `hsl(${baseHue - 28}, 50%, 22%)`);
  g.addColorStop(1, `hsl(${baseHue - 48}, 45%, 12%)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);

  // radial fibers
  ctx.lineCap = "round";
  const rings = 1400;
  for (let i = 0; i < rings; i++) {
    const angle = (i / rings) * Math.PI * 2;
    const inner = 6 + Math.random() * 36;
    const outer = size / 2 - Math.random() * 20;
    const x1 = cx + inner * Math.cos(angle);
    const y1 = cy + inner * Math.sin(angle);
    const x2 = cx + outer * Math.cos(angle + (Math.random() - 0.5) * 0.01);
    const y2 = cy + outer * Math.sin(angle + (Math.random() - 0.5) * 0.01);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    const a = 0.06 + Math.random() * 0.45;
    ctx.strokeStyle = `rgba(0,0,0,${a})`;
    ctx.lineWidth = 0.4 + Math.random() * 1.2;
    ctx.stroke();
  }

  // speckles and variations
  for (let i = 0; i < 4500; i++) {
    const r = Math.random() * (size / 2 - 20);
    const theta = Math.random() * Math.PI * 2;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    const b = Math.floor(Math.random() * 200 + 20);
    ctx.fillStyle = `rgba(${b},${b},${b},${Math.random() * 0.25})`;
    ctx.fillRect(x, y, 1, 1);
  }

  // subtle pupillary ring
  ctx.beginPath();
  ctx.arc(cx, cy, 90, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0,0,0,0.12)";
  ctx.fill();

  return c;
}

function generateIrisDispCanvas(size = 2048) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);
  const cx = size / 2, cy = size / 2;

  const rings = 1400;
  for (let i = 0; i < rings; i++) {
    const angle = (i / rings) * Math.PI * 2;
    const inner = 6 + Math.random() * 36;
    const outer = size / 2 - Math.random() * 18;
    const x1 = cx + inner * Math.cos(angle);
    const y1 = cy + inner * Math.sin(angle);
    const x2 = cx + outer * Math.cos(angle + (Math.random() - 0.5) * 0.01);
    const y2 = cy + outer * Math.sin(angle + (Math.random() - 0.5) * 0.01);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    const a = 0.06 + Math.random() * 0.5;
    const g = Math.floor(120 + Math.random() * 100);
    ctx.strokeStyle = `rgba(${g},${g},${g},${a})`;
    ctx.lineWidth = 0.6 + Math.random() * 1.6;
    ctx.stroke();
  }

  // micro speckles
  for (let i = 0; i < 3500; i++) {
    const r = Math.random() * (size / 2 - 12);
    const theta = Math.random() * Math.PI * 2;
    const x = cx + r * Math.cos(theta);
    const y = cy + r * Math.sin(theta);
    const g = Math.floor(120 + Math.random() * 140);
    const a = Math.random() * 0.35;
    ctx.fillStyle = `rgba(${g},${g},${g},${a})`;
    ctx.fillRect(x, y, 1, 1);
  }

  return c;
}

function generateScleraVeinCanvas(size = 2048) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f6f6f7";
  ctx.fillRect(0, 0, size, size);

  const veins = 24;
  for (let i = 0; i < veins; i++) {
    ctx.beginPath();
    const sx = size * (0.3 + Math.random() * 0.4);
    const sy = size * (0.2 + Math.random() * 0.6);
    ctx.moveTo(sx, sy);
    const steps = 60 + Math.floor(Math.random() * 80);
    let x = sx, y = sy;
    for (let s = 0; s < steps; s++) {
      x += (Math.random() - 0.5) * 16;
      y += Math.random() * 8 + (Math.random() - 0.5) * 6;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(185,40,50,${0.07 + Math.random() * 0.18})`;
    ctx.lineWidth = 1 + Math.random() * 2.5;
    ctx.stroke();

    // small branches
    if (Math.random() > 0.5) {
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      const bx = sx + (Math.random() - 0.5) * 26;
      const by = sy + (Math.random() - 0.5) * 26;
      ctx.quadraticCurveTo((sx + bx) / 2, (sy + by) / 2 + 8, bx, by);
      ctx.strokeStyle = `rgba(190,60,70,${0.03 + Math.random() * 0.08})`;
      ctx.lineWidth = 0.9 + Math.random() * 1.3;
      ctx.stroke();
    }
  }

  // soften with light noise
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.02})`;
    ctx.fillRect(x, y, 1, 1);
  }

  return c;
}

// Generate a normal map canvas from a grayscale canvas using simple Sobel-like operator
function generateNormalFromGrayscaleCanvas(grayCanvas, strength = 1.0) {
  const w = grayCanvas.width;
  const h = grayCanvas.height;
  const srcCtx = grayCanvas.getContext("2d");
  const src = srcCtx.getImageData(0, 0, w, h).data;

  const nc = document.createElement("canvas");
  nc.width = w;
  nc.height = h;
  const nctx = nc.getContext("2d");
  const img = nctx.createImageData(w, h);

  // helper to get luminance at x,y
  function lum(x, y) {
    x = Math.max(0, Math.min(w - 1, x));
    y = Math.max(0, Math.min(h - 1, y));
    const i = (y * w + x) * 4;
    return (src[i] + src[i + 1] + src[i + 2]) / (3 * 255);
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // central differences
      const dx = (lum(x + 1, y) - lum(x - 1, y)) * strength;
      const dy = (lum(x, y + 1) - lum(x, y - 1)) * strength;
      // normal vector
      const nx = -dx;
      const ny = -dy;
      const nz = 1.0;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      const vx = (nx / len) * 0.5 + 0.5;
      const vy = (ny / len) * 0.5 + 0.5;
      const vz = (nz / len) * 0.5 + 0.5;
      const idx = (y * w + x) * 4;
      img.data[idx] = Math.floor(vx * 255);
      img.data[idx + 1] = Math.floor(vy * 255);
      img.data[idx + 2] = Math.floor(vz * 255);
      img.data[idx + 3] = 255;
    }
  }
  nctx.putImageData(img, 0, 0);
  return nc;
}

// Create an alpha map canvas where center is transparent (pupil hole)
function makePupilAlphaMap(size = 1024) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, Math.floor(size * 0.17), 0, Math.PI * 2);
  ctx.fill();
  return new THREE.CanvasTexture(c);
}

// -----------------------------------------------------------------------------------------
// End of file
// -----------------------------------------------------------------------------------------

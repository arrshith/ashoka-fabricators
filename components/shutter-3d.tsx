'use client';

/**
 * A rolling shutter in 3D, for comparing curtain materials.
 *
 * One scene: two guides, a headbox, and a curtain of strips in front of a lit
 * shop interior, so polycarbonate reads as see-through and steel does not.
 * The curtain rolls up into the headbox and back on a loop (GSAP), and the
 * material buttons swap the finish. three.js is only fetched once the viewer
 * is near the viewport, and rendering stops whenever it is off screen.
 * With reduced motion requested it renders a still, half-open frame.
 */

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { materials } from '@/lib/content';

type Look = { color: number; metalness: number; roughness: number; transmission?: number };

/** Approximate finishes. Tuned by eye against the material photographs. */
const LOOKS: Record<string, Look> = {
  'mild-steel': { color: 0x56626b, metalness: 0.35, roughness: 0.55 },
  'galvanised-iron': { color: 0xb3bac0, metalness: 0.9, roughness: 0.38 },
  galvalume: { color: 0xcbd0d4, metalness: 0.95, roughness: 0.22 },
  aluminium: { color: 0xe0e2e4, metalness: 0.55, roughness: 0.4 },
  polycarbonate: { color: 0xf2f7fa, metalness: 0, roughness: 0.06, transmission: 0.9 },
};

const W = 3.2;   // opening width
const H = 2.4;   // opening height
const N = 24;    // strips in the curtain

export function Shutter3D() {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<{ setLook: (slug: string) => void; setPlaying: (on: boolean) => void } | null>(null);
  const [look, setLook] = useState(materials[1].slug);
  const [playing, setPlaying] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dispose: (() => void) | undefined;
    let cancelled = false;

    const boot = async () => {
      const THREE = await import('three');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      const { gsap } = await import('gsap');
      if (cancelled) return;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.55;

      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
      camera.position.set(0, 0.15, 7.2);

      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(3, 4, 5);
      scene.add(key, new THREE.AmbientLight(0xffffff, 0.35));

      const rig = new THREE.Group();
      scene.add(rig);

      // Shop interior behind the opening: a back wall, a warm light, shelves.
      const interior = new THREE.Group();
      const wall = new THREE.Mesh(new THREE.PlaneGeometry(W + 0.6, H + 0.6), new THREE.MeshStandardMaterial({ color: 0x241f1c, roughness: 0.95 }));
      wall.position.z = -1.2;
      interior.add(wall);
      const warm = new THREE.PointLight(0xffc98a, 6, 5);
      warm.position.set(0, 0.6, -0.4);
      interior.add(warm);
      const shelfColors = [0xb9202e, 0xd9c7a1, 0x3d6b7a, 0xe8e2d6, 0x8a5a3b];
      for (let row = 0; row < 3; row++) {
        for (let i = 0; i < 5; i++) {
          const box = new THREE.Mesh(
            new THREE.BoxGeometry(0.42, 0.34, 0.3),
            new THREE.MeshStandardMaterial({ color: shelfColors[(i + row) % 5], roughness: 0.7 }),
          );
          box.position.set(-1.1 + i * 0.55, -0.75 + row * 0.62, -0.95);
          interior.add(box);
        }
      }
      rig.add(interior);

      // Frame: two guides and the headbox the curtain rolls into.
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x2a3134, metalness: 0.6, roughness: 0.45 });
      for (const side of [-1, 1]) {
        const guide = new THREE.Mesh(new THREE.BoxGeometry(0.12, H + 0.1, 0.2), frameMat);
        guide.position.set(side * (W / 2 + 0.06), 0, 0);
        rig.add(guide);
      }
      const headbox = new THREE.Mesh(new THREE.BoxGeometry(W + 0.36, 0.48, 0.5), frameMat);
      headbox.position.set(0, H / 2 + 0.24, 0.05);
      rig.add(headbox);

      // Curtain: strips butted edge to edge, each with a dark joint line at
      // its top so the curtain reads as strips without being see-through.
      const curtainMat = new THREE.MeshPhysicalMaterial({ thickness: 0.15, ior: 1.58 });
      const curtain = new THREE.Group();
      const pitch = H / N;
      const strip = new THREE.BoxGeometry(W, pitch, 0.04);
      const joint = new THREE.BoxGeometry(W, pitch * 0.1, 0.004);
      const jointMat = new THREE.MeshStandardMaterial({ color: 0x14181a, roughness: 0.8 });
      const strips: InstanceType<typeof THREE.Mesh>[] = [];
      for (let i = 0; i < N; i++) {
        const m = new THREE.Mesh(strip, curtainMat);
        m.position.y = H / 2 - pitch * (i + 0.5);
        const j = new THREE.Mesh(joint, jointMat);
        j.position.set(0, pitch * 0.45, 0.021);
        m.add(j);
        curtain.add(m);
        strips.push(m);
      }
      const rail = new THREE.Mesh(new THREE.BoxGeometry(W, 0.07, 0.09), frameMat);
      rail.position.y = -H / 2 + 0.035;
      curtain.add(rail);
      rig.add(curtain);

      const applyLook = (slug: string) => {
        const l = LOOKS[slug] ?? LOOKS['galvanised-iron'];
        curtainMat.color.setHex(l.color);
        curtainMat.metalness = l.metalness;
        curtainMat.roughness = l.roughness;
        curtainMat.transmission = l.transmission ?? 0;
        curtainMat.transparent = !!l.transmission;
        curtainMat.needsUpdate = true;
      };
      applyLook(look);

      // Openness 0 (closed) to 1 (open). Strips that pass the lintel disappear
      // into the headbox, which is where a real curtain coils.
      const state = { open: still ? 0.45 : 0 };
      const place = () => {
        curtain.position.y = state.open * H;
        for (const m of strips) m.visible = m.position.y + curtain.position.y < H / 2 + 0.02;
      };

      const size = () => {
        const w = el.clientWidth, h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Keep the whole frame in view on narrow screens.
        camera.position.z = w / h < 1.2 ? 9.6 : 7.2;
        camera.updateProjectionMatrix();
      };
      size();
      const ro = new ResizeObserver(size);
      ro.observe(el);

      // A gentle turn toward the pointer; enough to read depth, never a spin.
      const aim = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        aim.x = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
        aim.y = ((e.clientY - r.top) / r.height - 0.5) * 0.2;
      };
      el.addEventListener('pointermove', onMove);

      const loop = still ? null : gsap.to(state, {
        open: 1, duration: 2.6, ease: 'power2.inOut', repeat: -1, yoyo: true, repeatDelay: 1.4,
      });

      const frame = () => {
        rig.rotation.y += (aim.x - rig.rotation.y) * 0.06;
        rig.rotation.x += (aim.y - rig.rotation.x) * 0.06;
        place();
        renderer.render(scene, camera);
      };

      let visible = false;
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (still) { frame(); return; }
        renderer.setAnimationLoop(visible ? frame : null);
        if (visible) loop?.resume(); else loop?.pause();
      });
      io.observe(el);
      frame();

      api.current = {
        setLook: (slug) => { applyLook(slug); if (still || !visible) frame(); },
        setPlaying: (on) => { if (on) loop?.resume(); else loop?.pause(); },
      };
      setReady(true);

      dispose = () => {
        io.disconnect(); ro.disconnect(); loop?.kill();
        el.removeEventListener('pointermove', onMove);
        renderer.setAnimationLoop(null);
        scene.traverse((o) => {
          if (o instanceof THREE.Mesh) {
            o.geometry.dispose();
            (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
          }
        });
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // Fetch three.js only when the viewer is about to be seen.
    const near = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      near.disconnect();
      boot();
    }, { rootMargin: '400px 0px' });
    near.observe(el);

    return () => { cancelled = true; near.disconnect(); dispose?.(); api.current = null; };
    // The initial look is read once; later changes go through `api`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pick = (slug: string) => { setLook(slug); api.current?.setLook(slug); };
  const toggle = () => { const on = !playing; setPlaying(on); api.current?.setPlaying(on); };

  return (
    <div className="s3d">
      <div className="s3d__stage" ref={host} role="img"
        aria-label={`A rolling shutter in ${materials.find((m) => m.slug === look)?.name.toLowerCase()}, rolling open and closed`}>
        {!ready && <span className="s3d__wait meta">Loading 3D view…</span>}
      </div>
      <div className="s3d__bar">
        <div className="s3d__picks" role="group" aria-label="Curtain material">
          {materials.map((m) => (
            <button key={m.slug} type="button" className={m.slug === look ? 'is-on' : undefined}
              aria-pressed={m.slug === look} onClick={() => pick(m.slug)}>
              {m.name}
            </button>
          ))}
        </div>
        <button type="button" className="s3d__play" onClick={toggle} aria-label={playing ? 'Pause animation' : 'Play animation'}>
          {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
}

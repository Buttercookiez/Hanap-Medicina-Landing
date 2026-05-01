import { useEffect, useRef, useState, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center, Float, Resize } from "@react-three/drei";

import Header from "./components/Header";
import Footer from "./components/Footer";
import StepsCarousel from "./components/StepsCarousel";
import ScrollVideo from "./components/ScrollVideo"; 
import HeroSection from "./components/sections/HeroSection";
import ValuePropositionSection from "./components/sections/ValuePropositionSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import CapabilitiesSection from "./components/sections/CapabilitiesSection";
import PlantsSection from "./components/sections/PlantsSection";
import FaqSection from "./components/sections/FaqSection"; 
import DownloadSection from "./components/sections/DownloadSection";

import { steps } from "./data";

gsap.registerPlugin(ScrollTrigger);

useGLTF.preload('/Plant.glb');

function GlobalPlantModel({ proxyRef }: { proxyRef: React.MutableRefObject<any> }) {
  const { scene } = useGLTF('/Plant.glb');
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, proxyRef.current.x, 0.08);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, proxyRef.current.y, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, proxyRef.current.rotY, 0.08);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, proxyRef.current.scale, 0.08));
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
        <group rotation={[0.2, 0, 0]}>
          <Center>
            <Resize scale={1}>
              <primitive object={scene} />
            </Resize>
          </Center>
        </group>
      </Float>
    </group>
  );
}

// ── CUSTOM CURSOR ──────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);
  const leafPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const leaf = leafRef.current;
    const leafPath = leafPathRef.current;
    if (!dot || !leaf || !leafPath) return;

    const LEAF_NORMAL = 'M16 2 C16 2 28 8 28 20 C28 26 22 30 16 30 C10 30 4 26 4 20 C4 8 16 2 16 2Z';
    const LEAF_HOVER  = 'M16 2 C22 4 30 10 30 18 C30 26 24 31 16 31 C8 31 2 26 2 18 C2 10 10 4 16 2Z';

    let mx = -100, my = -100;
    let lx = -100, ly = -100;
    let isHover = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onEnter = () => {
      isHover = true;
      leaf.style.width = '48px';
      leaf.style.height = '48px';
      leafPath.setAttribute('d', LEAF_HOVER);
      dot.style.width = '4px';
      dot.style.height = '4px';
    };

    const onLeave = () => {
      isHover = false;
      leaf.style.width = '32px';
      leaf.style.height = '32px';
      leafPath.setAttribute('d', LEAF_NORMAL);
      dot.style.width = '8px';
      dot.style.height = '8px';
    };

    document.body.style.cursor = 'none';
    document.addEventListener('mousemove', onMouseMove);

    const applyListeners = () => {
      document.querySelectorAll('a, button, [role="button"], input, label, select, textarea')
        .forEach(el => {
          (el as HTMLElement).style.cursor = 'none';
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
        });
    };

    applyListeners();

    const observer = new MutationObserver(applyListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      lx = lerp(lx, mx, 0.1);
      ly = lerp(ly, my, 0.1);

      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      leaf.style.left = `${lx}px`;
      leaf.style.top = `${ly}px`;

      const dx = mx - lx;
      const dy = my - ly;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const speed = Math.sqrt(dx * dx + dy * dy);
      const tilt = isHover ? 0 : -35 + angle * 0.3;
      const scale = isHover ? 1 : 1 + Math.min(speed * 0.01, 0.15);

      leaf.style.transform = `translate(-50%, -50%) rotate(${tilt}deg) scale(${scale})`;

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          width: 8, height: 8,
          background: '#86efac',
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s',
          zIndex: 999999,
        }}
      />
      <div
        ref={leafRef}
        style={{
          width: 32, height: 32,
          position: 'fixed',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%) rotate(-35deg)',
          transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1)',
          zIndex: 999998,
        }}
      >
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path
            ref={leafPathRef}
            d="M16 2 C16 2 28 8 28 20 C28 26 22 30 16 30 C10 30 4 26 4 20 C4 8 16 2 16 2Z"
            fill="#86efac"
            opacity="0.9"
          />
          <path d="M16 4 C16 4 16 28 16 29" stroke="#010f07" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
          <path d="M16 10 C12 14 8 16 6 18" stroke="#010f07" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.35"/>
          <path d="M16 15 C20 18 24 19 26 20" stroke="#010f07" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.35"/>
          <path d="M16 20 C13 22 10 23 8 24" stroke="#010f07" strokeWidth="0.8" fill="none" strokeLinecap="round" opacity="0.35"/>
        </svg>
      </div>
    </>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────
export default function App() {
  const panelsWrapRef = useRef<HTMLDivElement>(null);
  const panelsStickyRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [stepsScrollIndex, setStepsScrollIndex] = useState(0);
  const plantProxy = useRef({ x: 0, y: 0, scale: 4.5, rotY: 0 });

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasInteracted = useRef(false);

  // 1. Loading Screen Logic
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 1.2,
            ease: "power4.inOut",
            delay: 0.2,
            onComplete: () => {
              setIsLoaded(true);
              document.body.style.overflow = "";
            }
          });
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 1; 
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // 2. Audio Autoplay Logic
  useEffect(() => {
    if (!isLoaded) return;

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    const handleFirstInteraction = () => {
      if (!hasInteracted.current && audioRef.current) {
        hasInteracted.current = true;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
      }
      removeListeners();
    };

    if (!hasInteracted.current && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        hasInteracted.current = true;
        removeListeners();
      }).catch((err) => {
        console.warn("Autoplay blocked, waiting for interaction...", err);
        window.addEventListener("click", handleFirstInteraction);
        window.addEventListener("scroll", handleFirstInteraction);
        window.addEventListener("touchstart", handleFirstInteraction);
      });
    }

    return removeListeners;
  }, [isLoaded]);

  const toggleAudio = () => {
    hasInteracted.current = true;
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
      }
    }
  };

  // 3. Main Scroll Animations
  useEffect(() => {
    if (!isLoaded) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);

    const wrap = panelsWrapRef.current;
    const sticky = panelsStickyRef.current;
    if (!wrap || !sticky) return;

    const ctx = gsap.context(() => {
      const heroSectionWrap = document.querySelector(".hero-section") as HTMLElement;
      const heroSticky = document.querySelector(".hero-sticky") as HTMLElement;
      if (heroSectionWrap && heroSticky) {
        heroSectionWrap.style.backgroundColor = "transparent";
        heroSticky.style.backgroundColor = "#f4efe6";
        heroSticky.style.transformOrigin = "center top";
        gsap.to(heroSticky, {
          scale: 0.92, filter: "blur(12px)", yPercent: -5, borderRadius: "36px", ease: "none",
          scrollTrigger: { trigger: wrap, start: "top bottom", end: "top top", scrub: true },
        });
      }

      const panels = Array.from(sticky.querySelectorAll<HTMLElement>(".panel"));
      panels.forEach((panel, i) => {
        panel.style.zIndex = String(i + 1);
        if (i === 0) {
          gsap.set(panel, { yPercent: 0, borderRadius: "36px 36px 0 0" });
        } else {
          gsap.set(panel, { yPercent: 100, borderRadius: "36px 36px 0 0", boxShadow: "0px -20px 60px rgba(0,0,0,0.0)" });
        }
      });

      gsap.set('.feat-card-0, .feat-card-1, .feat-card-2', { opacity: 0, x: -30 });
      for (let i = 1; i <= 5; i++) gsap.set(`.cap-card-anim-${i}`, { y: "150vh" });
      gsap.set(clipRef.current, { height: "100%" });

      const masterTl = gsap.timeline({
        scrollTrigger: { trigger: wrap, start: "top top", end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
      });

      const isMobile = window.innerWidth <= 768;

      masterTl.to(plantProxy.current, { x: isMobile ? 0 : 3.2, y: isMobile ? -2.5 : -0.2, scale: isMobile ? 2.5 : 3.5, duration: 1, ease: "power2.inOut" }, 0);
      masterTl.to(plantProxy.current, { rotY: "+=" + (Math.PI * 15), duration: 24 }, 0);
      masterTl.to('.feat-card-0', { opacity: 1, x: 0, duration: 1.5 }, 1.0);
      masterTl.to('.feat-card-1', { opacity: 1, x: 0, duration: 1.5 }, 2.5);
      masterTl.to('.feat-card-2', { opacity: 1, x: 0, duration: 1.5 }, 4.0);

      masterTl.to(canvasContainerRef.current, { scale: 0.92, filter: "blur(12px)", yPercent: -5, borderRadius: "36px", duration: 1 }, 8);
      masterTl.to(clipRef.current, { height: "0%", duration: 1 }, 8);
      if (panels[0] && panels[1]) {
        masterTl.to(panels[0], { scale: 0.92, filter: "blur(12px)", yPercent: -5, borderRadius: "36px", duration: 1 }, 8);
        masterTl.to(panels[1], { yPercent: 0, borderRadius: "36px 36px 0 0", ease: "none", duration: 1 }, 8);
      }
      [1, 2, 3, 4, 5].forEach((i) => masterTl.to(`.cap-card-anim-${i}`, { y: 0, ease: "power3.out", duration: 1.5 }, 9 + i));

      if (panels[1] && panels[2]) {
        masterTl.to(panels[1], { scale: 0.92, filter: "blur(12px)", yPercent: -5, borderRadius: "36px", duration: 1 }, 16);
        masterTl.to(panels[2], { yPercent: 0, borderRadius: "36px 36px 0 0", ease: "none", duration: 1 }, 16);
      }
      masterTl.to({}, { duration: 4, onUpdate: function () { setStepsScrollIndex(Math.min(steps.length - 1, Math.floor(this.progress() * steps.length))); } }, 17);

      if (panels[2] && panels[3]) {
        masterTl.to(panels[2], { scale: 0.92, filter: "blur(12px)", yPercent: -5, borderRadius: "36px", duration: 1 }, 22);
        masterTl.to(panels[3], { yPercent: 0, borderRadius: "36px 36px 0 0", ease: "none", duration: 1 }, 22);
      }
      masterTl.to(".plants-scroll-track", { y: () => -(document.querySelector(".plants-scroll-track")?.scrollHeight || 0) + window.innerHeight, ease: "none", duration: 6 }, 23);

      if (panels[3] && panels[4]) {
        masterTl.to(panels[3], { scale: 0.92, filter: "blur(12px)", yPercent: -5, borderRadius: "36px", duration: 1 }, 30);
        masterTl.to(panels[4], { yPercent: 0, borderRadius: "36px 36px 0 0", ease: "none", duration: 1 }, 30);
      }
      masterTl.to(".faq-scroll-track", { y: () => -(document.querySelector(".faq-scroll-track")?.scrollHeight || 0) + window.innerHeight, ease: "none", duration: 4.5 }, 31);

      if (panels[4] && panels[5]) {
        masterTl.to(panels[4], { scale: 0.9, filter: "blur(20px)", opacity: 0, yPercent: -10, duration: 1 }, 36.5);
        masterTl.to(panels[5], { yPercent: 0, duration: 1 }, 36.5);
      }

      const phone = document.querySelector("#dl-phone-wrapper") as HTMLElement | null;
      const stepsText = gsap.utils.toArray(".dl-step") as HTMLElement[];
      const dlLinks = document.querySelector("#dl-footer-links") as HTMLElement | null;
      const frameCount = 204;
      const frameObject = { frame: 1 };
      const preloadedFrames: HTMLImageElement[] = [];
      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = `/videos/frameapp/test_${i.toString().padStart(3, '0')}.jpg`;
        preloadedFrames.push(img);
      }

      if (phone) {
        gsap.set(phone, { y: 900, opacity: 0, scale: 0.8 });
        masterTl.to(phone, { y: 0, opacity: 1, scale: 1, duration: 2, ease: "power3.out" }, 37.5);
        masterTl.to(frameObject, {
          frame: frameCount, snap: "frame", ease: "none", duration: 6,
          onUpdate: () => {
            const canvas = document.querySelector("#download-canvas-frame") as HTMLCanvasElement;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            const img = preloadedFrames[frameObject.frame - 1];
            if (img && img.complete) {
              ctx?.clearRect(0, 0, canvas.width, canvas.height);
              const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
              const drawW = img.naturalWidth * scale;
              const drawH = img.naturalHeight * scale;
              const dx = (canvas.width - drawW) / 2;
              const dy = (canvas.height - drawH) / 2;
              ctx?.drawImage(img, dx, dy, drawW, drawH);
            }
          }
        }, 38.5);
        stepsText.forEach((st, i) => {
          masterTl.fromTo(st, { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 }, { opacity: 1, x: 0, y: 0, duration: 1.5, ease: "power2.out" }, 39 + i);
        });
        if (dlLinks) masterTl.to(dlLinks, { opacity: 1, y: -20, duration: 1 }, 43);
      }

      masterTl.to({}, { duration: 2 }, 45);

      const animStartTimes = [0, 8.5, 16.5, 22.5, 30.5, 36.5];
      panels.forEach((panel, i) => {
        const pAnim = panel.querySelectorAll(".p-anim");
        if (pAnim.length === 0) return;
        gsap.fromTo(pAnim, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1,
          scrollTrigger: { trigger: wrap, start: () => `top+=${(animStartTimes[i] / 50) * wrap.offsetHeight} top`, toggleActions: "play none none reverse" },
        });
      });

    }, wrap);

    ScrollTrigger.refresh();
    return () => { ctx.revert(); lenis.destroy(); };
  }, [isLoaded, steps.length]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <audio ref={audioRef} src="/audio/nature.mp3" loop />

      {/* ── CUSTOM CURSOR ── */}
      <CustomCursor />

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --g:#166534; --g-mid:#22c55e; --ink:#052e16; --white:#ffffff; }
        body { font-family: 'Outfit', sans-serif; background: #011a0e; color: var(--ink); overflow-x: hidden; -webkit-font-smoothing: antialiased; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .panels-wrap { position: relative; height: 5000vh; }
        .panels-sticky { position: sticky; top: 0; height: 100vh; overflow: hidden; background-color: #f4efe6; }
        .panel { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 40px 72px; overflow: hidden; transform-origin: center top; will-change: transform, filter, border-radius; }
        .panel-capabilities { background-color: #010f07 !important; }
        .panel-steps { background: #041c10; padding: 0 !important; }
        .panel-plants { background: #000 !important; padding: 0 !important; }
        .panel-faq { background: #F9F9F7 !important; color: #052e16 !important; }
        .panel-download { background: #FFFFFF !important; color: white !important; }
        @media(max-width:768px) { .panel { padding: 70px 24px 32px; } }

        .sound-bar {
          width: 3px;
          background-color: currentColor;
          border-radius: 2px;
          transition: height 0.3s ease, gap 0.3s ease;
        }
        .sound-toggle-btn.muted .sound-bar { height: 3px !important; animation: none !important; }
        .sound-toggle-btn.playing .sound-bar:nth-child(1) { height: 8px; animation: eq1 0.6s ease-in-out infinite alternate; }
        .sound-toggle-btn.playing .sound-bar:nth-child(2) { height: 14px; animation: eq2 0.7s ease-in-out infinite alternate -0.2s; }
        .sound-toggle-btn.playing .sound-bar:nth-child(3) { height: 20px; animation: eq3 0.6s ease-in-out infinite alternate -0.4s; }
        .sound-toggle-btn.playing .sound-bar:nth-child(4) { height: 14px; animation: eq2 0.7s ease-in-out infinite alternate -0.1s; }
        .sound-toggle-btn.playing .sound-bar:nth-child(5) { height: 8px; animation: eq1 0.6s ease-in-out infinite alternate -0.3s; }
        @keyframes eq1 { 0% { height: 4px; } 100% { height: 10px; } }
        @keyframes eq2 { 0% { height: 8px; } 100% { height: 18px; } }
        @keyframes eq3 { 0% { height: 12px; } 100% { height: 24px; } }
      `}</style>

      {/* LOADER */}
      <div
        ref={loaderRef}
        className="fixed inset-0 z-[99999] bg-[#010f07] flex items-end justify-between p-8 md:p-16 text-emerald-500 font-['Outfit'] font-medium"
      >
        <span className="text-xl md:text-2xl tracking-widest uppercase">Initializing System</span>
        <span className="text-6xl md:text-8xl font-['Bebas_Neue'] tabular-nums tracking-tighter">{loadProgress}%</span>
      </div>

      <Header isLoaded={isLoaded} isPlaying={isPlaying} toggleAudio={toggleAudio} />
      
      <ScrollVideo isLoaded={isLoaded} />
      
      <ValuePropositionSection />

      <div className="relative w-full z-10">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-30">
          <div className="sticky top-0 w-full h-screen">
            <div ref={clipRef} className="w-full h-full overflow-hidden" style={{ position: "relative" }}>
              <div ref={canvasContainerRef} className="w-full h-[100vh] flex justify-center items-center" style={{ transformOrigin: "center top" }}>
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true }} shadows>
                  <ambientLight intensity={1.5} />
                  <directionalLight position={[10, 10, 5]} intensity={2.5} castShadow />
                  <Environment preset="forest" />
                  <Suspense fallback={null}>
                    <GlobalPlantModel proxyRef={plantProxy} />
                  </Suspense>
                </Canvas>
              </div>
            </div>
          </div>
        </div>

        <HeroSection plantProxy={plantProxy} />

        <div className="panels-wrap" ref={panelsWrapRef} style={{ marginTop: "-100vh" }}>
          <div className="panels-sticky" ref={panelsStickyRef}>
            <FeaturesSection />
            <CapabilitiesSection />
            <div className="panel panel-steps">
              <StepsCarousel scrollIndex={stepsScrollIndex} />
            </div>
            <PlantsSection />
            <FaqSection />
            <DownloadSection />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "../data";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface StepsCarouselProps {
  scrollIndex: number;
}

export default function StepsCarousel({ scrollIndex }: StepsCarouselProps) {
  const total = steps.length;
  const stepAngle = 22;

  const rotationRef = useRef({ current: 0 });
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  
  const svgRef = useRef<SVGSVGElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null); // Ref for line 1
  const text2Ref = useRef<HTMLSpanElement>(null); // Ref for line 2
  const dotsEntryRef = useRef<HTMLDivElement>(null);
  const contentEntryRef = useRef<HTMLDivElement>(null);

  const cx = 600, cy = 1150;     
  const rArc = 900;
  const rNode = 960;

  function applyNodePositions(rotOffset: number, curActive: number) {
    const svg = svgRef.current;
    if (!svg) return;

    steps.forEach((_, i) => {
      const angleDeg = 270 + (i * stepAngle) + rotOffset;
      const aRad = (angleDeg * Math.PI) / 180;
      
      const xArc = cx + rArc * Math.cos(aRad);
      const yArc = cy + rArc * Math.sin(aRad);
      const xNode = cx + rNode * Math.cos(aRad);
      const yNode = cy + rNode * Math.sin(aRad);
      
      const isActive = i === curActive;

      const circle = svg.querySelector(`#node-circle-${i}`) as SVGCircleElement;
      const text   = svg.querySelector(`#node-text-${i}`)   as SVGTextElement;
      const dot    = svg.querySelector(`#node-dot-${i}`)    as SVGCircleElement;
      const line   = svg.querySelector(`#node-line-${i}`)   as SVGLineElement;

      if (!circle || !text || !dot || !line) return;

      circle.setAttribute("cx", String(xNode));
      circle.setAttribute("cy", String(yNode));
      circle.setAttribute("r", isActive ? "22" : "20");
      circle.setAttribute("fill", isActive ? "#dce6d8" : "#041c10");
      circle.setAttribute("stroke", isActive ? "none" : "rgba(255,255,255,0.3)");
      circle.setAttribute("stroke-width", "1.2");

      text.setAttribute("x", String(xNode));
      text.setAttribute("y", String(yNode + 6.5));
      text.setAttribute("fill", isActive ? "#041c10" : "#fff");
      text.setAttribute("font-weight", isActive ? "600" : "400");
      text.setAttribute("font-size", isActive ? "19" : "16");
      
      const textRot = angleDeg - 270; 
      text.setAttribute("transform", `rotate(${textRot}, ${xNode}, ${yNode})`);

      dot.setAttribute("cx", String(xArc));
      dot.setAttribute("cy", String(yArc));
      
      if (isActive) {
        line.setAttribute("x1", String(xArc));
        line.setAttribute("y1", String(yArc));
        line.setAttribute("x2", String(xArc));
        line.setAttribute("y2", String(yArc + 80));
        line.setAttribute("opacity", "1");
      } else {
        line.setAttribute("opacity", "0");
      }
    });
  }

  // --- ENTRANCE ANIMATIONS ---
  useEffect(() => {
    applyNodePositions(0, 0);

    // Using gsap.context ensures proper cleanup and avoids strict-mode double firing
    const ctx = gsap.context(() => {
      const wrap = document.querySelector(".panels-wrap") as HTMLElement;

      if (wrap) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            // 16.5 matches the EXACT scrub timing for Panel 2 in your App.tsx!
            start: () => `top+=${(16.5 / 50) * wrap.offsetHeight} top`, 
            toggleActions: "play none none reverse",
          }
        });

        // 1. Cinematic Text Reveal — slowed down for a more elegant entrance
        tl.fromTo(
          [text1Ref.current, text2Ref.current],
          { y: "120%" },
          {
            y: "0%",
            duration: 2.2,   // was 1.5 — slower, more cinematic
            stagger: 0.28,   // was 0.15 — more breathing room between the two lines
            ease: "power4.out",
          }
        )
        // 2. The rest of the elements fade in gracefully right after
        .fromTo(svgRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=1.0")
        .fromTo(contentEntryRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.7")
        .fromTo(dotsEntryRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
      }
    });

    return () => ctx.revert();
  },[]);

  // --- CAROUSEL ROTATION LOGIC ---
  useEffect(() => {
    const newActive = Math.max(0, Math.min(scrollIndex, total - 1));
    if (newActive === activeRef.current) return;
    
    activeRef.current = newActive;
    const targetRotation = -newActive * stepAngle;

    setFading(true);

    gsap.to(rotationRef.current, {
      current: targetRotation,
      duration: 0.65,
      ease: "power2.inOut",
      onUpdate: () => applyNodePositions(rotationRef.current.current, newActive),
      onComplete: () => {
        setActive(newActive);
        setTimeout(() => setFading(false), 50);
      },
    });
  }, [scrollIndex, total]);

  const currentStep = steps[active];

  return (
    <div style={{
      width: "100%", height: "100%", background: "#041c10",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column",
    }}>
      
      {/* ── HEADING ── */}
      <div style={{ padding: "100px 80px 0", flexShrink: 0, position: "relative", zIndex: 10 }}>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2.5rem, 4vw, 4rem)",
          fontWeight: 400,
          color: "#e8ede6",
          letterSpacing: "0.05em",
          lineHeight: 1.05,
          margin: 0,
          textTransform: "uppercase"
        }}>
          {/* Split text into blocks with overflow:hidden so they slide out seamlessly */}
          <span style={{ display: "block", overflow: "hidden", paddingBottom: "4px" }}>
            <span ref={text1Ref} style={{ display: "block", transform: "translateY(120%)" }}>YOUR REMEDY</span>
          </span>
          <span style={{ display: "block", overflow: "hidden", paddingBottom: "4px" }}>
            <span ref={text2Ref} style={{ display: "block", transform: "translateY(120%)", color: "#d8c398" }}>STARTS HERE</span>
          </span>
        </h2>
      </div>

      {/* ── INTERACTIVE AREA ── */}
      <div style={{ flex: 1, position: "relative", width: "100%", display: "flex", justifyContent: "center", paddingTop: "50px" }}>
        
        <div style={{ position: "relative", width: "100%", maxWidth: "1200px", aspectRatio: "1200 / 650" }}>
          
          <svg
            ref={svgRef}
            viewBox="0 0 1200 650"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <circle cx={cx} cy={cy} r={rArc} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            
            {steps.map((_, i) => (
              <g key={i}>
                <circle id={`node-circle-${i}`} />
                <text id={`node-text-${i}`} fontFamily="Outfit, sans-serif" textAnchor="middle">{i + 1}</text>
                <circle id={`node-dot-${i}`} r="4.5" fill="#d8c398" />
                <line id={`node-line-${i}`} stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
              </g>
            ))}
          </svg>

          {/* ── DYNAMIC TEXT BLOCK ── */}
          <div style={{
            position: "absolute",
            top: "54%", 
            left: "50%",
            transform: "translateX(-50%)", 
            width: "650px",
            maxWidth: "85vw",
            textAlign: "center",
            zIndex: 10,
          }}>
            <div ref={contentEntryRef}>
              <div style={{
                opacity: fading ? 0 : 1,
                transform: fading ? "translateY(12px)" : "translateY(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}>
                <h3 style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.6rem, 2.5vw, 2.1rem)",
                  fontWeight: 400,
                  color: "#d8c398",
                  marginBottom: "18px",
                  lineHeight: 1.28,
                  letterSpacing: "0.05em",
                }}>
                  {currentStep.title}
                </h3>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.02rem",
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.8)",
                  margin: 0,
                }}>
                  {currentStep.desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── DOT INDICATORS ── */}
        <div style={{
          position: "absolute", 
          bottom: "10%", 
          left: "50%", 
          transform: "translateX(-50%)", 
          zIndex: 20,
        }}>
          <div ref={dotsEntryRef} style={{ display: "flex", gap: "10px" }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                width: i === active ? "28px" : "8px",
                height: "8px",
                borderRadius: "999px",
                background: i === active ? "#d8c398" : "rgba(255,255,255,0.12)",
                transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
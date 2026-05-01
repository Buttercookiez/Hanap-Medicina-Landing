import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const vpItems = [
  {
    title: "Accurate ID",
    body: "AI trained on Philippine herbs for safe, instant identification.",
    color: "#22c55e",
    bg: "#011a0e"
  },
  {
    title: "Safe Usage",
    body: "Dosage guides and preparation steps for traditional medicine.",
    color: "#011a0e",
    bg: "#f4efe6"
  },
  {
    title: "Offline Sync",
    body: "Sync herbal wisdom locally. Access your library anywhere.",
    color: "#22c55e",
    bg: "#052e16"
  }
];

export default function ValuePropositionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".vp-row");

      rows.forEach((row, i) => {
        const charElements = row.querySelectorAll(".char");
        const container = row.querySelector(".vp-title-container");
        const bodyText = row.querySelector(".vp-body-text");

        // 1. Initial State: Pull letters up/down and hide
        gsap.set(charElements, {
          y: (index) => (index % 2 === 0 ? 100 : -100),
          opacity: 0
        });

        // 2. Initial State: Horizontal Offset
        const xOffset = i % 2 === 0 ? -15 : 15; // Moves horizontally slightly
        gsap.set(container, { xPercent: xOffset });

        // 3. Create Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            // START: when top of row is 80% from top of screen
            // END: when top of row is 20% from top of screen
            start: "top 85%", 
            end: "top 15%",
            scrub: 1, // Smoothly ties animation to scroll
          }
        });

        tl.to(container, { xPercent: 0, ease: "none" }, 0)
          .to(charElements, {
            y: 0,
            opacity: 1,
            stagger: 0.01,
            ease: "power2.out"
          }, 0)
          .fromTo(bodyText, 
            { opacity: 0, y: 20 }, 
            { opacity: 0.6, y: 0 }, 0.2
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full">
      {vpItems.map((item, idx) => (
        <div 
          key={idx} 
          className="vp-row min-h-[80vh] flex flex-col justify-center px-10 md:px-24 overflow-hidden relative"
          style={{ backgroundColor: item.bg }}
        >
          <div className="vp-title-container will-change-transform">
            <h2 
              className="text-[14vw] md:text-[11vw] font-bold leading-none tracking-tighter uppercase whitespace-nowrap flex"
              style={{ color: item.color }}
            >
              {/* This logic splits the text into individual <span> letters manually */}
              {item.title.split("").map((char, charIdx) => (
                <span key={charIdx} className="char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
          </div>
          
          <div className="max-w-lg mt-10 vp-body-text">
            <p className="text-xl md:text-2xl font-light leading-relaxed" style={{ color: item.color }}>
              {item.body}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
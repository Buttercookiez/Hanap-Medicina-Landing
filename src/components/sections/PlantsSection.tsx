import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import albueroImg from "../../assets/albuero.jpg";

const premiumPlants = [
  { id: "SPEC-01", name: "Lagundi", scientific: "Vitex negundo", use: "Relief for asthma, cough, and localized inflammation.", img: "https://images.pexels.com/photos/12643734/pexels-photo-12643734.jpeg", notes: "Decoction / 5-leaf method" },
  { id: "SPEC-02", name: "Sambong", scientific: "Blumea balsamifera", use: "Clinically used for anti-urolithiasis and as a natural diuretic.", img: "https://images.pexels.com/photos/13782618/pexels-photo-13782618.jpeg", notes: "Camphor-scented / Renal support" },
  { id: "SPEC-03", name: "Tsaang Gubat", scientific: "Carmona retusa", use: "Highly effective for abdominal pain and intestinal motility.", img: "https://images.pexels.com/photos/6876712/pexels-photo-6876712.jpeg", notes: "Leaf Infusion / Digestive aid" },
  { id: "SPEC-04", name: "Akapulko", scientific: "Senna alata", use: "Primary treatment for fungal infections and skin conditions.", img: "https://images.unsplash.com/photo-1444930694458-01babf71870c?q=80&w=2000&auto=format&fit=crop", notes: "Crushed leaf / Topical application" },
  { id: "SPEC-05", name: "Ampalaya", scientific: "Momordica charantia", use: "Auxiliary treatment for Type 2 Diabetes and blood sugar management.", img: "https://images.pexels.com/photos/12942531/pexels-photo-12942531.jpeg", notes: "Bitter Melon / Glucose control" },
  { id: "SPEC-06", name: "Bawang", scientific: "Allium sativum", use: "Reduces cholesterol levels and helps manage blood pressure.", img: "https://images.pexels.com/photos/6638901/pexels-photo-6638901.jpeg", notes: "Allicin compound / Cardiovascular" },
  { id: "SPEC-07", name: "Ulasimang Bato", scientific: "Peperomia pellucida", use: "Effective for treating gout and lowering uric acid levels.", img: albueroImg, notes: "Pansit-pansitan / Uric acid reduction" },
  { id: "SPEC-08", name: "Niyog-niyogan", scientific: "Quisqualis indica", use: "Traditional treatment for intestinal worms and parasites.", img: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=2000&auto=format&fit=crop", notes: "Seed consumption / Anthelmintic" },
];

// Shared easing curve — matches the StepsCarousel "power4.out" feel
const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

export default function PlantsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Entrance trigger ──────────────────────────────────────────
  // Watches the outermost panel; fires once when it scrolls into view
  const panelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(panelRef, { once: false, margin: '0px 0px -10% 0px' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const plant = premiumPlants[activeIndex];

  return (
    <div
      ref={panelRef}
      className="panel panel-plants relative w-full h-full bg-[#041c10] overflow-hidden text-white"
    >

      {/* 1. FULL SCREEN BACKGROUND IMAGES */}
      <div className="absolute inset-0 w-full h-full z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={plant.img}
              alt={plant.name}
              className="w-full h-full object-cover opacity-70"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#041c10] via-[#041c10]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#041c10]/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041c10] via-transparent to-[#041c10]/40" />
      </div>


      {/* 2. BOTTOM RIGHT — Name, Quote, Notes, Button */}
      <div className="absolute bottom-12 right-8 lg:bottom-20 lg:right-20 z-20 w-[90%] max-w-[420px] flex flex-col items-end text-right pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bottom-${activeIndex}`}
            /**
             * On FIRST entrance (isInView becomes true): slide up slowly from below,
             * just like the StepsCarousel heading reveal.
             * On subsequent plant changes: the usual fast cross-fade.
             */
            initial={{ opacity: 0, y: isInView ? 12 : 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={
              isInView && activeIndex === 0
                ? { duration: 0.7, ease: EASE_CINEMATIC, delay: 0.55 }
                : { duration: 0.25, ease: 'easeOut', delay: 0.05 }
            }
            className="flex flex-col items-end"
          >
            {/* Plant name */}
            <div style={{ overflow: 'hidden', marginBottom: '1rem' }}>
              <motion.h4
                initial={{ y: '110%' }}
                animate={isInView ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.6, ease: EASE_CINEMATIC, delay: 0.05 }}
                className="text-3xl lg:text-5xl font-['Bebas_Neue'] text-white leading-none tracking-wider"
              >
                {plant.name}
              </motion.h4>
            </div>

            {/* Quote */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE_CINEMATIC, delay: 0.1 }}
              className="text-sm lg:text-base text-white/80 leading-relaxed font-light mb-8 italic border-r-2 border-emerald-500 pr-4"
            >
              &ldquo;{plant.use}&rdquo;
            </motion.p>

            {/* Preparation */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: EASE_CINEMATIC, delay: 0.15 }}
              className="mb-8"
            >
              <p className="text-[9px] text-white/40 uppercase tracking-[0.3em] font-bold mb-1">Preparation</p>
              <p className="text-[11px] text-emerald-400 font-bold uppercase tracking-widest">
                {plant.notes}
              </p>
            </motion.div>

            {/* CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: EASE_CINEMATIC, delay: 0.2 }}
              className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white hover:text-emerald-400 transition-colors"
            >
              <span className="border-b border-transparent group-hover:border-emerald-400 pb-1 transition-colors">
                Extract Full Study
              </span>
              <span className="inline-flex items-center group-hover:translate-x-2 transition-all -translate-y-[2px]">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>


      {/* 3. LEFT SCROLLABLE LIST */}
      <div className="w-full lg:w-[50%] plants-scroll-track absolute left-0 top-0 z-10 pointer-events-none">
        <div className="px-6 lg:px-20 pt-[30vh] lg:pt-[40vh] pb-[40vh] lg:pb-[55vh] pointer-events-auto">
          <div className="max-w-[800px] relative">

            {/* ── SECTION HEADER with cinematic entrance ── */}
            <div className="mb-16 lg:mb-24">

              {/* Badge row — line + label */}
              <div className="flex items-center gap-4 mb-4" style={{ overflow: 'hidden' }}>
                <motion.span
                  initial={{ scaleX: 0, transformOrigin: 'left' }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.1, ease: EASE_CINEMATIC, delay: 0.1 }}
                  className="w-8 lg:w-12 h-[1px] bg-emerald-500 inline-block"
                />
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 1.0, ease: EASE_CINEMATIC, delay: 0.25 }}
                  className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.4em]"
                >
                  DOST Certified Archives
                </motion.span>
              </div>

              {/* "Scientific" — slide up from clip */}
              <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
                <motion.span
                  initial={{ y: '110%' }}
                  animate={isInView ? { y: '0%' } : { y: '110%' }}
                  transition={{ duration: 2.0, ease: EASE_CINEMATIC, delay: 0.2 }}
                  style={{ display: 'block' }}
                  className="text-6xl md:text-8xl lg:text-[10rem] font-['Bebas_Neue'] tracking-tight leading-[0.85] text-white drop-shadow-lg"
                >
                  Scientific
                </motion.span>
              </div>

              {/* "Specimens." — slide up slightly after "Scientific" */}
              <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
                <motion.span
                  initial={{ y: '110%' }}
                  animate={isInView ? { y: '0%' } : { y: '110%' }}
                  transition={{ duration: 2.0, ease: EASE_CINEMATIC, delay: 0.42 }}
                  style={{ display: 'block' }}
                  className="text-6xl md:text-8xl lg:text-[10rem] font-['Bebas_Neue'] tracking-tight leading-[0.85] text-white/40 drop-shadow-lg"
                >
                  Specimens.
                </motion.span>
              </div>

            </div>

            <div className="flex flex-col relative">
              {/* Timeline line */}
              <div className="plants-timeline-line absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-emerald-500/0 via-emerald-500 to-emerald-500/0 origin-top scale-y-0 hidden md:block" />

              {premiumPlants.map((plant, index) => (
                <div
                  key={index}
                  data-index={index}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className="group relative py-12 lg:py-16 cursor-pointer transition-all duration-500 md:pl-12"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="block font-mono text-[10px] text-emerald-400/60 mb-3 tracking-widest">
                        {plant.id}
                      </span>
                      <h3
                        className={`text-5xl md:text-7xl lg:text-8xl font-['Bebas_Neue'] uppercase tracking-tighter transition-all duration-500 ${
                          activeIndex === index
                            ? 'text-white translate-x-4'
                            : 'text-white/20 group-hover:text-white/50'
                        }`}
                      >
                        {plant.name}
                      </h3>
                      <p
                        className={`text-sm mt-3 transition-all duration-500 font-medium ${
                          activeIndex === index
                            ? 'text-emerald-400 opacity-100 translate-x-4'
                            : 'opacity-0 h-0 overflow-hidden translate-x-0'
                        }`}
                      >
                        Scientific: {plant.scientific}
                      </p>
                    </div>

                    <div
                      className={`text-[10px] font-mono font-bold transition-all duration-500 ${
                        activeIndex === index
                          ? 'text-emerald-400 opacity-100 scale-100'
                          : 'text-white/20 opacity-0 scale-90'
                      }`}
                    >
                      0{index + 1} / 08
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
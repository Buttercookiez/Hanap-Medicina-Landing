import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection({ plantProxy }: { plantProxy: React.MutableRefObject<any> }) {
  const sectionRef = useRef<HTMLElement>(null)
  
  const header1Ref = useRef<HTMLDivElement>(null)
  const header2Ref = useRef<HTMLDivElement>(null)
  const maskRef = useRef<HTMLDivElement>(null)
  
  const feat1Ref = useRef<HTMLDivElement>(null)
  const feat1LineRef = useRef<HTMLDivElement>(null)
  const feat1DotRef = useRef<HTMLDivElement>(null)
  const feat2Ref = useRef<HTMLDivElement>(null)
  const feat2LineRef = useRef<HTMLDivElement>(null)
  const feat2DotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.set(header1Ref.current, { xPercent: 0, opacity: 1 })
      gsap.set(maskRef.current, { clipPath: 'circle(0% at 50% 50%)' })
      gsap.set(header2Ref.current, { xPercent: 50, opacity: 0 })
      gsap.set(feat1Ref.current, { opacity: 0, x: -30 })
      gsap.set(feat1LineRef.current, { scaleX: 0 })
      gsap.set(feat1DotRef.current, { scale: 0 })
      gsap.set(feat2Ref.current, { opacity: 0, x: 30 })
      gsap.set(feat2LineRef.current, { scaleX: 0 })
      gsap.set(feat2DotRef.current, { scale: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2, 
        },
      })

      // Spin the plant natively during Hero scroll
      tl.to(plantProxy.current, { rotY: Math.PI * 6, duration: 10, ease: 'none' }, 0)

      tl.to(header1Ref.current, { xPercent: -100, opacity: 0, duration: 2 }, 0)
      tl.to(maskRef.current, { clipPath: 'circle(150% at 50% 50%)', duration: 3, ease: 'power2.inOut' }, 0.5) 
      tl.to(header2Ref.current, { xPercent: 0, opacity: 0.6, duration: 2.5, ease: 'power1.out' }, 0.5)
      tl.to(header2Ref.current, { xPercent: -100, opacity: 0, duration: 2, ease: 'power1.inOut' }, 4.0)

      tl.to(feat1Ref.current, { opacity: 1, x: 0, duration: 1 }, 6.5)
      tl.to(feat1LineRef.current, { scaleX: 1, duration: 1, ease: 'power3.out' }, 7.0)
      tl.to(feat1DotRef.current, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, 7.5)

      tl.to(feat2Ref.current, { opacity: 1, x: 0, duration: 1 }, 8.5)
      tl.to(feat2LineRef.current, { scaleX: 1, duration: 1, ease: 'power3.out' }, 9.0)
      tl.to(feat2DotRef.current, { scale: 1, duration: 0.5, ease: 'back.out(2)' }, 9.5)

      tl.to({}, { duration: 6 })

    }, section)

    return () => ctx.revert()
  },[])

  return (
    <>
      <style>{`
        .hero-section { position: relative; height: 800vh; background-color: #f4efe6; }
        .hero-sticky { position: sticky; top: 0; height: 100vh; width: 100vw; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .hero-marquee { position: absolute; white-space: nowrap; font-family: 'Bebas Neue', sans-serif; line-height: 0.8; pointer-events: none; user-select: none; will-change: transform, opacity; transform: translateZ(0); backface-visibility: hidden; }
        .header-1 { color: rgba(0,0,0,0.08); font-size: clamp(5rem, 16vw, 17rem); z-index: 1; }
        .circular-mask { position: absolute; inset: 0; background-color: #041c10; z-index: 2; clip-path: circle(0% at 50% 50%); display: flex; align-items: center; justify-content: center; will-change: clip-path; transform: translateZ(0); }
        .header-2 { color: white; font-size: clamp(5rem, 16vw, 17rem); font-weight: 500; letter-spacing: 0.02em; }
        .hero-tooltips { position: absolute; inset: 0; z-index: 10; pointer-events: none; max-width: 1400px; margin: 0 auto; width: 100%; }
        .tooltip { position: absolute; max-width: 280px; color: white; }
        .tooltip-left { top: 45%; left: 5%; transform: translateY(-50%); }
        .tooltip-right { top: 55%; right: 5%; text-align: right; }
        .tt-line-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
        .tooltip-right .tt-line-wrap { justify-content: flex-end; }
        .tt-line-container { width: 140px; height: 1px; position: relative; flex-shrink: 0; }
        .tt-line { position: absolute; inset: 0; background: #22c55e; }
        .tt-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 10px #22c55e; flex-shrink: 0; }
        .tooltip-left .tt-line { transform-origin: left center; }
        .tooltip-right .tt-line { transform-origin: right center; }
        .tt-tag { font-family: 'Outfit', sans-serif; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #22c55e; font-weight: 600; }
        .tt-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; line-height: 1; margin-bottom: 12px; letter-spacing: 0.05em; }
        .tt-desc { font-family: 'Outfit', sans-serif; font-size: 0.95rem; color: rgba(255,255,255,0.6); line-height: 1.6; }
        @media(max-width: 768px) {
          .tooltip { position: relative; left: auto !important; right: auto !important; top: auto !important; transform: none; margin: 0 auto; text-align: center; }
          .hero-tooltips { display: flex; flex-direction: column; justify-content: space-between; padding: 15vh 20px; height: 100vh; }
          .tt-line-wrap { justify-content: center !important; }
          .tt-line-container { width: 60px; } 
        }
      `}</style>

      <section ref={sectionRef} className="hero-section">
        <div className="hero-sticky">
          <div ref={header1Ref} className="hero-marquee header-1">EVERY LEAF STARTS</div>
          <div ref={maskRef} className="circular-mask">
            <div ref={header2Ref} className="hero-marquee header-2">POWERED BY AI</div>
          </div>

          <div className="hero-tooltips">
            <div ref={feat1Ref} className="tooltip tooltip-left">
              <div className="tt-line-wrap">
                <span className="tt-tag">Identification</span>
                <div className="tt-line-container"><div ref={feat1LineRef} className="tt-line" /></div>
                <div ref={feat1DotRef} className="tt-dot" />
              </div>
              <div className="tt-title">Instant AI Scan</div>
              <div className="tt-desc">Point your camera at any Filipino medicinal herb and get AI-powered identification in seconds.</div>
            </div>

            <div ref={feat2Ref} className="tooltip tooltip-right">
              <div className="tt-line-wrap">
                <div ref={feat2DotRef} className="tt-dot" />
                <div className="tt-line-container"><div ref={feat2LineRef} className="tt-line" /></div>
                <span className="tt-tag">Health</span>
              </div>
              <div className="tt-title">Medicinal Benefits Guide</div>
              <div className="tt-desc">Discover the healing properties, traditional uses, and natural remedies of Filipino medicinal plants.</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
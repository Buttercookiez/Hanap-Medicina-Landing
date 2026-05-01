import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger so we can track the scrolling
gsap.registerPlugin(ScrollTrigger);

// Beautiful online placeholder image from Unsplash
const HERO_BG_IMAGE = "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop";

export default function ScrollVideo({ isLoaded }: { isLoaded?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    // 1. Text Entrance Animation connected to ScrollTrigger
    // Using fromTo ensures the text always resets to 120% before animating
    const textAnim = gsap.fromTo(
      [text1Ref.current, text2Ref.current],
      { y: "120%" },
      {
        y: "0%",
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2, // Tiny delay for a cinematic feel
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Starts when section enters viewport
          end: "bottom top",   // Ends when section completely leaves viewport
          // toggleActions: onEnter, onLeave, onEnterBack, onLeaveBack
          toggleActions: "play reset restart none",
          // 'play': Animate normally on first load
          // 'reset': Instantly hide it back down to 120% when you scroll past it
          // 'restart': Play the animation again when you scroll back UP!
        }
      }
    );

    // 2. Mouse Parallax Effect (Ironhill style)
    const xTo = gsap.quickTo(imgRef.current, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(imgRef.current, "y", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX / innerWidth - 0.5) * 40; 
      const yOffset = (e.clientY / innerHeight - 0.5) * 40;
      
      xTo(-xOffset);
      yTo(-yOffset); 
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Cleanup listeners and ScrollTrigger instance when component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      textAnim.scrollTrigger?.kill();
      textAnim.kill();
    };
  }, [isLoaded]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#010f07] flex items-center justify-center"
      data-header-theme="dark" // Tells the header to use light text here
    >
      {/* Parallax Image Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vh] pointer-events-none scale-105">
        <img 
          ref={imgRef}
          src={HERO_BG_IMAGE} 
          alt="Forest Background" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Dark gradient overlay so text is easier to read */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#010f07]/40 via-transparent to-[#f4efe6]" />
      </div>

      {/* Huge Typography with padded overflow bounds so Bebas Neue letters don't clip! */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center mt-12">
        <h1 className="text-[12vw] md:text-[9vw] font-['Bebas_Neue'] text-[#F9F9F7] leading-[0.9] tracking-tighter overflow-hidden px-4 pb-2">
          <span ref={text1Ref} className="block translate-y-[120%]">HANAP</span>
        </h1>
        <h1 className="text-[12vw] md:text-[9vw] font-['Bebas_Neue'] text-emerald-500 leading-[0.9] tracking-tighter overflow-hidden px-4 pb-2">
          <span ref={text2Ref} className="block translate-y-[120%]">MEDICINA</span>
        </h1>
      </div>

      {/* Small floating text indicator at the bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[#052e16] font-['Outfit'] font-bold text-[10px] tracking-[0.3em] uppercase">
        Scroll to Explore
      </div>
    </section>
  );
}
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const faqs = [
  {
    num: "01",
    question: "Scientific Recognition",
    answer: "Our featured specimens are part of the 10 medicinal plants clinically validated by the DOH and DOST for their therapeutic efficacy and safety profiles."
  },
  {
    num: "02",
    question: "Complementary Use",
    answer: "These plants are categorized as complementary treatments. We advise synchronization with professional medical guidance before altering any pharmacological regimen."
  },
  {
    num: "03",
    question: "Standardized Preparation",
    answer: "Methods vary from aqueous decoctions to mechanical extraction. Precision in preparation is critical for maintaining the bioavailability of active phytochemicals."
  },
  {
    num: "04",
    question: "Data Integrity",
    answer: "All protocols are sourced from the Philippine National Formulary and peer-reviewed ethnobotanical studies to ensure clinical accuracy."
  },
  {
    num: "05",
    question: "Specimen Sourcing",
    answer: "We provide geographical data for sustainable harvesting, emphasizing the conservation of local biodiversity while promoting traditional healing."
  }
];

const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;

export default function FaqSection() {
  const panelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(panelRef, { once: false, margin: '0px 0px -10% 0px' });

  return (
    <div ref={panelRef} className="panel panel-faq relative w-full h-full bg-[#F9F9F7] text-[#052e16] flex flex-col lg:flex-row overflow-hidden">
      
      {/* LEFT: Sticky Title Area */}
      <div className="w-full lg:w-[40%] p-12 lg:p-24 flex flex-col justify-between border-r border-black/5">
        <div>
          {/* Badge row */}
          <div className="flex items-center gap-4 mb-8" style={{ overflow: 'hidden' }}>
            <motion.span
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.1, ease: EASE_CINEMATIC, delay: 0.1 }}
              className="w-8 h-[1px] bg-emerald-600 inline-block"
            />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: 1.0, ease: EASE_CINEMATIC, delay: 0.25 }}
              className="text-emerald-600 text-[10px] font-bold uppercase tracking-[0.5em]"
            >
              Information Center
            </motion.span>
          </div>

          {/* "COMMON" — slide up */}
          <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
            <motion.span
              initial={{ y: '110%' }}
              animate={isInView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 2.0, ease: EASE_CINEMATIC, delay: 0.2 }}
              style={{ display: 'block' }}
              className="text-7xl lg:text-9xl font-['Bebas_Neue'] leading-[0.8] tracking-tighter text-[#052e16]"
            >
              COMMON
            </motion.span>
          </div>

          {/* "INQUIRIES." — slide up slightly after */}
          <div style={{ overflow: 'hidden', paddingBottom: '4px' }}>
            <motion.span
              initial={{ y: '110%' }}
              animate={isInView ? { y: '0%' } : { y: '110%' }}
              transition={{ duration: 2.0, ease: EASE_CINEMATIC, delay: 0.42 }}
              style={{ display: 'block' }}
              className="text-7xl lg:text-9xl font-['Bebas_Neue'] leading-[0.8] tracking-tighter text-black/5"
            >
              INQUIRIES.
            </motion.span>
          </div>
        </div>
        
        <div className="hidden lg:block">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 1.2, ease: EASE_CINEMATIC, delay: 0.65 }}
            className="text-[10px] text-black/40 uppercase tracking-[0.3em] leading-relaxed max-w-[200px]"
          >
            Technical inquiries regarding botanical extractions and pharmacological data.
          </motion.p>
        </div>
      </div>

      {/* RIGHT: Scrollable FAQ Track */}
      <div className="w-full lg:w-[60%] h-full overflow-hidden relative">
        <div className="faq-scroll-track px-12 lg:px-24 py-[20vh] lg:py-[40vh]">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="group py-16 lg:py-24 border-b border-black/10 flex flex-col gap-8 transition-all duration-700"
            >
              <div className="flex items-start justify-between">
                {/* Large Serif Numbers */}
                <span className="font-['DM_Serif_Display'] italic text-4xl lg:text-6xl text-emerald-600/20 group-hover:text-emerald-600 transition-colors duration-500">
                  {faq.num}
                </span>
                
                <div className="w-full max-w-[500px]">
                  <h3 className="text-3xl lg:text-5xl font-['Bebas_Neue'] uppercase tracking-tight mb-6 text-[#052e16] group-hover:text-emerald-700 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-sm lg:text-lg text-black/50 group-hover:text-black/80 leading-relaxed font-light transition-colors duration-500">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Visual Padding for scroll end */}
          <div className="h-[20vh]" />
        </div>
      </div>

    </div>
  );
}
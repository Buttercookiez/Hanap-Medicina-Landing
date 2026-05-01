const lightFeatures =[
  {
    icon: (
      <svg className="w-7 h-7 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8V6a2 2 0 012-2h2M19 8V6a2 2 0 00-2-2h-2M3 16v2a2 2 0 002 2h2M19 16v2a2 2 0 01-2 2h-2M9 12h6" />
      </svg>
    ),
    title: "Instant Scan",
    sub: "lat.// ai vision model",
    tag: "identify",
    desc: "Point your camera at any herbal plant and get an AI-powered identification in seconds.",
    target: "botanical match",
    statLabel: "accuracy",
    statValue: ">95%"
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Remedy Guide",
    sub: "lat.// herbal database",
    tag: "prepare",
    desc: "Filter by symptom to find safe herbal preparations, correct dosages, and usage tips.",
    target: "symptom relief",
    statLabel: "safety check",
    statValue: "verified"
  },
  {
    icon: (
      <svg className="w-7 h-7 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    title: "Scan History",
    sub: "lat.// local storage",
    tag: "save",
    desc: "Every plant you've scanned is saved. Revisit, compare, and build your own herb library.",
    target: "personal archive",
    statLabel: "capacity",
    statValue: "unlimited"
  }
];

export default function FeaturesSection() {
  return (
    <div className="panel bg-[#ffffff] text-[#011a0e] w-full h-full relative overflow-hidden">
      <div className="w-full max-w-[1300px] mx-auto flex h-full items-center relative z-10">
        
        {/* Left Side */}
        <div className="w-full md:w-[45%] flex flex-col justify-center relative h-full py-20 px-6 md:px-0">
          
          {/* Main Title - Updated to match Bebas Neue style */}
          <div className="mb-10 p-anim opacity-0 translate-y-4 transition-all duration-700">
            <h2 className="text-6xl md:text-[6rem] font-['Bebas_Neue'] tracking-tighter leading-[0.85] text-[#011a0e] uppercase">
              HANAP FEATURES
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-[#011a0e]/10 w-full">
            {lightFeatures.map((feature, idx) => (
              <div
                key={idx}
                className={`feat-card-${idx} flex gap-6 md:gap-8 py-8 md:py-10 will-change-transform opacity-0 translate-y-8 transition-all duration-700`}
                style={{ transitionDelay: `${idx * 100}ms` }} 
              >
                {/* Numbering */}
                <span className="text-lg md:text-3xl font-['Bebas_Neue'] text-[#011a0e]/30 leading-none pt-1 min-w-[2.5rem] shrink-0">
                  0{idx + 1}
                </span>

                <div className="flex flex-col gap-2">
                  {/* Title - Updated to Bebas Neue */}
                  <h3 className="text-3xl md:text-5xl font-['Bebas_Neue'] uppercase text-[#011a0e] leading-[0.9] tracking-wide">
                    {feature.title}
                  </h3>
                  
                  {/* Description - Standardized casing and Outfit font */}
                  <p className="text-base md:text-lg text-[#011a0e]/60 leading-relaxed font-['Outfit'] font-normal">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Empty space for 3D Plant */}
        <div className="hidden md:block w-[55%] relative h-full pointer-events-none" />
      </div>
    </div>
  );
}
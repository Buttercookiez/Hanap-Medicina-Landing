import React from 'react';

const features = [
  { side: 'left', title: 'System Discovery', desc: 'Identify local medicinal flora instantly.' },
  { side: 'right', title: 'SMART SEARCH', desc: 'QUICKLY FIND SPECIMENS BY NAME, TYPE, OR ATTRIBUTES..' },
  { side: 'left', title: 'PERSONAL LIBRARY', desc: 'SAVE AND ORGANIZE YOUR FAVORITE DISCOVERIES FOR QUICK ACCESS.' },
  { side: 'right', title: 'Archival Access', desc: 'Full database available without signal.' },
];

export default function DownloadSection() {
  return (
    <div className="panel panel-download relative w-full h-full flex items-center justify-center overflow-hidden bg-[#F9F9F7]">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex items-center justify-center">
        
        {/* CANVAS FOR SMOOTH FRAMES */}
        <div id="dl-phone-wrapper" className="relative w-[320px] md:w-[450px] aspect-[9/19.5]">
          <canvas
            id="download-canvas-frame"
            width="1080"  
            height="1920"
            className="w-full h-full object-contain"
          />
        </div>

        {/* SIDE TEXT REVEALS */}
        <div className="absolute inset-0 pointer-events-none">
          {features.map((item, i) => (
            <div
              key={i}
              className={`dl-step absolute opacity-0 max-w-[200px] md:max-w-[280px] ${
                item.side === 'left' ? 'left-[5%] md:left-[10%] text-left' : 'right-[5%] md:right-[10%] text-right'
              }`}
              style={{ top: `${25 + i * 15}%` }}
            >
              <span className="text-emerald-600 font-mono text-[10px] mb-2 block tracking-widest font-bold">0{i + 1}</span>
              <h4 className="text-[#052e16] font-['Bebas_Neue'] text-3xl md:text-5xl leading-none mb-2 tracking-tighter">{item.title}</h4>
              <p className="text-black/40 text-[10px] md:text-xs uppercase tracking-widest font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CALL TO ACTION */}
      {/* Added z-50 to ensure it is always clickable and above the canvas image */}
      <div id="dl-footer-links" className="absolute bottom-12 z-50 opacity-0 flex gap-10">
          <button className="text-[11px] font-bold text-[#052e16] border-b-2 border-emerald-600 pb-1 tracking-widest transition-all duration-300 hover:text-emerald-600 hover:border-[#052e16] hover:-translate-y-1 cursor-pointer">
            APP STORE ↗
          </button>
          <button className="text-[11px] font-bold text-[#052e16] border-b-2 border-emerald-600 pb-1 tracking-widest transition-all duration-300 hover:text-emerald-600 hover:border-[#052e16] hover:-translate-y-1 cursor-pointer">
            PLAY STORE ↗
          </button>
      </div>
    </div>
  );
}
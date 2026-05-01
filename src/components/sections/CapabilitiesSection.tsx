import React from 'react';

const capabilities = [
  { num: "01", tag: "Knowledge Base", title: "Reliable Info.", desc: "Reliable and accessible information about medicinal plants to address the lack of guidance.", color: "#022c22", text: "#fff" }, 
  { num: "02", tag: "AI Vision", title: "Accurate ID.", desc: "Improve identification accuracy by helping users recognize plants based on physical traits.", color: "#064e3b", text: "#fff" }, 
  { num: "03", tag: "Symptoms", title: "Right Remedy.", desc: "Assist users in selecting appropriate medicinal plants for specific conditions to avoid ineffective remedies.", color: "#065f46", text: "#fff" }, 
  { num: "04", tag: "Precautions", title: "Safe Prep.", desc: "Promote safe use and proper preparation to reduce the risk of incorrect application.", color: "#059669", text: "#fff" }, 
  { num: "05", tag: "Connectivity", title: "Offline Access.", desc: "Access plant data without internet connection, information is stored locally and synced later.", color: "#10b981", text: "#011a0e" }, 
  { num: "06", tag: "Heritage", title: "Preserve Culture.", desc: "Bridge traditional herbal knowledge with modern technology, preserving culturally important practices.", color: "#6ee7b7", text: "#011a0e" }, 
];

export default function CapabilitiesSection() {
  return (
    <div className="panel panel-capabilities w-full h-full relative overflow-hidden" style={{ background: '#010f07', padding: 0 }}>
       
       <div className="w-full h-full flex justify-center items-center relative">
           
           {/* Wrapper with fixed height to contain the cards */}
           <div className="w-full max-w-[1400px] h-[85vh] relative pt-20">
               
               {/* CAPABILITIES HEADER */}
               <h2 className="absolute top-0 left-10 md:left-0 text-white text-3xl md:text-5xl font-['Bebas_Neue'] tracking-[0.2em] uppercase opacity-40 p-anim">
                   Benefits
               </h2>

               {/* THE STACKING CARDS */}
               {capabilities.map((c, i) => (
                   <div
                     key={i}
                     // REMOVED h-screen. Added fixed height for a "not full screen" look.
                     className={`cap-card-anim-${i} absolute left-0 right-0 mx-auto w-[94%] md:w-full h-[500px] md:h-[600px] flex flex-col justify-start pt-20 md:pt-32 px-8 md:px-20 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.02)] border-t border-white/5`}
                     style={{
                       backgroundColor: c.color,
                       color: c.text,
                       zIndex: i + 10,
                       top: `${i * 45 + 80}px`, 
                       borderRadius: '40px'
                     }}
                   >
                       {/* MAIN CONTENT */}
                       <div className="relative z-20">
                           <div className="flex flex-col gap-2 mb-6">
                               <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] opacity-40">
                                   {c.num} // {c.tag}
                               </span>
                               
                               <h3 className="text-[12vw] md:text-[8vw] font-['Bebas_Neue'] leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
                                   {c.title}
                               </h3>
                           </div>

                           <div className="max-w-xl">
                               <p className="text-lg md:text-2xl font-light opacity-70 leading-relaxed">
                                   {c.desc}
                               </p>
                           </div>
                       </div>

                       {/* DECORATIVE NUMBER - Reverted to Bottom-Right */}
                       <span className="absolute bottom-6 right-8 text-[20vw] font-bold opacity-[0.03] leading-none pointer-events-none select-none">
                         {c.num}
                       </span>
                   </div>
               ))}
           </div>
       </div>
    </div>
  );
}
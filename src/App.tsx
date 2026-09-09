import React, { useState } from 'react';
import { SpecimenCanvas } from './components/SpecimenCanvas';
import { traits } from './data';
import { Zap, RotateCcw, ChevronDown, Play, Pause, Hand, Linkedin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTrait, setActiveTrait] = useState(traits.estrategia);
  const [firmness, setFirmness] = useState(0.4);
  const [energy, setEnergy] = useState(2);
  const [isNudged, setIsNudged] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showWireframe, setShowWireframe] = useState(false);
  const [halfSpeed, setHalfSpeed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleNudge = () => {
    setIsNudged(true);
    setTimeout(() => setIsNudged(false), 300);
  };

  const handleReset = () => {
    setFirmness(0.4);
    setEnergy(2);
    setHalfSpeed(false);
    setShowWireframe(false);
    setIsPlaying(true);
  };

  const activeColor = activeTrait.color;
  const currentSpeed = (isPlaying ? energy : 0) * (halfSpeed ? 0.5 : 1);
  const currentAutoRotateSpeed = isPlaying ? (halfSpeed ? 0.5 : 1) : 0;

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-[#f4f4f2] text-neutral-800 font-sans overflow-hidden relative selection:bg-neutral-800 selection:text-white">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
         <SpecimenCanvas 
            traitColor={activeColor} 
            firmness={firmness} 
            energy={currentSpeed} 
            isNudged={isNudged}
            autoRotateSpeed={currentAutoRotateSpeed}
            showWireframe={showWireframe}
         />
      </div>

      {/* Top Header */}
      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10 pointer-events-none opacity-80">
        <div className="text-[10px] sm:text-xs font-bold tracking-widest uppercase">
          Curriculum Vitae / Interativo
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          WebGL · Live
        </div>
      </header>

      {/* Left Content - Unified Flex Container */}
      <div className="absolute top-24 bottom-6 md:bottom-10 left-6 md:left-16 right-6 md:right-auto md:w-[500px] z-10 pointer-events-none flex flex-col justify-between overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden pb-8 md:pb-4">
        
        {/* Top Section */}
        <div className="drop-shadow-sm shrink-0">
          <h1 className="font-serif text-[4.5rem] md:text-[7rem] leading-[0.85] tracking-tight text-neutral-900 mb-6 drop-shadow-md">
            Lucas<br/>
            <span className="italic text-neutral-800">Nunes.</span>
          </h1>
          <p className="text-sm md:text-base text-neutral-700 max-w-sm leading-relaxed font-medium mix-blend-multiply drop-shadow-sm">
            Marketing, CX e Digital Content são as minhas áreas core. Combino uma visão criativa e analítica com valores como a adaptabilidade e a versatilidade.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 pointer-events-auto">
            <a href="mailto:lucasnunesatwork@gmail.com" className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-neutral-700 transition-colors shadow-lg">
              <Mail size={14} className="shrink-0" /> <span className="truncate">lucasnunesatwork@gmail.com</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white/50 backdrop-blur-md border border-neutral-300 text-neutral-900 px-4 py-2 rounded-full text-xs font-bold hover:bg-white transition-colors shadow-sm">
              <Linkedin size={14} className="shrink-0" /> LinkedIn
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-5 md:gap-8 drop-shadow-sm mt-8 shrink-0">
          <div className="flex items-center gap-3 text-neutral-700 bg-white/50 backdrop-blur-sm p-2 pr-4 rounded-full border border-white/60 shadow-sm w-fit pointer-events-auto cursor-help">
            <div className="bg-white p-2 rounded-full shadow-sm shrink-0">
              <Hand size={18} className="text-neutral-800" />
            </div>
            <p className="text-[11px] font-medium leading-tight mix-blend-multiply">
              Toque. Arraste. Solte.<br/>
              Sinta a textura. Observe a inércia.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 md:gap-8 pb-4 mix-blend-multiply">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl md:text-2xl font-semibold font-serif text-neutral-900">3</span>
                <span className="text-[10px] font-sans font-medium text-neutral-600">GRAUS</span>
              </div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-neutral-500 mt-1">Formação Académica</div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl md:text-2xl font-semibold font-serif text-neutral-900">4</span>
                <span className="text-[10px] font-sans font-medium text-neutral-600">PROJETOS</span>
              </div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-neutral-500 mt-1">De Experiência</div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl md:text-2xl font-semibold font-serif text-neutral-900">+1.3k</span>
                <span className="text-[10px] font-sans font-medium text-neutral-600">HRS</span>
              </div>
              <div className="text-[9px] font-bold tracking-widest uppercase text-neutral-500 mt-1">Prática de Estágio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Control Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[420px] p-4 md:p-8 flex items-center justify-center pointer-events-none z-20">
        <div className="bg-[#f9f9f9]/90 backdrop-blur-2xl w-full max-h-full overflow-y-auto rounded-3xl p-6 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] border border-white pointer-events-auto flex flex-col">
          
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-bold tracking-widest uppercase text-neutral-900">Lucas Nunes</h2>
            <div className="text-[10px] font-mono text-neutral-500 font-medium tracking-tight px-2 py-1 bg-neutral-200/50 rounded-md">Curriculum Vitae</div>
          </div>

          {/* Trait Selection */}
          <div className="flex gap-1.5 mb-8 bg-white p-1 rounded-2xl shadow-sm border border-neutral-100">
            {Object.values(traits).map((trait) => (
              <button
                key={trait.id}
                onClick={() => { setActiveTrait(trait); setShowDetails(true); }}
                className={`flex-1 py-2.5 px-2 rounded-[12px] text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  activeTrait.id === trait.id 
                    ? 'bg-neutral-50 shadow-sm border border-neutral-200 text-neutral-900' 
                    : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50/50 border border-transparent'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full shadow-inner flex-shrink-0" style={{ backgroundColor: trait.color }}></span>
                <span className="truncate">{trait.name}</span>
              </button>
            ))}
          </div>

          {/* Sliders */}
          <div className="space-y-7 mb-8">
            <div>
              <div className="flex justify-between text-sm font-semibold mb-3">
                <span className="text-neutral-900">Flexibilidade & Adaptação</span>
                <span className="text-neutral-600 font-mono text-xs">{(firmness).toFixed(1)} kPa</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={firmness}
                onChange={(e) => setFirmness(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-[#2d3748]"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-2 font-medium uppercase tracking-wider">
                <span>Ágil (Macia)</span>
                <span>Sólida (Firme)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm font-semibold mb-3">
                <span className="text-neutral-900">Energia & Proatividade</span>
                <span className="text-neutral-600 font-mono text-xs">{(energy * 4).toFixed(1)} s⁻¹</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.1"
                value={energy}
                onChange={(e) => setEnergy(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-[#2d3748]"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-2 font-medium uppercase tracking-wider">
                <span>Dinâmica</span>
                <span>Focada</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-8">
            <button 
              onClick={handleNudge}
              className="flex-1 bg-[#252f3f] hover:bg-neutral-900 text-white py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-neutral-800/20"
            >
              <Zap size={16} className="fill-current text-neutral-300" />
              Testar Impacto
            </button>
            <button 
              onClick={handleReset}
              className="bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-600 py-3.5 px-5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-sm"
            >
              Reset <RotateCcw size={16} />
            </button>
          </div>

          {/* Secondary Action */}
          <div className="border border-neutral-200 rounded-xl p-1 mb-8 bg-white shadow-sm transition-all">
             <div className="flex justify-between">
                <button 
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-neutral-800 hover:text-neutral-900 transition-colors w-full"
                >
                  <ChevronDown size={16} className={`text-neutral-500 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                  Ver Skills & Experiência
                </button>
             </div>
             <AnimatePresence>
               {showDetails && (
                 <motion.div 
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   className="overflow-hidden"
                 >
                   <div className="p-4 pt-2 pb-3 text-sm text-neutral-600 border-t border-neutral-100 mt-1">
                     <p className="font-medium text-neutral-800 mb-4 text-xs leading-relaxed">{activeTrait.description}</p>
                     <div className="space-y-4">
                       {activeTrait.details.map((detail, idx) => (
                         <div key={idx} className="flex gap-3 items-start">
                           <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 shadow-sm" style={{ backgroundColor: activeTrait.color }}></div>
                           <div>
                             <div className="font-bold text-xs text-neutral-900">{detail.title}</div>
                             <div className="text-[11px] font-medium text-neutral-500 mt-0.5">{detail.subtitle}</div>
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* View Controls */}
          <div className="mt-auto space-y-5">
             <div className="flex gap-2 items-center justify-between">
                <div className="text-sm font-medium text-neutral-700">Explorar Modelo</div>
                <div className="flex items-center gap-2">
                   <div className="flex items-center bg-white border border-neutral-200 rounded-full px-3 py-1.5 shadow-sm">
                      <span className="text-[10px] font-bold uppercase text-neutral-700 mx-1">Zoom</span>
                      <span className="text-[10px] font-medium text-neutral-400 ml-1">(Scroll)</span>
                   </div>
                </div>
             </div>
             
             <div className="flex items-center justify-between text-xs font-medium text-neutral-500 bg-white p-1 rounded-lg border border-neutral-100 shadow-sm">
               <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-800 px-2 py-1">
                 <input type="checkbox" checked={halfSpeed} onChange={(e) => setHalfSpeed(e.target.checked)} className="rounded border-neutral-300 text-neutral-800 focus:ring-neutral-800" />
                 ½ Vel
               </label>
               <label className="flex items-center gap-2 cursor-pointer hover:text-neutral-800 px-2 py-1 border-l border-neutral-100">
                 <input type="checkbox" checked={showWireframe} onChange={(e) => setShowWireframe(e.target.checked)} className="rounded border-neutral-300 text-neutral-800 focus:ring-neutral-800" />
                 Wireframe
               </label>
               <button 
                 onClick={() => setIsPlaying(!isPlaying)}
                 className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors text-neutral-700 font-bold ml-auto"
               >
                 {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                 {isPlaying ? 'Pause' : 'Play'}
               </button>
             </div>
          </div>
          
          <div className="mt-6 text-[9px] text-neutral-400 flex items-center justify-center gap-2 border-t border-neutral-100 pt-4 font-medium uppercase tracking-widest">
            <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
            Portefólio 3D Interativo
          </div>

        </div>
      </div>
    </div>
  );
}

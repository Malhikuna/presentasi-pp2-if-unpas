import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ModuleSelector({ modules, onSelectModule }) {
  const cardThemes = [
    {
      bg: 'bg-[#F2C94C]',
      shadow: 'shadow-[6px_6px_0px_#C99E26]',
      hoverShadow: 'hover:shadow-[8px_8px_0px_#C99E26]',
      text: 'text-zinc-950',
      subText: 'text-zinc-900/80',
      pill: 'bg-zinc-950/10 text-zinc-950',
    },
    {
      bg: 'bg-[#4B5BF4]',
      shadow: 'shadow-[6px_6px_0px_#2D39B8]',
      hoverShadow: 'hover:shadow-[8px_8px_0px_#2D39B8]',
      text: 'text-white',
      subText: 'text-indigo-100',
      pill: 'bg-white/15 text-white',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-8 lg:px-20 max-w-5xl mx-auto">
      <div className="w-full space-y-12 text-center">
        {/* Clean Floating Keynote Header */}
        <div className="space-y-3">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            IF21W0508 &bull; Praktikum Pemrograman II
          </p>
          <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-tight">
            Presentasi Java Swing
          </h1>
          <p className="text-base text-zinc-500 max-w-lg mx-auto">
            Pilih pertemuan untuk memulai presentasi interaktif.
          </p>
        </div>

        {/* Mosh-Style Paired Tactile Blocks with Labels Above */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {modules.map((mod, idx) => {
            const theme = cardThemes[idx % cardThemes.length];
            return (
              <div key={mod.id} className="flex flex-col items-center space-y-3.5">
                {/* Bold Label Above Block */}
                <div className="text-center">
                  <span className="text-xl lg:text-2xl font-black text-zinc-900 tracking-tight">
                    {mod.pertemuan}
                  </span>
                  <span className="ml-2 font-mono text-xs font-bold text-zinc-400">
                    {mod.code}
                  </span>
                </div>

                {/* Tactile Solid 3D Block */}
                <motion.button
                  onClick={() => onSelectModule(mod.id)}
                  whileHover={{ y: -4, x: -2 }}
                  whileTap={{ y: 2, x: 2 }}
                  transition={{ duration: 0.14 }}
                  className={`group w-full min-h-[210px] rounded-2xl p-7 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer transition-shadow ${theme.bg} ${theme.shadow} ${theme.hoverShadow}`}
                >
                  <h2 className={`text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug ${theme.text}`}>
                    {mod.title}
                  </h2>

                  <div className="flex flex-wrap justify-center gap-1.5">
                    {mod.highlights.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold ${theme.pill}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`pt-2 inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider ${theme.subText}`}
                  >
                    <span>{mod.slidesList.length} Slide</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.button>
              </div>
            );
          })}
        </div>

        {/* Minimalist Footer */}
        <div className="pt-2 text-xs font-mono text-zinc-400">
          Wanda Gusdya Purnama, ST., MT. &bull; Teknik Informatika Universitas Pasundan
        </div>
      </div>
    </div>
  );
}

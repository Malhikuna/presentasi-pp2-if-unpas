import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import lofiAudio from '../../assets/lofi-study.mp3';

/* =========================================================
   MODUL 10 — SLIDE 12: KERJAKAN TUGAS (CIRCULAR LO-FI PLAYER + DINO)
   ========================================================= */
export function Mod10TaskMusicSlide() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          setTrackWidth(entry.contentRect.width);
        }
      }
    });
    if (trackRef.current) {
      observer.observe(trackRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = new Audio(lofiAudio);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const maxDistance = Math.max(300, (trackWidth || 920) - 130);

  return (
    <div className="w-full h-full flex flex-col justify-between px-8 lg:px-16 max-w-5xl mx-auto py-8">
      {/* Top Header & Intro */}
      <div className="text-center pt-4">
        <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight">
          Kerjakan Tugas
        </h2>

        <p className="text-sm md:text-base text-zinc-600 mt-2.5 max-w-xl mx-auto leading-relaxed">
          Buka IDE Anda (NetBeans / IntelliJ / VS Code) dan selesaikan latihan
          dan tugas pertemuan 3. Dengarkan alunan musik lo-fi agar suasana
          belajar lebih rileks.
        </p>
      </div>

      {/* Middle: Minimalist Circular Music Player (No Text, Play/Pause + Animation Only) */}
      <div className="my-auto flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center w-56 h-56">
          {/* Concentric Expanding Pulse Rings when Playing */}
          {[0, 0.8, 1.6].map((delay, idx) => (
            <motion.span
              key={idx}
              className="absolute rounded-full border-2 border-emerald-500/40 pointer-events-none"
              style={{ width: 120, height: 120 }}
              animate={
                isPlaying
                  ? {
                      scale: [1, 1.85],
                      opacity: [0.65, 0],
                    }
                  : { scale: 1, opacity: 0 }
              }
              transition={
                isPlaying
                  ? {
                      duration: 2.4,
                      repeat: Infinity,
                      delay,
                      ease: 'easeOut',
                    }
                  : { duration: 0.3 }
              }
            />
          ))}

          {/* Rotating Dashed Orbit Ring */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={
              isPlaying
                ? { duration: 10, repeat: Infinity, ease: 'linear' }
                : { duration: 0.4 }
            }
            className={`absolute w-36 h-36 rounded-full border-2 border-dashed pointer-events-none transition-colors duration-300 ${
              isPlaying ? 'border-emerald-500/60' : 'border-zinc-300'
            }`}
          />

          {/* Rotating Mini Equalizer Halo Dots */}
          <motion.div
            animate={{ rotate: isPlaying ? -360 : 0 }}
            transition={
              isPlaying
                ? { duration: 16, repeat: Infinity, ease: 'linear' }
                : { duration: 0.4 }
            }
            className="absolute w-44 h-44 pointer-events-none"
          >
            <span
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                isPlaying ? 'bg-emerald-500 shadow-sm shadow-emerald-400' : 'bg-zinc-300'
              }`}
            />
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-colors duration-300 ${
                isPlaying ? 'bg-emerald-400/80' : 'bg-zinc-200'
              }`}
            />
          </motion.div>

          {/* Main Circular Vinyl Play/Pause Button */}
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            className="group relative z-10 w-28 h-28 rounded-full bg-zinc-950 border-2 border-zinc-800 shadow-2xl flex items-center justify-center cursor-pointer"
          >
            {/* Spinning Vinyl Groove Ring */}
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={
                isPlaying
                  ? { duration: 4, repeat: Infinity, ease: 'linear' }
                  : { duration: 0.3 }
              }
              className="absolute inset-2 rounded-full border border-zinc-700/80 border-t-emerald-500/70 pointer-events-none"
            />

            {/* Center Emerald Circular Control */}
            <div className="w-16 h-16 rounded-full bg-emerald-500 group-hover:bg-emerald-400 text-zinc-950 flex items-center justify-center shadow-lg transition-colors">
              {isPlaying ? (
                <Pause className="w-7 h-7 fill-current" />
              ) : (
                <Play className="w-7 h-7 fill-current ml-1" />
              )}
            </div>
          </motion.button>
        </div>

        {/* Pure Animated Sound Wave Bars Underneath (Zero Text) */}
        <div className="flex items-end justify-center gap-1.5 h-7 -mt-2">
          {[12, 22, 16, 26, 18, 24, 14, 20, 12].map((h, i) => (
            <motion.div
              key={i}
              className={`w-1.5 rounded-full transition-colors ${
                isPlaying ? 'bg-emerald-500' : 'bg-zinc-300'
              }`}
              animate={{
                height: isPlaying
                  ? [`${Math.max(5, h * 0.3)}px`, `${h}px`, `${Math.max(5, h * 0.4)}px`]
                  : '5px',
              }}
              transition={{
                duration: 0.45 + (i % 3) * 0.14,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Walking Track with Animated Chrome Dino */}
      <div ref={trackRef} className="relative w-full pt-4 pb-2">
        <div className="w-full border-b-2 border-dashed border-zinc-400/80 relative h-0.5 mb-1" />

        <div className="relative h-28 overflow-hidden -mt-28">
          <motion.div
            className="absolute bottom-1 left-0 flex flex-col items-center select-none"
            animate={{
              x: [0, maxDistance, maxDistance, 0, 0],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.48, 0.5, 0.98, 1.0],
            }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="mb-1 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-xs text-[11px] font-mono text-zinc-700 whitespace-nowrap font-bold"
            >
              <span>Semangat Kodingnya!</span>
            </motion.div>

            <motion.div
              animate={{
                scaleX: [1, 1, -1, -1, 1],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.48, 0.5, 0.98, 1.0],
              }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex flex-col items-center"
              >
                <svg
                  viewBox="13 0 285 306"
                  width="54"
                  height="58"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-xs"
                >
                  <g fill="none" fillRule="evenodd" transform="translate(13.000000, 0.000000)">
                    <polygon
                      fill="#535353"
                      points="256.351585 91.6642857 213.916427 91.6642857 213.916427 80.0385714 284.492795 80.0385714 284.492795 14.3085714 270.198847 14.3085714 270.198847 0 155.400576 0 155.400576 14.3085714 141.553314 14.3085714 141.553314 105.972857 127.259366 105.972857 127.259366 119.834286 106.26513 119.834286 106.26513 134.142857 85.2708934 134.142857 85.2708934 148.451429 70.9769452 148.451429 70.9769452 162.312857 45.0691643 162.312857 45.0691643 148.004286 31.221902 148.004286 31.221902 134.142857 16.9279539 134.142857 16.9279539 105.972857 0.847262248 105.972857 0.847262248 192.718571 14.6945245 192.718571 14.6945245 207.027143 28.9884726 207.027143 28.9884726 220.888571 42.8357349 220.888571 42.8357349 235.197143 57.129683 235.197143 57.129683 249.058571 70.9769452 249.058571 70.9769452 305.398571 101.351585 305.398571 101.351585 289.301429 87.5043228 289.301429 87.5043228 277.228571 101.351585 277.228571 101.351585 263.367143 115.645533 263.367143 115.645533 249.058571 127.259366 249.058571 127.259366 263.367143 141.553314 263.367143 141.553314 305.398571 171.927954 305.398571 171.927954 289.301429 157.634006 289.301429 157.634006 235.197143 171.927954 235.197143 171.927954 220.888571 185.775216 220.888571 185.775216 199.872857 200.069164 199.872857 200.069164 150.687143 211.682997 150.687143 211.682997 164.548571 228.210375 164.548571 228.210375 134.142857 200.069164 134.142857 200.069164 108.208571 256.351585 108.208571"
                    />
                    <rect
                      fill="#FFFFFF"
                      x="169.247839"
                      y="20.5685714"
                      width="16.9740634"
                      height="16.9914286"
                    />
                  </g>
                </svg>
              </motion.div>
            </motion.div>

            <motion.div
              animate={{ scaleX: [1, 1.15, 1], opacity: [0.5, 0.25, 0.5] }}
              transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
              className="w-11 h-1.5 bg-zinc-300 rounded-full mt-1"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODUL 10 — SLIDE 13: RANGKUMAN MATERI MODUL 10 (KEYNOTE STYLE)
   ========================================================= */
export function Mod10SummarySlide() {
  const pillars = [
    {
      label: '01 • Tampilan & Model',
      title: 'JTable + JScrollPane',
      desc: 'Pisahkan tampilan & TableModel. Panggil fireTableDataChanged() tiap data berubah.',
      bg: 'bg-[#F2C94C]',
      shadow: 'shadow-[5px_5px_0px_#C99E26]',
      text: 'text-zinc-950',
      sub: 'text-zinc-900/85',
    },
    {
      label: '02 • Tipe Kolom',
      title: 'getColumnClass()',
      desc: 'Simpan stok sebagai Integer/Long agar sorting numerik (3 → 20 → 100), bukan teks.',
      bg: 'bg-[#4B5BF4]',
      shadow: 'shadow-[5px_5px_0px_#2D39B8]',
      text: 'text-white',
      sub: 'text-indigo-100',
    },
    {
      label: '03 • Konversi & ID',
      title: 'convertRowIndexToModel()',
      desc: 'Cek barisView < 0, konversi ke model, lalu kirim ID objek yang stabil — bukan index.',
      bg: 'bg-[#10B981]',
      shadow: 'shadow-[5px_5px_0px_#047857]',
      text: 'text-white',
      sub: 'text-emerald-50',
    },
    {
      label: '04 • Persistensi & Lapisan',
      title: 'GUI → Service → DAO',
      desc: 'TableModel hanya di RAM. Pisahkan akses penyimpanan & jalankan lewat SwingWorker.',
      bg: 'bg-[#F43F5E]',
      shadow: 'shadow-[5px_5px_0px_#BE123C]',
      text: 'text-white',
      sub: 'text-rose-100',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-9">
        <h2 className="text-3xl lg:text-5xl font-black text-zinc-900 tracking-tight">
          Rangkuman Modul 10
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {pillars.map((p, idx) => (
          <div key={idx} className="space-y-2.5">
            <div className="font-mono text-xs font-extrabold uppercase tracking-wider text-zinc-500 pl-1">
              {p.label}
            </div>
            <div className={`rounded-2xl p-6 space-y-2 ${p.bg} ${p.shadow}`}>
              <h3 className={`font-mono text-xl font-black ${p.text}`}>{p.title}</h3>
              <p className={`text-sm font-semibold leading-relaxed ${p.sub}`}>{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MODUL 10 — SLIDE 14: PENUTUP & TANYA JAWAB (AIRY KEYNOTE)
   ========================================================= */
export function Mod10ClosingSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-8 lg:px-20 max-w-5xl mx-auto text-center">
      <div className="space-y-8">
        <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-zinc-900 leading-[1.08]">
          Model Terpisah, <br />
          <span className="text-[#4B5BF4]">Tabel Akurat.</span>
        </h1>

        <div className="inline-block px-8 py-4 rounded-2xl bg-[#F2C94C] text-zinc-950 text-2xl font-black shadow-[6px_6px_0px_#C99E26]">
          Ada Pertanyaan? (Q&amp;A)
        </div>

        <div className="pt-6 text-xs font-mono text-zinc-400">
          Program Studi Teknik Informatika &bull; Universitas Pasundan &bull;
          Wanda Gusdya Purnama, ST., MT.
        </div>
      </div>
    </div>
  );
}

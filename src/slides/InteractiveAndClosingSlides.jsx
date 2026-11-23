import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  AlertTriangle,
  Monitor,
} from "lucide-react";
import lofiAudio from "../assets/lofi-study.mp3";

/* =========================================================
   SLIDE 24: PLAYGROUND INTERAKTIF — SIMULATOR FORM INVENTORI SWING
   ========================================================= */
export function LiveSwingSimulatorSlide() {
  const BATAS_MAKS = 1_000_000;
  const [nama, setNama] = useState("Buku");
  const [stok, setStok] = useState("3");
  const [activeCard, setActiveCard] = useState("form"); // 'form' | 'ringkas'
  const [hasilText, setHasilText] = useState("");
  const [dialogMsg, setDialogMsg] = useState(null);
  const [eventLog, setEventLog] = useState(
    'Siap menerima masukan pada kartu "form" (EDT Idle).',
  );
  const namaInputRef = useRef(null);

  const handleTinjau = () => {
    setDialogMsg(null);
    const trimmedNama = nama.trim();
    const trimmedStok = stok.trim();

    // 1. Parse angka
    const parsed = Number(trimmedStok);
    const isInteger =
      trimmedStok !== "" &&
      /^-?\d+$/.test(trimmedStok) &&
      Number.isSafeInteger(parsed) &&
      parsed >= -2147483648 &&
      parsed <= 2147483647;

    if (!isInteger) {
      setDialogMsg(
        "Nama wajib diisi; stok bilangan bulat 0 - 1000000 (NumberFormatException tertangkap!)",
      );
      setEventLog(
        '[GAGAL] Validasi Format: Integer.parseInt() melempar NumberFormatException. Tetap di kartu "form".',
      );
      return;
    }

    if (trimmedNama.length === 0 || parsed < 0 || parsed > BATAS_MAKS) {
      setDialogMsg("Nama wajib diisi; stok bilangan bulat 0 - 1000000");
      setEventLog(
        "[GAGAL] Validasi Aturan: throw new IllegalArgumentException(). Masukan pengguna tetap dipertahankan.",
      );
      return;
    }

    // Sukses
    const summary = `${trimmedNama}: ${parsed}`;
    setHasilText(summary);
    setActiveCard("ringkas");
    setEventLog(
      `[SUKSES] Validasi Lolos! hasil.setText("${summary}") -> layout.show(kartu, "ringkas")`,
    );
  };

  const handleBersihkan = () => {
    setDialogMsg(null);
    setNama("");
    setStok("");
    setEventLog(
      "[BERSIHKAN] Tombol Bersihkan: Field dikosongkan & nama.requestFocusInWindow() dipanggil (Tidak mengklaim hapus database).",
    );
    if (namaInputRef.current) {
      namaInputRef.current.focus();
    }
  };

  const handleKembali = () => {
    setDialogMsg(null);
    setActiveCard("form");
    setEventLog(
      '↩️ Tombol Kembali: layout.show(kartu, "form") — Data form sebelumnya masih utuh dan siap diedit!',
    );
  };

  const applyPreset = (presetNama, presetStok) => {
    setActiveCard("form");
    setDialogMsg(null);
    setNama(presetNama);
    setStok(presetStok);
    setEventLog(
      `Preset diterapkan: Nama="${presetNama}", Stok="${presetStok}". Klik tombol [Tinjau] untuk menguji!`,
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-5 border-b border-zinc-200 pb-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Playground: Simulator{" "}
            <code className="font-mono text-emerald-600">Form inventori</code>{" "}
            Swing
          </h2>
          <p className="text-sm text-zinc-600 mt-1">
            Uji langsung perilaku{" "}
            <code className="font-mono bg-zinc-100 px-1 rounded">
              ActionListener
            </code>
            , validasi,{" "}
            <code className="font-mono bg-zinc-100 px-1 rounded">
              CardLayout
            </code>
            , dan tombol{" "}
            <code className="font-mono bg-zinc-100 px-1 rounded">
              Bersihkan
            </code>
            :
          </p>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          <button
            onClick={() => applyPreset("Buku", "3")}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 font-bold cursor-pointer"
          >
            Kasus 1: Buku / 3
          </button>
          <button
            onClick={() => applyPreset("   ", "10")}
            className="px-2.5 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 font-bold cursor-pointer"
          >
            Kasus 2: Nama Kosong
          </button>
          <button
            onClick={() => applyPreset("Pensil", "abc")}
            className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 font-bold cursor-pointer"
          >
            Kasus 3: Stok &quot;abc&quot;
          </button>
          <button
            onClick={() => applyPreset("Pensil", "-1")}
            className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 font-bold cursor-pointer"
          >
            Kasus 4: Stok &quot;-1&quot;
          </button>
          <button
            onClick={() => applyPreset("Kertas", "2000000")}
            className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-800 border border-rose-300 hover:bg-rose-100 font-bold cursor-pointer"
          >
            Kasus 5: &gt; 1.000.000
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Simulated JFrame Window */}
        <div className="lg:col-span-7 bg-white border-2 border-zinc-400 rounded-xl shadow-md overflow-hidden flex flex-col justify-between relative">
          {/* OS Titlebar */}
          <div className="bg-zinc-800 text-white px-4 py-2.5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold">
                JFrame: &quot;Form inventori&quot;
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-zinc-700 text-emerald-300 text-[10px]">
              CardLayout Active: &quot;{activeCard}&quot;
            </span>
          </div>

          {/* Card Body */}
          <div className="p-6 flex-1 flex flex-col justify-center bg-zinc-50">
            {activeCard === "form" ? (
              <div className="space-y-4 max-w-md mx-auto w-full bg-white p-5 rounded-xl border border-zinc-300 shadow-2xs">
                <div className="grid grid-cols-3 items-center gap-3">
                  <label className="font-mono text-xs font-bold text-zinc-800">
                    Nama
                  </label>
                  <input
                    ref={namaInputRef}
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Contoh: Buku"
                    className="col-span-2 px-3 py-1.5 rounded-lg border border-zinc-300 font-mono text-xs bg-white text-zinc-900 focus:outline-2 focus:outline-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-3">
                  <label className="font-mono text-xs font-bold text-zinc-800">
                    Stok
                  </label>
                  <input
                    type="text"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    placeholder="0 - 1000000"
                    className="col-span-2 px-3 py-1.5 rounded-lg border border-zinc-300 font-mono text-xs bg-white text-zinc-900 focus:outline-2 focus:outline-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-3 pt-1">
                  <span className="font-mono text-[11px] text-zinc-500 italic">
                    Belum disimpan
                  </span>
                  <div className="col-span-2 flex gap-2 justify-end">
                    <button
                      onClick={handleBersihkan}
                      className="px-3 py-1.5 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-mono text-xs font-bold cursor-pointer transition-colors"
                    >
                      Bersihkan
                    </button>
                    <button
                      onClick={handleTinjau}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                    >
                      Tinjau
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5 max-w-md mx-auto w-full bg-white p-6 rounded-xl border-2 border-emerald-500 shadow-2xs text-center">
                <div className="text-[11px] font-mono uppercase text-emerald-700 font-bold">
                  Kartu &quot;ringkas&quot; (JPanel BorderLayout)
                </div>
                <div className="py-4 px-4 rounded-lg bg-zinc-100 border border-zinc-200 font-mono text-lg font-extrabold text-zinc-900">
                  {hasilText}
                </div>
                <button
                  onClick={handleKembali}
                  className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold cursor-pointer transition-colors"
                >
                  Kembali
                </button>
              </div>
            )}

            {/* Simulated JOptionPane Modal */}
            {dialogMsg && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50 border-2 border-amber-400 shadow-md flex items-center justify-between gap-4">
                <div className="flex items-start gap-2.5 text-xs font-mono text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[10px] uppercase text-amber-700">
                      JOptionPane.showMessageDialog
                    </div>
                    <div>&quot;{dialogMsg}&quot;</div>
                  </div>
                </div>
                <button
                  onClick={() => setDialogMsg(null)}
                  className="px-3 py-1 rounded bg-amber-600 text-white font-mono text-xs font-bold cursor-pointer shrink-0"
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Live Inspector Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div className="bg-zinc-900 text-zinc-200 rounded-xl p-5 font-mono text-xs space-y-3 flex-1 flex flex-col justify-center">
            <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Inspektor Status Komponen &amp; EDT:
            </div>
            <div className="space-y-1.5 text-[11.5px] border-b border-zinc-800 pb-3">
              <div>
                nama.getText():{" "}
                <span className="text-emerald-300">&quot;{nama}&quot;</span>
              </div>
              <div>
                stok.getText():{" "}
                <span className="text-amber-300">&quot;{stok}&quot;</span>
              </div>
              <div>
                Kartu Terlihat:{" "}
                <span className="text-sky-300">&quot;{activeCard}&quot;</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[10px] uppercase text-zinc-400">
                Log Kejadian Terakhir:
              </div>
              <p className="text-zinc-100 leading-relaxed">{eventLog}</p>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 leading-relaxed">
            <strong>Perhatikan:</strong> Saat input ditolak (misal Stok ={" "}
            <code className="font-mono">abc</code>), aplikasi tetap berada di
            kartu <code className="font-mono">&quot;form&quot;</code> dan teks
            Nama yang sudah diketik <strong>tidak hilang</strong>!
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 30: KERJAKAN TUGAS + LO-FI PLAYER + MONSTER MINI
   ========================================================= */
export function ChallengeModifikasiSlide() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
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
          dan tugas pertemuan 2. Dengarkan alunan musik lo-fi agar suasana
          belajar lebih rileks.
        </p>
      </div>

      {/* Middle: Lo-Fi Music Player Widget */}
      <div className="my-auto flex justify-center">
        <div className="bg-zinc-950 text-white px-6 py-4.5 rounded-3xl border border-zinc-800 shadow-2xl flex flex-wrap items-center justify-between gap-6 max-w-xl w-full">
          {/* Vinyl Record & Track Info */}
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full border-2 border-zinc-700 bg-zinc-900 flex items-center justify-center shadow-md"
              >
                <div className="w-8 h-8 rounded-full border border-zinc-700/60 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-xs shadow-emerald-400" />
                </div>
              </motion.div>
              {isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold tracking-wider text-emerald-400">
                  LO-FI FOCUS BEATS
                </span>
              </div>
              <span className="text-sm font-bold text-white tracking-wide mt-0.5">
                Java Swing Lab Study
              </span>
              <span className="text-[11px] text-zinc-400 font-sans">
                {isPlaying
                  ? "Sedang memutar musik..."
                  : "Musik dijeda (klik play)"}
              </span>
            </div>
          </div>

          {/* Equalizer Wave Bars */}
          <div className="flex items-end gap-1 h-6 px-1">
            {[16, 22, 12, 20, 14, 24, 18].map((h, i) => (
              <motion.div
                key={i}
                className="w-1 bg-emerald-400 rounded-full"
                animate={{
                  height: isPlaying
                    ? [
                        `${Math.max(4, h * 0.3)}px`,
                        `${h}px`,
                        `${Math.max(4, h * 0.4)}px`,
                      ]
                    : "4px",
                }}
                transition={{
                  duration: 0.4 + (i % 3) * 0.15,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Player Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
              title={isPlaying ? "Jeda Musik (Pause)" : "Putar Musik (Play)"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              title={isMuted ? "Buka Suara (Unmute)" : "Matikan Suara (Mute)"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Walking Track with Animated Chrome Dino */}
      <div ref={trackRef} className="relative w-full pt-4 pb-2">
        {/* Track / Ground Line */}
        <div className="w-full border-b-2 border-dashed border-zinc-400/80 relative h-0.5 mb-1" />

        {/* Looping Walking Dino Container */}
        <div className="relative h-28 overflow-hidden -mt-28">
          <motion.div
            className="absolute bottom-1 left-0 flex flex-col items-center select-none"
            animate={{
              x: [0, maxDistance, maxDistance, 0, 0],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.48, 0.5, 0.98, 1.0],
            }}
          >
            {/* Speech Bubble (Stays Upright & Legible) */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-1 px-3 py-1 rounded-full bg-white border border-zinc-200 shadow-xs text-[11px] font-mono text-zinc-700 whitespace-nowrap font-bold"
            >
              <span>Semangat Kodingnya!</span>
            </motion.div>

            {/* Chrome Dino Body (Flips direction synchronously when turning around) */}
            <motion.div
              animate={{
                scaleX: [1, 1, -1, -1, 1],
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.48, 0.5, 0.98, 1.0],
              }}
            >
              {/* Relaxed running bobbing animation */}
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 0.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex flex-col items-center"
              >
                {/* Authentic Google Chrome Dino T-Rex SVG */}
                <svg
                  viewBox="13 0 285 306"
                  width="54"
                  height="58"
                  xmlns="http://www.w3.org/2000/svg"
                  className="drop-shadow-xs"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    transform="translate(13.000000, 0.000000)"
                  >
                    <polygon
                      fill="#535353"
                      points="256.351585 91.6642857 213.916427 91.6642857 213.916427 80.0385714 284.492795 80.0385714 284.492795 14.3085714 270.198847 14.3085714 270.198847 0 155.400576 0 155.400576 14.3085714 141.553314 14.3085714 141.553314 105.972857 127.259366 105.972857 127.259366 119.834286 106.26513 119.834286 106.26513 134.142857 85.2708934 134.142857 85.2708934 148.451429 70.9769452 148.451429 70.9769452 162.312857 45.0691643 162.312857 45.0691643 148.004286 31.221902 148.004286 31.221902 134.142857 16.9279539 134.142857 16.9279539 105.972857 0.847262248 105.972857 0.847262248 192.718571 14.6945245 192.718571 14.6945245 207.027143 28.9884726 207.027143 28.9884726 220.888571 42.8357349 220.888571 42.8357349 235.197143 57.129683 235.197143 57.129683 249.058571 70.9769452 249.058571 70.9769452 305.398571 101.351585 305.398571 101.351585 289.301429 87.5043228 289.301429 87.5043228 277.228571 101.351585 277.228571 101.351585 263.367143 115.645533 263.367143 115.645533 249.058571 127.259366 249.058571 127.259366 263.367143 141.553314 263.367143 141.553314 305.398571 171.927954 305.398571 171.927954 289.301429 157.634006 289.301429 157.634006 235.197143 171.927954 235.197143 171.927954 220.888571 185.775216 220.888571 185.775216 199.872857 200.069164 199.872857 200.069164 150.687143 211.682997 150.687143 211.682997 164.548571 228.210375 164.548571 228.210375 134.142857 200.069164 134.142857 200.069164 108.208571 256.351585 108.208571"
                    />
                    {/* Dino White Eye */}
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

            {/* Dino Ground Shadow */}
            <motion.div
              animate={{ scaleX: [1, 1.15, 1], opacity: [0.5, 0.25, 0.5] }}
              transition={{
                duration: 0.25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-11 h-1.5 bg-zinc-300 rounded-full mt-1"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 26: RANGKUMAN & PUSTAKA ORACLE
   ========================================================= */
export function SummarySlide() {
  const pillars = [
    {
      title: "1. Event & ActionListener",
      role: "Penghubung Interaksi",
      desc: "Gunakan ActionListener (lambda) pada tombol untuk menangani klik & keyboard; tempatkan aturan bisnis di Model/Service.",
    },
    {
      title: "2. Empat Tahap & Validasi",
      role: "Konsistensi Form",
      desc: "Pisahkan: Baca Input -> Validasi (Kosong, Format, Rentang) -> Tindakan -> Umpan Balik. Pertahankan input pengguna saat gagal!",
    },
    {
      title: "3. Navigasi CardLayout",
      role: "Satu JFrame Cukup",
      desc: "Kelola perpindahan kartu FORM dan RINGKASAN dalam satu JFrame menggunakan konstanta nama kartu yang bebas salah ketik.",
    },
    {
      title: "4. EDT & SwingWorker",
      role: "Antarmuka Responsif",
      desc: "Jangan memblokir EDT dengan operasi database/jaringan. Gunakan SwingWorker (doInBackground di worker thread, done di EDT).",
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-6 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Rangkuman Materi Modul 09
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Intisari materi Event Handling, Validasi, dan Navigasi pada Praktikum
          Pemrograman II:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {pillars.map((p, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-zinc-300 rounded-2xl p-6 shadow-sm space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                {p.title}
              </span>
              <span className="text-xs font-mono font-bold text-zinc-500">
                {p.role}
              </span>
            </div>
            <p className="text-sm text-zinc-600 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 27: PENUTUP & TANYA JAWAB (Q&A)
   ========================================================= */
export function ClosingSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-20 max-w-5xl mx-auto text-center">
      <div className="bg-white border-2 border-zinc-300 rounded-2xl p-12 lg:p-16 shadow-md space-y-8">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 leading-tight">
          Form Konsisten, Navigasi Terkendali. <br />
          <span className="text-emerald-600">Ada Pertanyaan? (Q&amp;A)</span>
        </h1>

        <div className="pt-4 text-xs font-mono text-zinc-400">
          Program Studi Teknik Informatika &bull; Universitas Pasundan &bull;
          Wanda Gusdya Purnama, ST., MT.
        </div>
      </div>
    </div>
  );
}

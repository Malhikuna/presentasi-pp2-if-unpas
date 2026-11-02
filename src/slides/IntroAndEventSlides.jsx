import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  AlertCircle,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Coffee,
  Minus,
  Square,
  X,
  Terminal,
  Code2,
  Activity,
  Radio,
  ShieldCheck,
  Volume2,
  VolumeX,
  Headphones,
  Waves,
  Play,
  Workflow,
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

/* =========================================================
   SLIDE 0: COVER SLIDE
   ========================================================= */
export function CoverSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 lg:px-24 max-w-5xl mx-auto">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wide">
          <span>IF21W0508 &bull; Praktikum Pemrograman II</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-zinc-900 leading-[1.08]">
            Event Handling, <br />
            <span className="text-emerald-600">Validasi &amp; Navigasi.</span>
          </h1>

          <p className="text-lg lg:text-xl text-zinc-600 max-w-2xl font-normal leading-relaxed pt-1">
            Menghubungkan tindakan pengguna dengan <code className="font-mono text-base bg-zinc-200/70 px-1.5 py-0.5 rounded text-zinc-800">ActionListener</code>, menolak input salah secara konsisten, mengatur perpindahan tampilan <code className="font-mono text-base bg-zinc-200/70 px-1.5 py-0.5 rounded text-zinc-800">CardLayout</code>, serta menjaga responsivitas GUI di Java Swing.
          </p>
        </div>

        <div className="pt-6 border-t border-zinc-200 flex items-center gap-8 text-xs font-mono text-zinc-500">
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase">Dosen Pengampu</span>
            <strong className="text-zinc-800 text-sm">Wanda Gusdya Purnama, ST., MT.</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 1: MENGINGAT KEMBALI MATERI LAYOUT MANAGER
   ========================================================= */
export function ReviewLayoutManagerSlide({ step = 0 }) {
  const layouts = [
    {
      name: 'FlowLayout',
      desc: 'Komponen disusun berurutan mengalir ke samping secara horizontal. Jika ruang baris habis, komponen otomatis pindah ke baris baru.',
    },
    {
      name: 'BorderLayout',
      desc: 'Membagi area container ke dalam 5 wilayah: NORTH, SOUTH, EAST, WEST, dan area CENTER yang fleksibel memenuhi ruang sisa.',
    },
    {
      name: 'GridLayout',
      desc: 'Menyusun komponen dalam kisi baris dan kolom berukuran seragam (semua kotak/sel memiliki ukuran yang sama rata).',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-20 max-w-5xl mx-auto">
      {/* Question Header (Bersih tanpa badge & tanpa subteks) */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
          Di pertemuan sebelumnya, kita telah belajar Layout Manager apa saja?
        </h2>
      </div>

      {/* Answer Cards Area: Dibuka satu per satu sesuai step */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {layouts.map((l, idx) => {
          const isCardRevealed = step > idx;

          return (
            <div key={idx} className="min-h-[220px]">
              <AnimatePresence mode="wait">
                {isCardRevealed ? (
                  <motion.div
                    key={`card-revealed-${idx}`}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="h-full bg-white border-2 border-emerald-500 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-3">
                      <div className="border-b border-zinc-100 pb-2">
                        <h3 className="font-mono text-lg font-black text-zinc-900">
                          {l.name}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                        {l.desc}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`card-hidden-${idx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full border-2 border-dashed border-zinc-300 rounded-2xl p-8 bg-zinc-50/70 flex flex-col items-center justify-center text-center space-y-3 select-none shadow-2xs"
                  >
                    <div className="w-12 h-12 rounded-full bg-zinc-200/80 flex items-center justify-center text-zinc-400 font-mono text-xl font-black">
                      ?
                    </div>
                    <span className="text-xs font-mono text-zinc-400 font-bold">
                      Layout Manager #{idx + 1}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 2: MENGINGAT KEMBALI 5 WILAYAH BORDERLAYOUT
   ========================================================= */
export function ReviewBorderLayoutSlide({ step = 0 }) {
  const regions = [
    {
      name: 'NORTH',
      desc: 'Bagian atas container. Komponen membentang horizontal dari ujung kiri ke kanan.',
    },
    {
      name: 'SOUTH',
      desc: 'Bagian bawah container. Komponen membentang horizontal di batas bawah jendela.',
    },
    {
      name: 'WEST',
      desc: 'Bagian barat/kiri container. Komponen membentang vertikal di sisi kiri.',
    },
    {
      name: 'EAST',
      desc: 'Bagian timur/kanan container. Komponen membentang vertikal di sisi kanan.',
    },
    {
      name: 'CENTER',
      desc: 'Bagian tengah. Mengisi seluruh ruang yang tersisa dan paling fleksibel.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Question Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
          BorderLayout membagi container menjadi berapa wilayah?
        </h2>
      </div>

      {/* 5 Region Cards: Muncul satu per satu tanpa membocorkan jumlah di awal */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 min-h-[220px]">
        {regions.map((r, idx) => {
          const isCardRevealed = step > idx;

          return (
            <div key={idx} className="min-h-[220px]">
              <AnimatePresence>
                {isCardRevealed && (
                  <motion.div
                    key={`border-revealed-${idx}`}
                    initial={{ opacity: 0, y: 16, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="h-full bg-white border-2 border-emerald-500 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2.5">
                      <div className="border-b border-zinc-100 pb-2">
                        <h3 className="font-mono text-base font-black text-zinc-900">
                          {r.name}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                        {r.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 2: CAPAIAN LUARAN PRAKTIKAN
   ========================================================= */
export function ObjectivesSlide() {
  const outcomes = [
    {
      num: '01',
      badge: 'Event Handling',
      title: 'Hubungkan Tindakan dengan Listener',
      desc: 'Mendaftarkan ActionListener ke JButton dengan ekspresi lambda untuk merespons klik dan keyboard.',
      tags: ['ActionListener', 'Lambda Expression'],
      color: {
        border: 'border-emerald-300 hover:border-emerald-500',
        bg: 'bg-emerald-50/50 hover:bg-emerald-50/80',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        numBg: 'bg-emerald-600 text-white shadow-emerald-600/30',
        tagBg: 'bg-white text-emerald-700 border-emerald-200',
      },
    },
    {
      num: '02',
      badge: 'Validasi Data',
      title: 'Tolak Input Salah & Jaga Form',
      desc: 'Validasi kekosongan, format parseInt, dan rentang bisnis tanpa menghapus isian pengguna yang sah.',
      tags: ['trim()', 'Integer.parseInt', 'Error Feedback'],
      color: {
        border: 'border-amber-300 hover:border-amber-500',
        bg: 'bg-amber-50/50 hover:bg-amber-50/80',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        numBg: 'bg-amber-600 text-white shadow-amber-600/30',
        tagBg: 'bg-white text-amber-700 border-amber-200',
      },
    },
    {
      num: '03',
      badge: 'Navigasi Window',
      title: 'Navigasi Satu Jendela (CardLayout)',
      desc: 'Transisi mulus antar panel Form dan Ringkasan dalam satu JFrame tanpa membuat banyak popup.',
      tags: ['CardLayout', 'Single Window', 'Multi-View'],
      color: {
        border: 'border-indigo-300 hover:border-indigo-500',
        bg: 'bg-indigo-50/50 hover:bg-indigo-50/80',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        numBg: 'bg-indigo-600 text-white shadow-indigo-600/30',
        tagBg: 'bg-white text-indigo-700 border-indigo-200',
      },
    },
    {
      num: '04',
      badge: 'Multithreading',
      title: 'Responsivitas EDT & SwingWorker',
      desc: 'Memisahkan proses komputasi lambat ke thread latar agar antarmuka GUI tidak membeku (freeze).',
      tags: ['Event Dispatch Thread', 'SwingWorker'],
      color: {
        border: 'border-rose-300 hover:border-rose-500',
        bg: 'bg-rose-50/50 hover:bg-rose-50/80',
        badge: 'bg-rose-100 text-rose-800 border-rose-200',
        numBg: 'bg-rose-600 text-white shadow-rose-600/30',
        tagBg: 'bg-white text-rose-700 border-rose-200',
      },
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-5 border-b border-zinc-200 pb-3">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Capaian Luaran Praktikan
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Sasaran kompetensi utama dan fondasi arsitektur GUI yang wajib dikuasai:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outcomes.map((item) => (
          <div
            key={item.num}
            className={`p-5 rounded-xl border-2 transition-all shadow-sm flex flex-col justify-between ${item.color.border} ${item.color.bg}`}
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${item.color.badge}`}>
                  {item.badge}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm shadow-sm ${item.color.numBg}`}>
                  {item.num}
                </div>
              </div>
              <h3 className="font-bold text-zinc-900 text-base mb-1 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                {item.desc}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-zinc-200/60 font-mono text-[10px]">
              {item.tags.map((tag, tIdx) => (
                <span key={tIdx} className={`px-2 py-0.5 rounded border ${item.color.tagBg} font-medium`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE BARU (Setelah Slide 2): SIMULASI VISUAL ALUR KERJA FORM
   ========================================================= */
export function FormVisualSimulationSlide() {
  const [nama, setNama] = useState('Buku Tulis');
  const [stok, setStok] = useState('15');
  const [activeView, setActiveView] = useState('form'); // 'form' | 'summary'
  const [selectedScenario, setSelectedScenario] = useState('idle');
  const [validationState, setValidationState] = useState({
    status: 'idle', // 'idle' | 'success' | 'error'
    errorField: null, // 'nama' | 'stok' | null
    message: '',
  });

  const runSimulation = (inputNama, inputStok) => {
    const trimmedNama = inputNama.trim();
    const trimmedStok = inputStok.trim();

    // 1. Validasi Kosong Nama
    if (trimmedNama.length === 0) {
      setActiveView('form');
      setValidationState({
        status: 'error',
        errorField: 'nama',
        message: 'Nama barang wajib diisi. Masukkan nama barang.',
      });
      return;
    }

    // 2. Validasi Format & Rentang Stok
    const isInteger = trimmedStok !== '' && /^-?\d+$/.test(trimmedStok);
    const num = Number(trimmedStok);

    if (!isInteger) {
      setActiveView('form');
      setValidationState({
        status: 'error',
        errorField: 'stok',
        message: 'Stok harus berupa bilangan bulat (angka).',
      });
      return;
    }

    if (num < 0) {
      setActiveView('form');
      setValidationState({
        status: 'error',
        errorField: 'stok',
        message: 'Stok tidak boleh negatif (harus >= 0). Perbaiki nilainya.',
      });
      return;
    }

    // Lolos Validasi
    setActiveView('summary');
    setValidationState({
      status: 'success',
      errorField: null,
      message: 'Masukan sah! Ringkasan berhasil dibentuk.',
    });
  };

  const handleScenario = (scen) => {
    setSelectedScenario(scen);
    if (scen === 'success') {
      setNama('Buku Tulis');
      setStok('15');
      runSimulation('Buku Tulis', '15');
    } else if (scen === 'error-stok') {
      setNama('Buku Tulis');
      setStok('-5');
      runSimulation('Buku Tulis', '-5');
    } else if (scen === 'error-nama') {
      setNama('');
      setStok('20');
      runSimulation('', '20');
    } else {
      setNama('');
      setStok('');
      setActiveView('form');
      setValidationState({ status: 'idle', errorField: null, message: '' });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Quick Scenario Controls: Clean, Human-Designed Segmented Switcher */}
      <div className="mb-4 flex items-center justify-end">
        <div className="inline-flex items-center gap-1 p-1 bg-zinc-100 rounded-lg border border-zinc-200 shadow-inner">
          <button
            onClick={() => handleScenario('success')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all ${
              selectedScenario === 'success'
                ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Berhasil
          </button>
          <button
            onClick={() => handleScenario('error-stok')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all ${
              selectedScenario === 'error-stok'
                ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Gagal: Stok Minus
          </button>
          <button
            onClick={() => handleScenario('error-nama')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer transition-all ${
              selectedScenario === 'error-nama'
                ? 'bg-white text-zinc-900 shadow-sm font-semibold'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Gagal: Nama Kosong
          </button>
          <div className="w-px h-3.5 bg-zinc-300 mx-0.5" />
          <button
            onClick={() => handleScenario('reset')}
            className={`p-1.5 rounded-md cursor-pointer transition-all ${
              selectedScenario === 'reset'
                ? 'bg-white text-zinc-900 shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
            title="Reset form"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Autentik Java Swing JFrame (Kiri) vs Visual Pipeline 4 Langkah (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Sisi Kiri: Autentik Java Swing JFrame */}
        <div className="lg:col-span-6 rounded-lg border-2 border-zinc-400 bg-[#ECE9D8] shadow-lg overflow-hidden flex flex-col justify-between">
          {/* Java Swing Titlebar */}
          <div className="bg-gradient-to-r from-[#204A87] to-[#3465A4] text-white px-2.5 py-1.5 flex items-center justify-between select-none shadow-xs">
            <div className="flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-sans text-xs font-semibold tracking-wide">Data Barang</span>
            </div>
            <div className="flex items-center gap-1 text-white/90">
              <div className="w-4 h-4 rounded-[2px] bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer">
                <Minus className="w-2.5 h-2.5" />
              </div>
              <div className="w-4 h-4 rounded-[2px] bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer">
                <Square className="w-2 h-2" />
              </div>
              <div className="w-4 h-4 rounded-[2px] bg-red-600 hover:bg-red-700 text-white flex items-center justify-center cursor-pointer">
                <X className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>

          {/* Java Swing Window Client Area */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            {activeView === 'form' ? (
              <div className="space-y-4 my-auto">
                {/* Field 1: Nama Barang */}
                <div className="grid grid-cols-3 items-center gap-3">
                  <label className="text-xs font-medium text-zinc-900 font-sans">
                    Nama barang:
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => {
                      setNama(e.target.value);
                      setSelectedScenario('custom');
                    }}
                    placeholder="Contoh: Buku Tulis"
                    className={`col-span-2 px-2.5 py-1.5 text-xs bg-white text-zinc-900 font-sans border rounded-[2px] outline-none shadow-inner transition-colors ${
                      validationState.errorField === 'nama'
                        ? 'border-red-600 ring-2 ring-red-400/50 bg-red-50/50'
                        : 'border-zinc-400 focus:border-zinc-700'
                    }`}
                  />
                </div>

                {/* Field 2: Stok Awal */}
                <div className="grid grid-cols-3 items-center gap-3">
                  <label className="text-xs font-medium text-zinc-900 font-sans">
                    Stok awal:
                  </label>
                  <input
                    type="text"
                    value={stok}
                    onChange={(e) => {
                      setStok(e.target.value);
                      setSelectedScenario('custom');
                    }}
                    placeholder="Contoh: 15"
                    className={`col-span-2 px-2.5 py-1.5 text-xs bg-white text-zinc-900 font-sans border rounded-[2px] outline-none shadow-inner transition-colors ${
                      validationState.errorField === 'stok'
                        ? 'border-red-600 ring-2 ring-red-400/50 bg-red-50/50'
                        : 'border-zinc-400 focus:border-zinc-700'
                    }`}
                  />
                </div>

                {/* Pesan Label Validasi (JLabel) */}
                <div className="min-h-[22px] px-0.5 text-xs font-sans text-red-600 flex items-center gap-1.5">
                  {validationState.status === 'error' && (
                    <>
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-600" />
                      <span>{validationState.message}</span>
                    </>
                  )}
                </div>

                {/* JButton: Lihat ringkasan */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setSelectedScenario('custom');
                      runSimulation(nama, stok);
                    }}
                    className="px-4 py-1.5 rounded-[3px] bg-gradient-to-b from-[#FFFFFF] via-[#F2F2F2] to-[#DCDCDC] hover:from-[#FFFFFF] hover:to-[#EAEAEA] active:from-[#CECECE] active:to-[#E0E0E0] border border-[#7A7A7A] text-zinc-900 font-sans text-xs font-medium shadow-[inset_0_1px_0_white,0_1px_2px_rgba(0,0,0,0.15)] cursor-pointer active:shadow-inner"
                  >
                    Lihat ringkasan
                  </button>
                </div>
              </div>
            ) : (
              /* Java Swing CardLayout: RINGKASAN */
              <div className="space-y-3 my-auto">
                <div className="text-xs font-medium text-zinc-900 font-sans">
                  Ringkasan data
                </div>
                <textarea
                  readOnly
                  value={`Nama barang: ${nama}\nStok awal: ${stok}\n\nRingkasan hanya berada di memori.\nBelum ada penyimpanan ke berkas atau basis data.`}
                  className="w-full h-32 p-2.5 text-xs font-mono bg-white text-zinc-900 border border-zinc-400 rounded-[2px] shadow-inner resize-none outline-none leading-relaxed"
                />
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      setActiveView('form');
                      setValidationState({ status: 'idle', errorField: null, message: '' });
                    }}
                    className="px-4 py-1.5 rounded-[3px] bg-gradient-to-b from-[#FFFFFF] via-[#F2F2F2] to-[#DCDCDC] hover:from-[#FFFFFF] hover:to-[#EAEAEA] active:from-[#CECECE] active:to-[#E0E0E0] border border-[#7A7A7A] text-zinc-900 font-sans text-xs font-medium shadow-[inset_0_1px_0_white,0_1px_2px_rgba(0,0,0,0.15)] cursor-pointer active:shadow-inner"
                  >
                    Kembali ke form
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sisi Kanan: Visual Alur 4 Tahap Berurutan (Clean & Scannable) */}
        <div className="lg:col-span-6 bg-zinc-900 text-white rounded-xl p-5 shadow-md border-2 border-zinc-700 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-zinc-700 pb-2.5 mb-2">
            <span className="text-xs font-mono font-bold text-zinc-100">
              Alur Eksekusi Program (4 Tahap)
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700">
              Listener &bull; Event Handling
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs my-auto py-1">
            {/* Step 1 */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-800 border border-zinc-600">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md bg-zinc-700 text-zinc-100 text-[11px] flex items-center justify-center font-bold font-mono">
                  1
                </span>
                <span className="text-xs font-sans font-semibold text-zinc-100">
                  Pembacaan Input
                </span>
              </div>
              <code className="text-xs font-semibold text-emerald-300 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-700">
                getText().trim()
              </code>
            </div>

            {/* Step 2 */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                validationState.status === 'success'
                  ? 'bg-zinc-800 border-emerald-500 text-zinc-100'
                  : validationState.status === 'error'
                  ? 'bg-zinc-800 border-rose-500 text-zinc-100'
                  : 'bg-zinc-800/80 border-zinc-600 text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-5 h-5 rounded-md text-[11px] font-mono flex items-center justify-center font-bold ${
                    validationState.status === 'success'
                      ? 'bg-emerald-600 text-white'
                      : validationState.status === 'error'
                      ? 'bg-rose-600 text-white'
                      : 'bg-zinc-700 text-zinc-200'
                  }`}
                >
                  2
                </span>
                <span className="text-xs font-sans font-semibold text-zinc-100">
                  Validasi &amp; Konversi
                </span>
              </div>
              <div>
                {validationState.status === 'success' && (
                  <span className="text-xs text-emerald-300 flex items-center gap-1 font-sans font-bold bg-zinc-950 px-2 py-0.5 rounded border border-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Lolos</span>
                  </span>
                )}
                {validationState.status === 'error' && (
                  <span className="text-xs text-rose-300 flex items-center gap-1 font-sans font-bold bg-zinc-950 px-2 py-0.5 rounded border border-rose-800">
                    <XCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Ditolak</span>
                  </span>
                )}
                {validationState.status === 'idle' && (
                  <span className="text-xs text-zinc-400 font-sans font-medium">Menunggu</span>
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                validationState.status === 'success'
                  ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                  : validationState.status === 'error'
                  ? 'bg-zinc-800/40 border-dashed border-zinc-700 text-zinc-400'
                  : 'bg-zinc-800/80 border-zinc-600 text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-md bg-zinc-700 text-zinc-100 text-[11px] flex items-center justify-center font-bold font-mono">
                  3
                </span>
                <span className="text-xs font-sans font-semibold text-zinc-100">
                  Tindakan (Action)
                </span>
              </div>
              <span className="text-xs font-sans font-semibold">
                {validationState.status === 'success' ? (
                  <span className="text-emerald-300 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-700">Eksekusi</span>
                ) : validationState.status === 'error' ? (
                  <span className="text-zinc-400">Dilewati</span>
                ) : (
                  <span className="text-zinc-400">-</span>
                )}
              </span>
            </div>

            {/* Step 4 */}
            <div
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                validationState.status === 'success'
                  ? 'bg-zinc-800 border-emerald-500 text-zinc-100'
                  : validationState.status === 'error'
                  ? 'bg-zinc-800 border-rose-500 text-zinc-100'
                  : 'bg-zinc-800/80 border-zinc-600 text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-5 h-5 rounded-md text-[11px] font-mono flex items-center justify-center font-bold ${
                    validationState.status === 'success'
                      ? 'bg-emerald-600 text-white'
                      : validationState.status === 'error'
                      ? 'bg-rose-600 text-white'
                      : 'bg-zinc-700 text-zinc-200'
                  }`}
                >
                  4
                </span>
                <span className="text-xs font-sans font-semibold text-zinc-100">
                  Umpan Balik (Feedback)
                </span>
              </div>
              <span className="text-xs font-sans">
                {activeView === 'summary' ? (
                  <span className="text-emerald-300 font-bold bg-zinc-950 px-2 py-0.5 rounded border border-emerald-800">Ringkasan</span>
                ) : validationState.status === 'error' ? (
                  <span className="text-rose-300 font-bold bg-zinc-950 px-2 py-0.5 rounded border border-rose-800">Tetap di Form</span>
                ) : (
                  <span className="text-zinc-400">-</span>
                )}
              </span>
            </div>
          </div>

          {/* Feedback Info Box */}
          <div className="mt-2.5 p-3 rounded-lg bg-zinc-950 border border-zinc-700 text-xs flex items-center justify-between shadow-xs">
            <span className="font-mono text-emerald-400 font-bold text-xs">Hasil:</span>
            <span className="font-sans text-zinc-100 font-semibold truncate ml-2">
              {validationState.status === 'success'
                ? 'Ringkasan berhasil dibentuk di memori'
                : validationState.status === 'error'
                ? validationState.message
                : 'Menunggu penekanan tombol...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE: PENGENALAN EVENT DI JAVA SWING
   ========================================================= */
export function EventIntroSlide() {
  const [lastEvent, setLastEvent] = useState({
    name: 'ActionEvent',
    source: 'JButton["Kirim Data"]',
    trigger: 'Klik mouse / Spasi / Enter',
    id: 'ACTION_PERFORMED (1001)',
    timestamp: 'Siap menerima interaksi',
    data: 'command="KIRIM", modifiers=0',
  });
  const [pulse, setPulse] = useState(false);
  const [inputText, setInputText] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const triggerEvent = (eventData) => {
    setLastEvent({
      ...eventData,
      timestamp: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3,
      }),
    });
    setPulse(true);
    setTimeout(() => setPulse(false), 300);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-4 border-b border-zinc-200 pb-3">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 tracking-tight">
          Pengenalan Event
        </h2>
        <p className="text-xs lg:text-sm text-zinc-600 mt-0.5">
          Objek data yang dibangkitkan sistem secara otomatis saat terjadi aksi pada antarmuka pengguna.
        </p>
      </div>

      {/* Main Grid: Interactive Trigger Source (Left) & Event Packet Inspector (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-4 items-stretch">
        {/* Kolom Kiri: Autentik Java Swing JFrame (Komponen Pemicu Event) */}
        <div className="lg:col-span-6 rounded-lg border-2 border-zinc-400 bg-[#ECE9D8] shadow-md overflow-hidden flex flex-col justify-between h-[360px]">
          {/* Java Swing Window Titlebar */}
          <div className="bg-gradient-to-r from-[#204A87] to-[#3465A4] text-white px-2.5 py-1.5 flex items-center justify-between select-none shadow-xs shrink-0">
            <div className="flex items-center gap-1.5">
              <Coffee className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-sans text-xs font-semibold tracking-wide">
                Demo Komponen Swing (JFrame)
              </span>
            </div>
            <div className="flex items-center gap-1 text-white/90">
              <div className="w-4 h-4 rounded-[2px] bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer">
                <Minus className="w-2.5 h-2.5" />
              </div>
              <div className="w-4 h-4 rounded-[2px] bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer">
                <Square className="w-2 h-2" />
              </div>
              <div className="w-4 h-4 rounded-[2px] bg-red-600 hover:bg-red-700 text-white flex items-center justify-center cursor-pointer">
                <X className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>

          {/* Java Swing Client Area */}
          <div className="p-4 flex-1 flex flex-col justify-around gap-3">
            {/* 1. JButton */}
            <div className="grid grid-cols-12 items-center gap-2">
              <span className="col-span-4 font-mono text-xs font-bold text-zinc-800">
                JButton:
              </span>
              <div className="col-span-8 flex justify-start">
                <button
                  onClick={() =>
                    triggerEvent({
                      name: 'ActionEvent',
                      source: 'JButton[text="Kirim Data", id="btnKirim"]',
                      trigger: 'Penekanan Tombol (Mouse Click / Enter)',
                      id: 'ACTION_PERFORMED (1001)',
                      data: 'command="KIRIM", modifiers=0',
                    })
                  }
                  className="px-4 py-1.5 rounded-[3px] bg-gradient-to-b from-[#FFFFFF] via-[#F2F2F2] to-[#DCDCDC] hover:from-[#FFFFFF] hover:to-[#EAEAEA] active:from-[#CECECE] active:to-[#E0E0E0] border border-[#7A7A7A] text-zinc-900 font-sans text-xs font-medium shadow-[inset_0_1px_0_white,0_1px_2px_rgba(0,0,0,0.15)] cursor-pointer active:shadow-inner"
                >
                  Kirim Data
                </button>
              </div>
            </div>

            {/* 2. JTextField */}
            <div className="grid grid-cols-12 items-center gap-2">
              <span className="col-span-4 font-mono text-xs font-bold text-zinc-800">
                JTextField:
              </span>
              <div className="col-span-8">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    triggerEvent({
                      name: 'KeyEvent',
                      source: 'JTextField[name="inputField"]',
                      trigger: `Karakter: "${e.target.value.slice(-1) || 'Backspace'}"`,
                      id: 'KEY_TYPED (400)',
                      data: `char="${e.target.value.slice(-1) || ''}", text="${e.target.value}"`,
                    });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      triggerEvent({
                        name: 'ActionEvent',
                        source: 'JTextField[name="inputField"]',
                        trigger: 'Tombol Enter Ditekan',
                        id: 'ACTION_PERFORMED (1001)',
                        data: `command="${inputText}", modifiers=0`,
                      });
                    }
                  }}
                  placeholder="Ketik & tekan Enter..."
                  className="w-full px-2.5 py-1.5 text-xs bg-white text-zinc-900 font-sans border border-zinc-400 rounded-[2px] outline-none shadow-inner focus:border-zinc-700"
                />
              </div>
            </div>

            {/* 3. JCheckBox */}
            <div className="grid grid-cols-12 items-center gap-2">
              <span className="col-span-4 font-mono text-xs font-bold text-zinc-800">
                JCheckBox:
              </span>
              <div className="col-span-8">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checkboxChecked}
                    onChange={(e) => {
                      const next = e.target.checked;
                      setCheckboxChecked(next);
                      triggerEvent({
                        name: 'ItemEvent',
                        source: 'JCheckBox[text="Persetujuan"]',
                        trigger: next ? 'Centang Aktif (SELECTED)' : 'Centang Dilepas (DESELECTED)',
                        id: 'ITEM_STATE_CHANGED (701)',
                        data: `stateChange=${next ? '1 (SELECTED)' : '2 (DESELECTED)'}`,
                      });
                    }}
                    className="w-4 h-4 rounded-[2px] border border-zinc-500 bg-white text-zinc-900 accent-[#204A87] cursor-pointer"
                  />
                  <span className="text-xs text-zinc-900 font-sans">Setujui persyaratan</span>
                </label>
              </div>
            </div>

            {/* 4. JPanel Mouse Hover Target */}
            <div className="grid grid-cols-12 items-center gap-2">
              <span className="col-span-4 font-mono text-xs font-bold text-zinc-800">
                JPanel:
              </span>
              <div className="col-span-8">
                <div
                  onMouseEnter={() =>
                    triggerEvent({
                      name: 'MouseEvent',
                      source: 'JPanel[id="hoverTarget"]',
                      trigger: 'Kursor Masuk ke Panel',
                      id: 'MOUSE_ENTERED (504)',
                      data: 'button=NOBUTTON, clickCount=0',
                    })
                  }
                  className="w-full p-2 bg-white border border-[#9A9A9A] rounded-[2px] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.08)] flex items-center justify-between cursor-crosshair hover:bg-zinc-50 transition-colors"
                >
                  <span className="text-xs font-sans text-zinc-700">Area Panel Target</span>
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-[2px] bg-[#ECE9D8] border border-zinc-400 text-zinc-700 font-medium shadow-2xs">
                    Hover di sini
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Inspektor Objek Event (Realtime Java Object Inspector) */}
        <div className="lg:col-span-6 bg-white text-zinc-900 rounded-lg border-2 border-zinc-300 p-5 shadow-md flex flex-col justify-between h-[360px] overflow-hidden">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5 mb-3 shrink-0">
              <span className="font-mono text-xs font-bold text-zinc-800 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600" />
                Objek Event yang Dihasilkan JVM
              </span>
              <span
                className={`text-[11px] font-mono px-2.5 py-0.5 rounded font-bold transition-colors duration-200 ${
                  pulse
                    ? 'bg-emerald-600 text-white border border-emerald-600 shadow-2xs'
                    : 'bg-zinc-100 text-zinc-600 border border-zinc-300'
                }`}
              >
                {pulse ? 'EVENT DISPATCHED!' : 'Status: Siap'}
              </span>
            </div>

            {/* Event Header Banner */}
            <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200 mb-2.5 flex items-center justify-between shadow-2xs shrink-0">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 block uppercase tracking-wider">
                  Class Induk: java.awt.AWTEvent
                </span>
                <span className="text-base font-mono font-extrabold text-emerald-700">
                  {lastEvent.name}
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded border border-emerald-300 shadow-2xs">
                {lastEvent.id}
              </span>
            </div>

            {/* Event Properties Inspector with Fixed Row Heights */}
            <div className="space-y-2 font-mono text-xs">
              <div className="h-8 px-2.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-3 shadow-2xs">
                <span className="text-zinc-600 font-bold text-xs shrink-0">
                  getSource():
                </span>
                <span className="text-zinc-900 font-bold text-right text-xs truncate max-w-[220px] bg-white px-2 py-0.5 rounded border border-zinc-300 shadow-2xs">
                  {lastEvent.source}
                </span>
              </div>

              <div className="h-8 px-2.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-3 shadow-2xs">
                <span className="text-zinc-600 font-bold text-xs shrink-0">
                  Pemicu Aksi:
                </span>
                <span className="text-zinc-900 font-bold text-right text-xs truncate max-w-[220px] bg-white px-2 py-0.5 rounded border border-zinc-300 shadow-2xs">
                  {lastEvent.trigger}
                </span>
              </div>

              <div className="h-8 px-2.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-3 shadow-2xs">
                <span className="text-zinc-600 font-bold text-xs shrink-0">
                  Waktu Terjadi:
                </span>
                <span className="text-emerald-700 font-bold text-right text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 shadow-2xs">
                  {lastEvent.timestamp}
                </span>
              </div>

              <div className="h-8 px-2.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-3 shadow-2xs">
                <span className="text-zinc-600 font-bold text-xs shrink-0">
                  Muatan Data:
                </span>
                <span className="text-zinc-900 font-bold text-right text-xs truncate max-w-[220px] bg-white px-2 py-0.5 rounded border border-zinc-300 shadow-2xs">
                  {lastEvent.data}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-zinc-200 text-xs font-mono text-zinc-500 flex items-center justify-between shrink-0">
            <span>Paket data ini siap diteruskan ke Listener</span>
          </div>
        </div>
      </div>

      {/* Bottom Key Insights: 3 Sifat Hakiki Event (Hanya Judul) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center gap-2.5 shadow-2xs">
          <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-zinc-800 font-sans">
            Membawa Data Lengkap
          </span>
        </div>

        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center gap-2.5 shadow-2xs">
          <Terminal className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-zinc-800 font-sans">
            Hanya Objek Pasif
          </span>
        </div>

        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center gap-2.5 shadow-2xs">
          <Radio className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-zinc-800 font-sans">
            Dibuat Otomatis Sistem
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE: PENGENALAN LISTENER DI JAVA SWING
   ========================================================= */
export function ListenerIntroSlide() {
  const [hasListener, setHasListener] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [lastActionResult, setLastActionResult] = useState('Belum ada aksi');
  const [isSimulating, setIsSimulating] = useState(false);

  // Sintesis Efek Suara (Web Audio API)
  const playSoundEffect = (targetActive) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (targetActive) {
        // Melodi chime dua nada gelombang suara (seperti notifikasi audio / speaker)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.1); // G5
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else {
        // Suara bisu / thud rendah tumpul (hilang tanpa penerima)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      }
    } catch {
      // Audio fallback jika browser memblokir audio context otomatis
    }
  };

  const handleTestClick = () => {
    setIsSimulating(true);
    setClickCount((c) => c + 1);
    playSoundEffect(hasListener);

    if (hasListener) {
      setLastActionResult(
        'Efek Suara Event ditangkap oleh ActionListener -> Method actionPerformed() otomatis dieksekusi!'
      );
    } else {
      setLastActionResult(
        'Tombol membunyikan Event, tapi tidak ada Listener yang mendengarkan (Event lenyap).'
      );
    }

    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-4 border-b border-zinc-200 pb-3">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-zinc-900 tracking-tight">
          Pengenalan Listener
        </h2>
        <p className="text-xs lg:text-sm text-zinc-600 mt-0.5">
          Antarmuka (interface) penerima yang bertugas mendengarkan Event dan mengeksekusi blok kode penangan.
        </p>
      </div>

      {/* Main Grid: Visual Wire/Connection Simulator (Left) & Java Code Architecture (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-4">
        {/* Kolom Kiri: Simulasi Suara Event -> Listener */}
        <div className="lg:col-span-6 bg-white border-2 border-zinc-300 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            {/* Toggle Status Sambungan Pendengar */}
            <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-bold text-zinc-800 block">Status Registrasi Listener:</span>
                <span className="text-[11px] text-zinc-500">
                  {hasListener ? 'tombol.addActionListener(...) aktif' : 'Tanpa listener terdaftar (Telinga Pasif)'}
                </span>
              </div>
              <button
                onClick={() => setHasListener(!hasListener)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  hasListener
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-zinc-200 text-zinc-700 border-zinc-300 hover:bg-zinc-300'
                }`}
              >
                {hasListener ? (
                  <>
                    <Headphones className="w-3.5 h-3.5" />
                    Terhubung
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    Terputus
                  </>
                )}
              </button>
            </div>

            {/* Visual Circuit: Pemancar Suara -> Gelombang Audio -> Pendengar */}
            <div className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 space-y-3">
              <div className="flex items-center justify-between gap-2">
                {/* Node 1: Komponen Tombol (Pemancar Suara) */}
                <div
                  className={`p-2.5 rounded-lg border text-center shrink-0 w-28 shadow-2xs transition-all ${
                    isSimulating
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                      : 'bg-white border-zinc-300'
                  }`}
                >
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block font-bold flex items-center justify-center gap-1">
                    <Volume2 className={`w-3 h-3 ${isSimulating ? 'text-emerald-600' : 'text-zinc-400'}`} />
                    1. Pemancar
                  </span>
                  <span className="text-xs font-bold text-zinc-800">JButton</span>
                </div>

                {/* Gelombang Suara (Audio Wave / Pulse Transmission) */}
                <div className="flex-1 flex flex-col items-center justify-center px-2 relative">
                  {/* Animasi Gelombang Suara */}
                  <div className="h-6 flex items-center justify-center gap-1 w-full overflow-hidden">
                    {isSimulating ? (
                      hasListener ? (
                        <div className="flex items-center gap-1">
                          <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                          <span className="w-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s] h-5" />
                          <span className="w-1.5 bg-emerald-600 rounded-full animate-bounce h-6" />
                          <span className="w-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.1s] h-5" />
                          <span className="w-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s] h-3" />
                          <span className="text-[10px] font-mono font-bold text-emerald-700 ml-1 flex items-center gap-1">
                            ~ ~ <Volume2 className="w-3.5 h-3.5 text-emerald-600 inline" /> ~ ~
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 opacity-70">
                          <span className="w-1 bg-zinc-400 rounded-full h-3" />
                          <span className="w-1 bg-zinc-400 rounded-full h-4" />
                          <span className="text-[10px] font-mono text-zinc-500 px-1 flex items-center gap-1">
                            Suara Lenyap <X className="w-3 h-3 text-zinc-500 inline" />
                          </span>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center gap-1.5 opacity-40">
                        <Waves className={`w-4 h-4 ${hasListener ? 'text-emerald-600' : 'text-zinc-400'}`} />
                        <div
                          className={`w-16 h-0.5 rounded ${
                            hasListener ? 'bg-emerald-500' : 'border-t border-dashed border-zinc-400'
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  <span
                    className={`text-[10px] font-mono mt-0.5 ${
                      hasListener ? 'text-emerald-700 font-bold' : 'text-zinc-400'
                    }`}
                  >
                    {hasListener ? 'addActionListener' : 'Kabel Terputus'}
                  </span>
                </div>

                {/* Node 2: Listener Handler (Pendengar / Telinga) */}
                <div
                  className={`p-2.5 rounded-lg border text-center shrink-0 w-32 shadow-2xs transition-all ${
                    hasListener
                      ? isSimulating
                        ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-400'
                        : 'bg-white border-emerald-400'
                      : 'bg-zinc-100 border-zinc-300 opacity-60'
                  }`}
                >
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block font-bold flex items-center justify-center gap-1">
                    <Headphones className={`w-3 h-3 ${hasListener ? 'text-emerald-600' : 'text-zinc-400'}`} />
                    2. Pendengar
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      hasListener ? 'text-emerald-800' : 'text-zinc-500'
                    }`}
                  >
                    ActionListener
                  </span>
                </div>
              </div>

              {/* Uji Tombol Interaktif */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleTestClick}
                  className="px-4 py-2 rounded-lg bg-zinc-900 text-white font-sans text-xs font-semibold hover:bg-zinc-800 active:scale-95 transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isSimulating ? 'text-emerald-400' : ''}`} />
                  Luncurkan Suara Event
                </button>
                <span className="font-mono text-xs text-zinc-500">
                  Total Suara: <strong className="text-zinc-900">{clickCount}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Feedback Hasil Sambungan */}
          <div
            className={`p-3 rounded-lg border text-xs flex items-center gap-2.5 transition-all ${
              hasListener
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/70 border-amber-200 text-amber-900'
            }`}
          >
            {hasListener ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span className="font-sans leading-snug">{lastActionResult}</span>
          </div>
        </div>

        {/* Kolom Kanan: Anatomi Kode Java Pendaftaran Listener */}
        <div className="lg:col-span-6 bg-zinc-900 text-white rounded-xl p-5 shadow-md border-2 border-zinc-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-700 pb-3 mb-4">
              <span className="font-mono text-xs font-bold text-zinc-100 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                Registrasi Listener (Java)
              </span>
              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950 border border-emerald-600 px-2.5 py-0.5 rounded">
                Observer Pattern
              </span>
            </div>

            {/* Kode Java Super Bersih & Fokus */}
            <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-3 leading-relaxed shadow-xs">
              <div className="text-zinc-100">
                <span className="text-purple-300 font-bold">JButton</span> tombol ={' '}
                <span className="text-purple-300 font-bold">new</span>{' '}
                <span className="text-emerald-400 font-bold">JButton</span>(
                <span className="text-amber-300 font-semibold">&quot;Lihat ringkasan&quot;</span>);
              </div>

              <div className="text-zinc-100">
                tombol.<span className="text-emerald-300 font-extrabold">addActionListener</span>(
                <span className="text-emerald-400 font-bold">event</span> -&gt; &#123;
              </div>

              <div className="pl-5 text-emerald-300 font-extrabold">
                tampilkanRingkasan();
              </div>

              <div className="text-zinc-100 font-bold">&#125;);</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Key Insights: 2 Fondasi Utama Listener (Hanya Judul) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center gap-2.5 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-zinc-800 font-sans">
            Pemisahan Tanggung Jawab (Separation of Concerns)
          </span>
        </div>

        <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center gap-2.5 shadow-2xs">
          <Radio className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-zinc-800 font-sans">
            Satu Komponen, Banyak Kemungkinan Listener
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE: CARA KERJA ANTARMUKA GRAFIS (URUTAN ALUR)
   ========================================================= */
export function GuiEventConceptSlide() {
  const steps = [
    {
      num: '01',
      title: 'Picu Kejadian',
      actor: 'Pengguna / Komponen',
      icon: Zap,
      action: 'Aksi fisik (klik tombol / tekan enter) membangkitkan objek Event.',
      javaRef: 'JButton • ActionEvent',
      color: {
        border: 'border-emerald-300 hover:border-emerald-500',
        bg: 'bg-emerald-50/70 hover:bg-emerald-50',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        numBg: 'bg-emerald-600 text-white shadow-sm',
        iconBg: 'bg-emerald-600 text-white shadow-xs',
        tagBg: 'bg-white text-emerald-800 border-emerald-200',
        arrowColor: 'text-emerald-600',
      },
    },
    {
      num: '02',
      title: 'Baca & Validasi',
      actor: 'Event Listener',
      icon: Terminal,
      action: 'Listener membaca nilai masukan dan menguji aturan data form.',
      javaRef: 'getText() • Validasi',
      color: {
        border: 'border-amber-300 hover:border-amber-500',
        bg: 'bg-amber-50/70 hover:bg-amber-50',
        badge: 'bg-amber-100 text-amber-800 border-amber-200',
        numBg: 'bg-amber-600 text-white shadow-sm',
        iconBg: 'bg-amber-600 text-white shadow-xs',
        tagBg: 'bg-white text-amber-800 border-amber-200',
        arrowColor: 'text-amber-600',
      },
    },
    {
      num: '03',
      title: 'Jalankan Tindakan',
      actor: 'Logika Aplikasi',
      icon: Code2,
      action: 'Mengeksekusi proses bisnis di memori jika seluruh data dinyatakan sah.',
      javaRef: 'Logika Bisnis',
      color: {
        border: 'border-indigo-300 hover:border-indigo-500',
        bg: 'bg-indigo-50/70 hover:bg-indigo-50',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        numBg: 'bg-indigo-600 text-white shadow-sm',
        iconBg: 'bg-indigo-600 text-white shadow-xs',
        tagBg: 'bg-white text-indigo-800 border-indigo-200',
        arrowColor: 'text-indigo-600',
      },
    },
    {
      num: '04',
      title: 'Umpan Balik',
      actor: 'Antarmuka Grafis',
      icon: Activity,
      action: 'Menampilkan panel ringkasan atau pesan koreksi kesalahan kepada pengguna.',
      javaRef: 'CardLayout • JLabel',
      color: {
        border: 'border-rose-300 hover:border-rose-500',
        bg: 'bg-rose-50/70 hover:bg-rose-50',
        badge: 'bg-rose-100 text-rose-800 border-rose-200',
        numBg: 'bg-rose-600 text-white shadow-sm',
        iconBg: 'bg-rose-600 text-white shadow-xs',
        tagBg: 'bg-white text-rose-800 border-rose-200',
        arrowColor: 'text-rose-600',
      },
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Title */}
      <div className="mb-8 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Cara Kerja Antarmuka Grafis
        </h2>
      </div>

      {/* 4 Urutan Steps Timeline (Bersih, Rapi & Tidak Padat Teks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className={`p-6 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md ${s.color.border} ${s.color.bg}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${s.color.badge}`}>
                    {s.actor}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm shadow-xs ${s.color.numBg}`}>
                    {s.num}
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${s.color.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-zinc-900 text-base leading-tight">
                    {s.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-700 leading-relaxed font-normal min-h-[48px]">
                  {s.action}
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-200/80 space-y-2">
                <div className="text-xs font-mono text-zinc-500 flex items-center justify-between">
                  <span>Urutan #{idx + 1}</span>
                  {idx < 3 ? (
                    <ArrowRight className={`w-3.5 h-3.5 ${s.color.arrowColor}`} />
                  ) : (
                    <span className="text-emerald-700 font-extrabold font-sans text-xs">Selesai</span>
                  )}
                </div>
                <div className={`font-mono text-xs px-2.5 py-1 rounded-md border truncate font-medium text-center ${s.color.tagBg}`}>
                  {s.javaRef}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE: RAGAM EVENT DI JAVA SWING
   ========================================================= */
export function EventDeepDiveSlide() {
  const [selectedKey, setSelectedKey] = useState('action');

  const eventTypes = {
    action: {
      name: 'ActionEvent',
      badge: 'Fokus Modul 09',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      source: 'JButton, JTextField',
      listener: 'ActionListener',
      trigger: 'Klik tombol mouse atau tekan Enter di input field.',
      insight: 'Event utama di Java Swing. Runtime Swing membangkitkan objek ini saat pengguna berinteraksi aktif dengan kontrol tombol.',
      filename: 'ContohActionListener.java',
      code: `// 1. Mendaftarkan aksi saat tombol ditekan
tombolTinjau.addActionListener(event -> {
    tampilkanRingkasan();
});

// 2. Aksi saat menekan Enter di input nama
inputNama.addActionListener(event -> {
    inputStok.requestFocusInWindow();
});`,
    },
    item: {
      name: 'ItemEvent',
      badge: 'Pilihan Status',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
      source: 'JCheckBox, JComboBox',
      listener: 'ItemListener',
      trigger: 'Perubahan status centang atau pemilihan opsi dropdown.',
      insight: 'Berguna saat UI harus bereaksi instan terhadap pilihan, seperti mengaktifkan tombol simpan hanya jika syarat disetujui.',
      filename: 'ContohItemListener.java',
      code: `// Deteksi perubahan centang pada checkbox
checkSetuju.addItemListener(event -> {
    boolean aktif = (event.getStateChange() == ItemEvent.SELECTED);
    tombolSimpan.setEnabled(aktif);
});`,
    },
    document: {
      name: 'DocumentEvent',
      badge: 'Perubahan Teks',
      badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
      source: 'JTextField (via getDocument())',
      listener: 'DocumentListener',
      trigger: 'Karakter diketik, dihapus, atau ditempel secara realtime.',
      insight: 'Sangat ideal untuk validasi instan sebelum form disubmit, atau fitur pencarian langsung (live search).',
      filename: 'ContohDocumentListener.java',
      code: `// Pantau setiap ketikan teks secara langsung
inputField.getDocument().addDocumentListener(new DocumentListener() {
    public void insertUpdate(DocumentEvent e) { validasiLangsung(); }
    public void removeUpdate(DocumentEvent e) { validasiLangsung(); }
    public void changedUpdate(DocumentEvent e) { validasiLangsung(); }
});`,
    },
    mouse: {
      name: 'MouseEvent',
      badge: 'Interaksi Kursor',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      source: 'JPanel, JLabel, JButton',
      listener: 'MouseListener / MouseAdapter',
      trigger: 'Kursor mouse masuk (hover in), keluar (hover out), atau diklik.',
      insight: 'Cocok untuk feedback visual mikro antarmuka, seperti efek highlight warna ketika kursor diarahkan ke panel.',
      filename: 'ContohMouseAdapter.java',
      code: `// Berikan efek hover saat kursor masuk ke area panel
panelKartu.addMouseListener(new MouseAdapter() {
    @Override
    public void mouseEntered(MouseEvent e) {
        panelKartu.setBackground(new Color(240, 245, 255));
    }
});`,
    },
  };

  const tabs = [
    { key: 'action', label: '1. ActionEvent' },
    { key: 'item', label: '2. ItemEvent' },
    { key: 'document', label: '3. DocumentEvent' },
    { key: 'mouse', label: '4. MouseEvent' },
  ];

  const current = eventTypes[selectedKey];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Header Slide */}
      <div className="mb-6 border-b border-zinc-200 pb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Ragam Event di Java Swing
          </h2>
          <p className="text-sm text-zinc-600 mt-1">
            Setiap aksi pengguna menghasilkan tipe Event spesifik dan membutuhkan Listener yang sesuai.
          </p>
        </div>

        {/* Tab Pilihan Event yang Elegan & Human */}
        <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedKey(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedKey === tab.key
                  ? 'bg-white text-zinc-900 font-bold shadow-xs border border-zinc-200/80'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Spesifikasi Bersih (Kiri) & Kode Java (Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Kolom Kiri: Spesifikasi Ringkas & Lapang */}
        <div className="lg:col-span-5 bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
              <div>
                <h3 className="text-xl font-extrabold text-zinc-900">
                  {current.name}
                </h3>
              </div>
              <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md border ${current.badgeClass}`}>
                {current.badge}
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-start justify-between gap-3 py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500 font-medium shrink-0">Komponen Sumber</span>
                <span className="font-mono font-bold text-zinc-900 text-right">{current.source}</span>
              </div>

              <div className="flex items-start justify-between gap-3 py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500 font-medium shrink-0">Interface Listener</span>
                <span className="font-mono font-bold text-emerald-700 text-right">{current.listener}</span>
              </div>

              <div className="flex items-start justify-between gap-3 py-1.5 border-b border-zinc-100">
                <span className="text-zinc-500 font-medium shrink-0">Pemicu Utama</span>
                <span className="text-zinc-800 font-medium text-right leading-snug">{current.trigger}</span>
              </div>
            </div>

            <div className="pt-1">
              <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                {current.insight}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center gap-2 text-xs text-zinc-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>Paket Java: java.awt.event.*</span>
          </div>
        </div>

        {/* Kolom Kanan: Contoh Kode Java Singkat & Jelas */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <CodeBlock
            code={current.code}
            filename={current.filename}
            label={current.name}
            tone="java"
            maxHeight="max-h-[380px]"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 8: EKSPRESI LAMBDA
   ========================================================= */
export function ActionListenerLambdaSlide() {
  const [mode, setMode] = useState('lambda');

  const lambdaCode = `// 1. Bentuk Lambda (Modern, Ringkas di Java 8+)
lihatButton.addActionListener(event -> {
    tampilkanRingkasan();
});

// Bentuk Satu Baris (Single Expression)
kembaliButton.addActionListener(e -> navigasi.show(kartu, "FORM"));`;

  const classicCode = `// 2. Bentuk Klasik / Bukan Lambda (Anonymous Inner Class)
lihatButton.addActionListener(new ActionListener() {
    @Override
    public void actionPerformed(ActionEvent event) {
        tampilkanRingkasan();
    }
});`;

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-6 border-b border-zinc-200 pb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Ekspresi Lambda
          </h2>
          <p className="text-sm text-zinc-600 mt-1">
            Penulisan kode aksi event yang ringkas dan modern di Java Swing (Java 8+).
          </p>
        </div>

        {/* Segmented Toggle: Lambda vs Bukan Lambda */}
        <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200 gap-1 font-mono text-xs">
          <button
            onClick={() => setMode('lambda')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'lambda'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
            }`}
          >
            Ekspresi Lambda (Java 8+)
          </button>
          <button
            onClick={() => setMode('classic')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              mode === 'classic'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
            }`}
          >
            Bukan Lambda (Anonymous Class)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7">
          <CodeBlock
            code={mode === 'lambda' ? lambdaCode : classicCode}
            filename="RegistrasiListener.java"
            label={mode === 'lambda' ? 'Sintaks Ekspresi Lambda (Modern)' : 'Bukan Lambda (Anonymous Inner Class)'}
            tone="java"
            maxHeight="max-h-[380px]"
          />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-2">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              Mengapa Bisa Menggunakan Lambda?
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Karena <code className="font-mono bg-zinc-100 px-1 rounded text-zinc-800">ActionListener</code> adalah <strong>Functional Interface</strong> (hanya memiliki <em>satu</em> method abstrak: <code className="font-mono bg-zinc-100 px-1 rounded text-zinc-800">actionPerformed(ActionEvent event)</code>).
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-2">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              {mode === 'lambda' ? 'Keuntungan Lambda:' : 'Kekurangan Tanpa Lambda:'}
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {mode === 'lambda'
                ? 'Menghilangkan kode boilerplate class anonim 6 baris menjadi satu baris ekspresi yang langsung tertuju pada aksi logika.'
                : 'Memerlukan deklarasi class anonim yang panjang dan bertele-tele (new ActionListener() { ... }), sehingga kode cepat menumpuk.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 9: PRINSIP ARSITEKTUR LISTENER (VISUALISASI JEMBATAN)
   ========================================================= */
export function ListenerArchitectureSlide() {
  const [activeStep, setActiveStep] = useState(0); // 0: idle, 1: UI, 2: Bridge, 3: Business Logic
  const [isAnimating, setIsAnimating] = useState(false);

  const runBridgeSimulation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveStep(1); // Step 1: UI click

    setTimeout(() => {
      setActiveStep(2); // Step 2: Crossing bridge
    }, 750);

    setTimeout(() => {
      setActiveStep(3); // Step 3: Business logic execution
    }, 1500);

    setTimeout(() => {
      setIsAnimating(false);
    }, 2400);
  };

  const resetSimulation = () => {
    if (isAnimating) return;
    setActiveStep(0);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 border-b border-zinc-200 pb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Prinsip Arsitektur: Listener sebagai Jembatan
          </h2>
          <p className="text-sm text-zinc-600 mt-1">
            Listener memisahkan tampilan pengguna dengan logika program agar kode tidak tercampur aduk.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={runBridgeSimulation}
            disabled={isAnimating}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-sans text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-2"
          >
            <Play className={`w-3.5 h-3.5 fill-white ${isAnimating ? 'animate-spin' : ''}`} />
            {isAnimating ? 'Menyeberangi Jembatan...' : 'Uji Alur Jembatan'}
          </button>

          {activeStep > 0 && !isAnimating && (
            <button
              onClick={resetSimulation}
              className="p-2 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-xl transition-colors cursor-pointer"
              title="Reset simulasi"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3-Pillar Visual Bridge Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch mb-5">
        {/* Pilar 1: Lapisan Tampilan (UI) */}
        <div
          className={`lg:col-span-4 p-5 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-4 shadow-sm ${
            activeStep === 1
              ? 'bg-emerald-50/70 border-emerald-500 ring-4 ring-emerald-200 shadow-md scale-[1.02]'
              : 'bg-white border-zinc-200'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-700 bg-zinc-100 px-2.5 py-0.5 rounded-md">
                1. Lapisan UI
              </span>
              <span className="text-[10px] font-mono text-zinc-400">Event Source</span>
            </div>

            <h3 className="font-extrabold text-zinc-900 text-lg">Komponen Swing</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Bertugas menyajikan form dan menangkap interaksi fisik pengguna di layar.
            </p>
          </div>

          {/* Visual Component Mock */}
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>JButton (&quot;Tinjau&quot;)</span>
              {activeStep === 1 && (
                <span className="text-emerald-700 font-bold animate-pulse">Klik Fisik!</span>
              )}
            </div>
            <div
              className={`py-2 px-3 rounded-lg text-center text-xs font-bold transition-all border ${
                activeStep === 1
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-zinc-800 border-zinc-300'
              }`}
            >
              {activeStep === 1 ? 'Memicu ActionEvent' : 'Tombol Siap Diklik'}
            </div>
          </div>
        </div>

        {/* Pilar 2: Jembatan Penghubung (Listener) */}
        <div
          className={`lg:col-span-4 p-5 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-4 shadow-sm relative ${
            activeStep === 2
              ? 'bg-emerald-100/70 border-emerald-600 ring-4 ring-emerald-300 shadow-lg scale-[1.03]'
              : 'bg-emerald-50/40 border-emerald-300'
          }`}
        >
          {/* Bridge Top Arch / Badge */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                <Workflow className="w-3.5 h-3.5 text-emerald-700" />
                2. Jembatan (Bridge)
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700">ActionListener</span>
            </div>

            <h3 className="font-extrabold text-zinc-900 text-lg">Penghubung Netral</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Menerima objek event dari tombol dan menyeberangkannya ke method logika bisnis.
            </p>
          </div>

          {/* Visual Bridge Cable Flow */}
          <div className="p-3 bg-white/90 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-zinc-500">Aliran Sinyal</span>
              <span className="text-emerald-700 font-bold">
                {activeStep === 2 ? 'Sedang Menyeberang >>>' : 'Kabel Terhubung'}
              </span>
            </div>

            <div className="flex items-center gap-1 py-1">
              <div
                className={`w-3 h-3 rounded-full shrink-0 transition-colors ${
                  activeStep >= 1 ? 'bg-emerald-500 shadow-xs' : 'bg-zinc-300'
                }`}
              />
              <div className="h-1.5 flex-1 bg-zinc-200 rounded-full overflow-hidden relative">
                {activeStep === 2 && (
                  <div className="h-full bg-emerald-500 animate-[pulse_0.8s_ease-in-out_infinite] w-full rounded-full" />
                )}
                {activeStep > 2 && <div className="h-full bg-emerald-500 w-full rounded-full" />}
              </div>
              <div
                className={`w-3 h-3 rounded-full shrink-0 transition-colors ${
                  activeStep >= 2 ? 'bg-emerald-500 shadow-xs' : 'bg-zinc-300'
                }`}
              />
              <div className="h-1.5 flex-1 bg-zinc-200 rounded-full overflow-hidden relative">
                {activeStep === 2 && (
                  <div className="h-full bg-emerald-500 animate-[pulse_0.8s_ease-in-out_infinite] w-full rounded-full" />
                )}
                {activeStep >= 3 && <div className="h-full bg-emerald-500 w-full rounded-full" />}
              </div>
              <div
                className={`w-3 h-3 rounded-full shrink-0 transition-colors ${
                  activeStep >= 3 ? 'bg-emerald-500 shadow-xs' : 'bg-zinc-300'
                }`}
              />
            </div>

            <div className="text-[10px] font-mono text-center text-emerald-800 font-medium">
              event -&gt; tampilkanRingkasan()
            </div>
          </div>
        </div>

        {/* Pilar 3: Lapisan Logika & Model (Bisnis) */}
        <div
          className={`lg:col-span-4 p-5 rounded-2xl border-2 transition-all flex flex-col justify-between space-y-4 shadow-sm ${
            activeStep === 3
              ? 'bg-emerald-50/70 border-emerald-500 ring-4 ring-emerald-200 shadow-md scale-[1.02]'
              : 'bg-white border-zinc-200'
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-zinc-700 bg-zinc-100 px-2.5 py-0.5 rounded-md">
                3. Lapisan Bisnis
              </span>
              <span className="text-[10px] font-mono text-zinc-400">Aturan Aplikasi</span>
            </div>

            <h3 className="font-extrabold text-zinc-900 text-lg">Model &amp; Validasi</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Mengeksekusi aturan data, validasi, dan manipulasi state secara mandiri.
            </p>
          </div>

          {/* Visual Execution Mock */}
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>Method Bisnis</span>
              {activeStep === 3 && (
                <span className="text-emerald-700 font-bold animate-pulse">Sukses Diproses!</span>
              )}
            </div>
            <div
              className={`py-2 px-3 rounded-lg text-center text-xs font-mono font-bold transition-all border ${
                activeStep === 3
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-zinc-800 border-zinc-300'
              }`}
            >
              tampilkanRingkasan();
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

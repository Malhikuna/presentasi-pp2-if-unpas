import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  AlertTriangle,
  Coffee,
  Minus,
  Square,
  X,
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import memeConfused1 from '../assets/meme-confused-1.jpeg';
import memeConfused2 from '../assets/meme-confused-2.webp';
import memeCorrect from '../assets/meme-correct.jpg';

// Preload all meme images immediately so they are cached in memory
if (typeof window !== 'undefined') {
  [memeConfused1, memeConfused2, memeCorrect].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

/* =========================================================
   SLIDE 10: 4 TAHAPAN PENANGANAN TINDAKAN
   ========================================================= */
export function FourStagesPipelineSlide() {
  const stages = [
    {
      num: '01',
      title: '1. Pembacaan Input',
      code: 'String nama = namaField.getText().trim();',
    },
    {
      num: '02',
      title: '2. Validasi & Konversi',
      code: 'int stok = Integer.parseInt(teksStok);',
    },
    {
      num: '03',
      title: '3. Eksekusi Tindakan',
      code: 'tampilkanRingkasan();',
    },
    {
      num: '04',
      title: '4. Umpan Balik UI',
      code: 'navigasi.show(kartu, "RINGKASAN");',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          4 Tahapan Penanganan Tindakan
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Alur kerja berurutan di dalam listener saat merespons aksi pengguna pada form GUI:
        </p>
      </div>

      {/* 4 Cards Grid - Bersih, Elegan & Nyaman Dilihat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
        {stages.map((st) => (
          <div
            key={st.num}
            className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:border-emerald-500 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-zinc-900 text-lg group-hover:text-emerald-700 transition-colors">
                {st.title}
              </h3>
              <span className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center font-mono font-bold text-xs shadow-2xs">
                {st.num}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-emerald-300 shadow-inner flex items-center overflow-x-auto">
              <code>{st.code}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 11: PRINSIP UX SAAT VALIDASI GAGAL (SIMULASI BENAR VS SALAH)
   ========================================================= */
export function ValidationFailureUxSlide() {
  const [mode, setMode] = useState('good'); // 'good' | 'bad'
  const [nama, setNama] = useState('Buku Tulis Sinar Dunia');
  const [stok, setStok] = useState('-5');
  const [pesanError, setPesanError] = useState('');
  const [statusText, setStatusText] = useState('');
  const stokInputRef = useRef(null);

  const helperCode = `// Helper Penanganan Validasi Gagal (Best Practice)
private void tampilkanKesalahan(String pesan, JTextField field) {
    // 1. Berikan pesan perbaikan yang spesifik pada label
    pesanLabel.setText(pesan);

    // 2. Arahkan kursor fokus langsung ke field bermasalah
    field.requestFocusInWindow();

    // 3. Blok/seleksi isi teks agar praktis diketik ulang
    field.selectAll();

    // PENTING: JANGAN memanggil namaField.setText("")!
    // Pertahankan isian yang benar agar pengguna tidak frustrasi.
}`;

  const handleTestSubmit = () => {
    if (mode === 'good') {
      // Best Practice UX: Pertahankan input, fokus dan blok field salah
      setPesanError('Stok minimal 0 (tidak boleh negatif).');
      setStatusText('Input nama tetap aman. Kursor otomatis fokus & teks stok terblok!');
      setTimeout(() => {
        if (stokInputRef.current) {
          stokInputRef.current.focus();
          stokInputRef.current.select();
        }
      }, 50);
    } else {
      // Bad UX: Mengosongkan seluruh form (Anti-pattern)
      setNama('');
      setStok('');
      setPesanError('Error: Input salah! Seluruh form di-reset.');
      setStatusText('Buruk! Seluruh isian terhapus, pengguna harus ketik ulang semuanya.');
    }
  };

  const handleResetForm = () => {
    setNama('Buku Tulis Sinar Dunia');
    setStok('-5');
    setPesanError('');
    setStatusText('');
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-5 border-b border-zinc-200 pb-3">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Penanganan Saat Validasi Gagal
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Pertahankan teks yang sudah diketik dan arahkan kursor fokus langsung ke input yang bermasalah.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Kolom Kiri: Simulasi Interaktif Swing (Versi Benar vs Versi Salah) */}
        <div className="lg:col-span-6 bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            {/* Mode Switcher: Versi Benar vs Versi Salah */}
            <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200 gap-1 mb-3.5">
              <button
                onClick={() => {
                  setMode('good');
                  handleResetForm();
                }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'good'
                    ? 'bg-white text-emerald-700 shadow-xs border border-zinc-200'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Versi Benar (Best Practice)
              </button>

              <button
                onClick={() => {
                  setMode('bad');
                  handleResetForm();
                }}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  mode === 'bad'
                    ? 'bg-white text-red-700 shadow-xs border border-zinc-200'
                    : 'text-zinc-500 hover:text-zinc-800'
                }`}
              >
                <XCircle className="w-3.5 h-3.5 text-red-600" />
                Versi Salah (Bad UX)
              </button>
            </div>

            {/* Window Container (Swing Aesthetic) */}
            <div className="border border-zinc-300 rounded-xl overflow-hidden shadow-xs bg-[#f4f2eb]">
              {/* Window Title Bar */}
              <div className="bg-[#2a4d7d] text-white px-3 py-1.5 flex items-center justify-between text-xs font-mono select-none">
                <div className="flex items-center gap-2">
                  <Coffee className="w-3.5 h-3.5 text-amber-300" />
                  <span className="font-sans font-bold text-[11px]">
                    Demo Validasi Form ({mode === 'good' ? 'UX Benar' : 'UX Salah'})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 opacity-80">
                  <div className="w-3 h-3 bg-zinc-300/30 rounded flex items-center justify-center">
                    <Minus className="w-2 h-2 text-white" />
                  </div>
                  <div className="w-3 h-3 bg-zinc-300/30 rounded flex items-center justify-center">
                    <Square className="w-2 h-2 text-white" />
                  </div>
                  <div className="w-3 h-3 bg-red-500 rounded flex items-center justify-center">
                    <X className="w-2 h-2 text-white" />
                  </div>
                </div>
              </div>

              {/* Window Body Form */}
              <div className="p-4 space-y-3 font-sans text-xs">
                {/* Field 1: Nama Barang */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700">
                    Nama Barang:
                  </label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Nama barang..."
                    className="w-full px-2.5 py-1.5 bg-white border border-zinc-400 rounded text-xs text-zinc-800 font-mono shadow-inner outline-none focus:border-blue-500"
                  />
                </div>

                {/* Field 2: Stok Barang (Nilai Salah) */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700 flex justify-between">
                    <span>Stok Barang (Input Tidak Valid):</span>
                    <span className="text-red-600 font-mono text-[10px]">stok = -5 (salah)</span>
                  </label>
                  <input
                    ref={stokInputRef}
                    type="text"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    placeholder="0"
                    className="w-full px-2.5 py-1.5 bg-white border border-zinc-400 rounded text-xs text-zinc-800 font-mono shadow-inner outline-none focus:ring-2 focus:ring-blue-400 selection:bg-blue-600 selection:text-white"
                  />
                </div>

                {/* Tombol Uji Simpan */}
                <div className="pt-1 flex items-center gap-2">
                  <button
                    onClick={handleTestSubmit}
                    className="px-3.5 py-1.5 bg-[#e1dfd8] hover:bg-[#d5d2c8] active:bg-[#c9c5ba] border border-zinc-500 text-zinc-900 rounded font-sans text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    Uji Validasi Form
                  </button>

                  <button
                    onClick={handleResetForm}
                    className="px-2.5 py-1.5 text-zinc-600 hover:text-zinc-900 text-[11px] flex items-center gap-1 cursor-pointer"
                    title="Reset ke isian semula"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                {/* Label Pesan Error di Form */}
                <div className="min-h-[22px] pt-1">
                  {pesanError && (
                    <div className="text-[11px] font-mono text-red-600 font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{pesanError}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Hasil Validasi */}
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 transition-all ${
              mode === 'good'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            {mode === 'good' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span className="font-sans leading-snug">
              {statusText ||
                (mode === 'good'
                  ? 'Klik "Uji Validasi Form" untuk melihat perlakuan input yang benar.'
                  : 'Klik "Uji Validasi Form" untuk melihat dampak buruk mereset form.')}
            </span>
          </div>
        </div>

        {/* Kolom Kanan: Kode Java Helper Penanganan Kesalahan */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <CodeBlock
            code={helperCode}
            filename="DemoFormRingkasan.java"
            label="Helper Penanganan Kesalahan"
            tone="java"
            maxHeight="max-h-[380px]"
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 7: 3. MATRIKS VALIDASI KOSONG, FORMAT & RENTANG
   ========================================================= */
export function ValidationTypesMatrixSlide() {
  const rows = [
    {
      type: '1. Kosong (Empty / Blank)',
      problem: 'Nama hanya berisi spasi atau belum diisi sama sekali',
      techCheck: 'nama.trim().isEmpty() atau nama.isBlank()',
      message: '“Nama barang wajib diisi. Masukkan nama barang.”',
    },
    {
      type: '2. Format atau Representasi',
      problem: 'Stok berisi huruf ("abc"), pemisah ribuan ("1.000"), atau angka di luar rentang tipe int',
      techCheck: 'try { Integer.parseInt(teksStok) } catch (NumberFormatException e)',
      message: '“Stok harus bilangan bulat 0–100000. Contoh: 25.”',
    },
    {
      type: '3. Rentang Aplikasi (Range)',
      problem: 'Stok berupa angka bulat valid seperti -1 atau 100001 namun melanggar batas bisnis',
      techCheck: 'if (stok < 0 || stok > BATAS_STOK)',
      message: '“Stok harus antara 0 dan 100000. Perbaiki nilainya.”',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-6 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          3. Validasi Kosong, Format, dan Rentang
        </h2>
      </div>

      {/* Tabel Matriks Resmi Modul 09 */}
      <div className="bg-white border-2 border-zinc-300 rounded-xl overflow-hidden shadow-sm mb-4">
        <div className="grid grid-cols-12 bg-zinc-900 text-white p-3.5 font-mono text-xs font-bold uppercase">
          <div className="col-span-3">Pemeriksaan</div>
          <div className="col-span-4">Contoh Masalah</div>
          <div className="col-span-5">Contoh Pesan Perbaikan</div>
        </div>

        <div className="divide-y divide-zinc-200 text-xs">
          {rows.map((r, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 p-4 items-center gap-3 ${
                idx % 2 === 1 ? 'bg-zinc-50/80' : 'bg-white'
              }`}
            >
              <div className="col-span-3 space-y-1">
                <div className="font-bold text-emerald-700 text-sm">{r.type}</div>
                <code className="text-[10px] font-mono bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded block truncate">
                  {r.techCheck}
                </code>
              </div>

              <div className="col-span-4 text-zinc-700 leading-relaxed">
                {r.problem}
              </div>

              <div className="col-span-5">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 font-mono text-emerald-950 font-medium text-[11.5px]">
                  {r.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 bg-zinc-100 rounded-xl text-xs font-mono text-zinc-700">
        Urutan eksekusi: Periksa <strong>Kosong</strong> terlebih dahulu &rarr; lalu <strong>Format (parseInt)</strong> &rarr; baru periksa <strong>Rentang Nilai (0..100000)</strong>.
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 13: DETAIL TEKNIS PARSING & ATURAN BISNIS
   ========================================================= */
export function ParsingAndBusinessRuleSlide() {
  const cards = [
    {
      badge: 'trim()',
      title: 'Pembersihan Spasi',
      desc: 'Menghapus spasi kosong di awal/akhir agar spasi tidak dianggap teks valid.',
      snippet: 'String nama = namaField.getText().trim();',
    },
    {
      badge: 'parseInt()',
      title: 'Konversi Tipe Angka',
      desc: 'Mengubah String ke int. Wajib ditangani dengan try-catch NumberFormatException.',
      snippet: 'int stok = Integer.parseInt(teksStok);',
    },
    {
      badge: 'Aturan Bisnis',
      title: 'Batas Rentang Nilai',
      desc: 'Angka valid di Java (-5) belum tentu sah di aplikasi. Stok barang minimal harus 0.',
      snippet: 'if (stok < 0 || stok > BATAS_STOK) { ... }',
    },
    {
      badge: 'Format Digit',
      title: 'Tanpa Pemisah Ribuan',
      desc: 'Form menerima digit murni. Input "1.000" otomatis memicu NumberFormatException.',
      snippet: '// "1000" (Sah) vs "1.000" (Format Error)',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Detail Teknis: <code className="font-mono text-emerald-600">trim()</code>, <code className="font-mono text-emerald-600">parseInt()</code> &amp; Aturan Bisnis
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Empat aturan kunci saat memvalidasi input teks dan numerik di Java Swing.
        </p>
      </div>

      {/* 4 Cards Grid - Ringkas & Bersih */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  {c.badge}
                </span>
              </div>
              <h3 className="font-extrabold text-zinc-900 text-base">{c.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{c.desc}</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-emerald-300 shadow-inner overflow-x-auto">
              <code>{c.snippet}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 14: ANATOMI PESAN KESALAHAN (INTERAKTIF TEBAK PRAKTIKAN)
   ========================================================= */
export function ErrorMessageBestPracticeSlide({ step = 0 }) {
  const currentCaseIndex = Math.min(2, Math.floor(step / 2));
  const isRevealed = step % 2 === 1;

  useEffect(() => {
    [memeConfused1, memeConfused2, memeCorrect].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const cases = [
    {
      id: 0,
      dialogTitle: 'Peringatan Validasi (JOptionPane)',
      dialogMsg: '"Input salah!"',
      codeSnippet: 'JOptionPane.showMessageDialog(frame, "Input salah!");',
      memeImg: memeConfused2,
      memeAlt: 'Meme Confused - Nick Young',
      explanationTitle: 'Hindari Pesan Terlalu Umum:',
      explanation: 'Hindari pesan umum seperti "Input salah" ketika program sebenarnya sudah mengetahui field mana dan aturan apa yang dilanggar.',
      isGood: false,
    },
    {
      id: 1,
      dialogTitle: 'Peringatan Validasi (JOptionPane)',
      dialogMsg: 'java.lang.NumberFormatException: For input string: "abc" at java.lang.Integer.parseInt(Integer.java:652)...',
      codeSnippet: 'JOptionPane.showMessageDialog(frame, ex.toString());',
      memeImg: memeConfused1,
      memeAlt: 'Meme Confused Technical Stack Trace',
      explanationTitle: 'Jangan Melempar Stack Trace:',
      explanation: 'Untuk penolakan yang sudah diperkirakan, jangan pernah melempar mentah-mentah stack trace ke layar pengguna akhir!',
      isGood: false,
    },
    {
      id: 2,
      dialogTitle: 'Peringatan Validasi (JOptionPane)',
      dialogMsg: '"Stok harus bilangan bulat 0–100000. Contoh: 25."',
      codeSnippet: 'JOptionPane.showMessageDialog(frame, "Stok harus bilangan bulat 0–100000. Contoh: 25.");',
      memeImg: memeCorrect,
      memeAlt: 'Meme Correct Approved',
      explanationTitle: 'Pesan Spesifik, Terukur & Memberi Solusi:',
      explanation: 'Menyebutkan field terkait (Stok), aturan yang wajib dipenuhi (0–100000), dan contoh konkret (25).',
      isGood: true,
    },
  ];

  const currentCase = cases[currentCaseIndex];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Header Tanpa Tombol 1, 2, 3 */}
      <div className="mb-6 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Anatomi Pesan Kesalahan yang Efektif
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Pesan yang baik menjelaskan <strong>masalah apa yang terjadi</strong> dan <strong>tindakan perbaikan apa</strong> yang dapat dilakukan pengguna:
        </p>
      </div>

      {/* Main 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[380px]">
        {/* Left Column: JOptionPane Mockup & Penjelasan Saat Terbuka */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-4">
          {/* Swing Dialog Window Mockup */}
          <div className="border border-zinc-400 rounded-2xl overflow-hidden shadow-md bg-[#f4f2eb]">
            {/* Title Bar */}
            <div className="bg-[#2a4d7d] text-white px-3.5 py-2 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <Coffee className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-sans font-bold text-xs">
                  {currentCase.dialogTitle}
                </span>
              </div>
              <div className="flex items-center gap-1.5 opacity-80">
                <div className="w-3 h-3 bg-zinc-300/30 rounded flex items-center justify-center">
                  <Minus className="w-2 h-2 text-white" />
                </div>
                <div className="w-3 h-3 bg-zinc-300/30 rounded flex items-center justify-center">
                  <Square className="w-2 h-2 text-white" />
                </div>
                <div className="w-3 h-3 bg-red-500 rounded flex items-center justify-center">
                  <X className="w-2 h-2 text-white" />
                </div>
              </div>
            </div>

            {/* Dialog Body */}
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {currentCase.isGood ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-amber-500" />
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div
                    className={`p-3.5 rounded-lg font-mono text-xs leading-relaxed border ${
                      currentCase.isGood
                        ? 'bg-emerald-950 text-emerald-200 border-emerald-800'
                        : 'bg-red-950 text-red-200 border-red-800'
                    }`}
                  >
                    {currentCase.dialogMsg}
                  </div>
                </div>
              </div>

              {/* Java Code Representation */}
              <div className="bg-white/80 border border-zinc-300 rounded-lg p-2 font-mono text-[11px] text-zinc-600 truncate">
                <span className="text-zinc-400">// Java Swing:</span> {currentCase.codeSnippet}
              </div>
            </div>
          </div>

          {/* Penjelasan muncul di bawah dialog saat ditekan next */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                key={`exp-${currentCaseIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 shadow-2xs ${
                    currentCase.isGood
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                      : 'bg-red-50 border-red-200 text-red-950'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold font-mono text-xs uppercase">
                    {currentCase.isGood ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600 shrink-0" />
                    )}
                    <span>{currentCase.explanationTitle}</span>
                  </div>
                  <p className="font-semibold text-zinc-900 text-xs leading-relaxed">
                    &ldquo;{currentCase.explanation}&rdquo;
                  </p>
                </div>

                {currentCase.isGood && (
                  <div className="p-3 bg-zinc-900 text-emerald-400 font-mono text-xs rounded-xl border border-zinc-800">
                    Rumus Ideal = <strong>[Nama Field]</strong> + <strong>[Aturan/Batas Nilai]</strong> + <strong>[Contoh Solusi]</strong>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: MURNI GAMBAR MEME (Tanpa Teks Apapun) */}
        <div className="lg:col-span-6 flex items-center justify-center min-h-[300px]">
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                key={`meme-${currentCaseIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="w-full flex items-center justify-center p-2"
              >
                <img
                  src={currentCase.memeImg}
                  alt={currentCase.memeAlt}
                  loading="eager"
                  decoding="sync"
                  className="max-h-[300px] w-auto max-w-full object-contain rounded-2xl shadow-xl border border-zinc-200"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

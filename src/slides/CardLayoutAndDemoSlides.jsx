import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertCircle,
  Coffee,
  Minus,
  Square,
  X,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

/* =========================================================
   SLIDE 10: 4. CARDLAYOUT UNTUK NAVIGASI DALAM SATU JENDELA
   ========================================================= */
export function CardLayoutConceptSlide() {
  const cardCode = `// Gunakan konstanta agar nama kartu tidak mudah salah ketik (typo)
private static final String FORM = "FORM";
private static final String RINGKASAN = "RINGKASAN";

// 1. Buat instance CardLayout & pasang ke container JPanel kartu
CardLayout navigasi = new CardLayout();
JPanel kartu = new JPanel(navigasi);

// 2. Daftarkan setiap panel sebagai kartu dengan nama unik
kartu.add(panelForm, FORM);
kartu.add(panelRingkasan, RINGKASAN);

// 3. Pilih kartu mana yang ditampilkan melalui metode show()
navigasi.show(kartu, FORM);`;

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-6 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          4. CardLayout untuk Navigasi Satu Jendela
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          <code className="font-mono bg-zinc-100 px-1 rounded">CardLayout</code> mengelola beberapa komponen (<code className="font-mono bg-zinc-100 px-1 rounded">JPanel</code>) sebagai tumpukan kartu, dengan <strong>satu kartu terlihat pada suatu waktu</strong>:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7">
          <CodeBlock
            code={cardCode}
            filename="ContohCardLayout.java"
            label="Pola Dasar CardLayout"
            tone="java"
          />
        </div>

        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              Syarat Parameter Pertama show(kartu, ...)
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Argumen pertama <code className="font-mono bg-zinc-100 px-1 rounded">navigasi.show(kartu, &quot;FORM&quot;)</code> wajib berupa container <code className="font-mono bg-zinc-100 px-1 rounded">kartu</code> yang menggunakan instance <code className="font-mono bg-zinc-100 px-1 rounded">CardLayout</code> tersebut.
            </p>
          </div>

          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              Simpan Nama Kartu dalam Konstanta
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Simpan identifier string (<code className="font-mono bg-zinc-100 px-1 rounded">&quot;FORM&quot;</code>, <code className="font-mono bg-zinc-100 px-1 rounded">&quot;RINGKASAN&quot;</code>) dalam konstanta <code className="font-mono bg-zinc-100 px-1 rounded">static final</code> agar tidak mudah salah ketik saat memanggil <code className="font-mono bg-zinc-100 px-1 rounded">show()</code>.
            </p>
          </div>

          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              Cukup Satu JFrame!
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Untuk alur <em>Form &ndash; Ringkasan</em>, satu <code className="font-mono bg-zinc-100 px-1 rounded">JFrame</code> sudah cukup. Ini menghindari pembuatan banyak jendela baru untuk langkah yang masih merupakan satu alur kerja.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 16: SIMULASI VISUAL CARDLAYOUT (FORM <-> RINGKASAN)
   ========================================================= */
export function CardLayoutInteractiveSimSlide() {
  const [activeCard, setActiveCard] = useState('FORM');
  const hiddenCard = activeCard === 'FORM' ? 'RINGKASAN' : 'FORM';

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-6 border-b border-zinc-200 pb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
            Tumpukan Kartu di Satu JFrame
          </h2>
          <p className="text-sm text-zinc-600 mt-1">
            Klik tombol di bawah untuk melihat bagaimana <code className="font-mono bg-zinc-100 px-1 rounded text-zinc-800">CardLayout</code> mengganti visibilitas kartu tanpa menghancurkan data form:
          </p>
        </div>

        {/* Segmented Control Buttons */}
        <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200 gap-1 font-mono text-xs">
          <button
            onClick={() => setActiveCard('FORM')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeCard === 'FORM'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
            }`}
          >
            navigasi.show(kartu, &quot;FORM&quot;)
          </button>
          <button
            onClick={() => setActiveCard('RINGKASAN')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeCard === 'RINGKASAN'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60'
            }`}
          >
            navigasi.show(kartu, &quot;RINGKASAN&quot;)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Swing Window with Stacked Card Simulation */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="border border-zinc-400/80 rounded-2xl overflow-hidden shadow-lg bg-[#ece9d8]">
            {/* Title Bar (Classic Swing / Windows Frame Header) */}
            <div className="bg-[#2a4d7d] text-white px-3.5 py-2 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <Coffee className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-sans font-bold text-xs">
                  DemoFormRingkasan (JFrame &bull; CardLayout)
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

            {/* Sub-Header: CardLayout Navigator Bar */}
            <div className="bg-[#eae7dd] border-b border-zinc-300 px-4 py-2 flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-600 font-medium">Container: JPanel kartu (CardLayout)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                Kartu Aktif: &quot;{activeCard}&quot;
              </span>
            </div>

            {/* Body Panel (Card Deck Stack Area) */}
            <div className="p-4 bg-[#ece9d8] relative min-h-[220px]">
              {/* Back Card (Hidden Card Layer in Deck) */}
              <div className="mx-3 rounded-xl border-2 border-dashed border-zinc-400 bg-zinc-200/90 px-3.5 py-2 pb-6 flex items-center justify-between text-xs font-mono text-zinc-600 select-none shadow-inner">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                  <span>
                    Kartu di Belakang: <strong>&quot;{hiddenCard}&quot;</strong> (Tetap Ada di Memori!)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-zinc-300 text-zinc-700 text-[10px] font-bold border border-zinc-400">
                  visible: false
                </span>
              </div>

              {/* Front Card (Active Card Layer in Deck) */}
              <AnimatePresence mode="wait">
                {activeCard === 'FORM' ? (
                  <motion.div
                    key="FORM"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="relative z-10 -mt-4 bg-[#fbfaf6] border-2 border-emerald-600 rounded-xl p-4 shadow-xl space-y-3"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-xs font-mono">
                      <span className="font-bold text-zinc-800">
                        panelForm (&quot;FORM&quot;)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                        visible: true
                      </span>
                    </div>

                    {/* Form Content */}
                    <div className="space-y-2.5 font-sans text-xs">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <label className="col-span-4 text-xs font-bold text-zinc-700">
                          Nama Barang:
                        </label>
                        <input
                          readOnly
                          value="Buku Tulis Sinar Dunia"
                          className="col-span-8 px-2.5 py-1.5 bg-white border border-zinc-400 rounded text-xs text-zinc-800 font-mono shadow-inner outline-none cursor-default"
                        />
                      </div>

                      <div className="grid grid-cols-12 gap-2 items-center">
                        <label className="col-span-4 text-xs font-bold text-zinc-700">
                          Stok Barang:
                        </label>
                        <input
                          readOnly
                          value="25"
                          className="col-span-8 px-2.5 py-1.5 bg-white border border-zinc-400 rounded text-xs text-zinc-800 font-mono shadow-inner outline-none cursor-default"
                        />
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-1 flex justify-end">
                      <button
                        onClick={() => setActiveCard('RINGKASAN')}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded font-sans text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Klik: Lihat Ringkasan</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="RINGKASAN"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="relative z-10 -mt-4 bg-[#fbfaf6] border-2 border-emerald-600 rounded-xl p-4 shadow-xl space-y-3"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between border-b border-zinc-200 pb-2 text-xs font-mono">
                      <span className="font-bold text-zinc-800">
                        panelRingkasan (&quot;RINGKASAN&quot;)
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                        visible: true
                      </span>
                    </div>

                    {/* Summary Content */}
                    <div className="p-3 rounded-lg border border-zinc-300 bg-white shadow-2xs space-y-1.5 text-xs font-sans">
                      <div className="font-bold text-zinc-800 border-b border-zinc-100 pb-1 mb-1 font-mono flex items-center justify-between text-[11px]">
                        <span>JTextArea ringkasanArea (Memori)</span>
                        <span className="text-emerald-700 font-bold text-[10px]">Valid</span>
                      </div>
                      <div className="grid grid-cols-12 text-zinc-600 font-mono text-[11.5px] py-0.5">
                        <span className="col-span-4 text-zinc-500">Nama Barang:</span>
                        <span className="col-span-8 font-bold text-zinc-900">Buku Tulis Sinar Dunia</span>
                      </div>
                      <div className="grid grid-cols-12 text-zinc-600 font-mono text-[11.5px] py-0.5">
                        <span className="col-span-4 text-zinc-500">Jumlah Stok:</span>
                        <span className="col-span-8 font-bold text-zinc-900">25 Unit</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] text-zinc-500 font-sans italic">
                        Data form tetap aman di memori saat kembali.
                      </span>
                      <button
                        onClick={() => setActiveCard('FORM')}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded font-sans text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Kembali ke Form</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 2 Catatan Penting CardLayout dari Modul */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
          <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-2">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              1. Mengatur Visibilitas, Bukan Penyimpanan!
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              <code className="font-mono bg-zinc-100 px-1 rounded text-zinc-800">CardLayout</code> hanya mengubah panel mana yang terlihat di layar (<code className="font-mono bg-zinc-100 px-1 rounded text-zinc-800">show()</code>). Seluruh data input tetap hidup di memori dan tidak di-reset saat berpindah panel.
            </p>
          </div>

          <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-2">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              2. Ukuran Pilihan (Preferred Size) CardLayout
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Ukuran pilihan <code className="font-mono bg-zinc-100 px-1 rounded text-zinc-800">CardLayout</code> saat <code className="font-mono bg-zinc-100 px-1 rounded text-zinc-800">frame.pack()</code> mempertimbangkan <strong>seluruh kartu di dalamnya, termasuk kartu yang sedang tidak terlihat</strong>. Karena itu, rancang ukuran panel secara konsisten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 12: 5. CONTOH LENGKAP DEMOFORMRINGKASAN (BAGIAN 1/3)
   ========================================================= */
export function DemoCodeStructureSlide() {
  const codePart1 = `public class DemoFormRingkasan {
    private static final String FORM = "FORM";
    private static final String RINGKASAN = "RINGKASAN";
    private static final int BATAS_STOK = 100_000;

    private final JFrame frame = new JFrame("Data Barang");
    private final CardLayout navigasi = new CardLayout();
    private final JPanel kartu = new JPanel(navigasi);
    private final JTextField namaField = new JTextField(24);
    private final JTextField stokField = new JTextField(24);
    private final JLabel pesanLabel = new JLabel(" ");
    private final JTextArea ringkasanArea = new JTextArea(7, 42);

    private DemoFormRingkasan() {
        kartu.add(buatPanelForm(), FORM);
        kartu.add(buatPanelRingkasan(), RINGKASAN);

        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setContentPane(kartu);
        frame.pack();
        frame.setLocationRelativeTo(null);
        navigasi.show(kartu, FORM);
    }
}`;

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-5 border-b border-zinc-200 pb-3">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          5. Bedah <code className="font-mono text-emerald-600">DemoFormRingkasan.java</code> (1/3)
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Deklarasi konstanta, komponen field antarmuka, dan perakitan kartu di dalam constructor:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8">
          <CodeBlock
            code={codePart1}
            filename="DemoFormRingkasan.java (Baris 14-42)"
            label="Struktur & Constructor"
            tone="java"
          />
        </div>

        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              BATAS_STOK = 100_000
            </span>
            <p className="text-xs text-zinc-600">
              Literal angka dengan garis bawah (<code className="font-mono bg-zinc-100 px-1 rounded">100_000</code>) memudahkan pembacaan batas maksimum stok di kode Java.
            </p>
          </div>

          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              JLabel(&quot; &quot;) untuk pesanLabel
            </span>
            <p className="text-xs text-zinc-600">
              Diinisialisasi dengan satu spasi agar tinggi baris label pesan sudah teralokasi saat <code className="font-mono bg-zinc-100 px-1 rounded">frame.pack()</code> dijalankan.
            </p>
          </div>

          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              JTextArea(7, 42)
            </span>
            <p className="text-xs text-zinc-600">
              Digunakan agar teks nama ditampilkan sebagai teks biasa (bukan HTML) dan ringkasan dapat bergulir di dalam <code className="font-mono bg-zinc-100 px-1 rounded">JScrollPane</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 13: 5. CONTOH LENGKAP DEMOFORMRINGKASAN (BAGIAN 2/3)
   ========================================================= */
export function DemoCodePanelsSlide() {
  const [activeTab, setActiveTab] = useState('form');

  const panelFormCode = `private JPanel buatPanelForm() {
    JPanel fieldPanel = new JPanel(new GridLayout(2, 2, 8, 8));
    fieldPanel.add(new JLabel("Nama barang:"));
    fieldPanel.add(namaField);
    fieldPanel.add(new JLabel("Stok awal:"));
    fieldPanel.add(stokField);

    JButton lihatButton = new JButton("Lihat ringkasan");
    lihatButton.addActionListener(event -> tampilkanRingkasan());

    JPanel bawahPanel = new JPanel(new BorderLayout(8, 8));
    bawahPanel.add(pesanLabel, BorderLayout.CENTER);
    bawahPanel.add(lihatButton, BorderLayout.SOUTH);

    JPanel panel = new JPanel(new BorderLayout(10, 10));
    panel.setBorder(BorderFactory.createEmptyBorder(12, 12, 12, 12));
    panel.add(fieldPanel, BorderLayout.NORTH);
    panel.add(bawahPanel, BorderLayout.SOUTH);
    return panel;
}`;

  const panelRingkasanCode = `private JPanel buatPanelRingkasan() {
    ringkasanArea.setEditable(false);
    ringkasanArea.setLineWrap(true);
    ringkasanArea.setWrapStyleWord(true);

    JButton kembaliButton = new JButton("Kembali ke form");
    kembaliButton.addActionListener(event -> {
        navigasi.show(kartu, FORM);
        namaField.requestFocusInWindow();
    });

    JPanel panel = new JPanel(new BorderLayout(10, 10));
    panel.setBorder(BorderFactory.createEmptyBorder(12, 12, 12, 12));
    panel.add(new JLabel("Ringkasan data"), BorderLayout.NORTH);
    panel.add(new JScrollPane(ringkasanArea), BorderLayout.CENTER);
    panel.add(kembaliButton, BorderLayout.SOUTH);
    return panel;
}`;

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-5 border-b border-zinc-200 pb-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
            5. Bedah <code className="font-mono text-emerald-600">DemoFormRingkasan.java</code> (2/3)
          </h2>
          <p className="text-sm text-zinc-600 mt-1">
            Perakitan kartu <code className="font-mono bg-zinc-100 px-1 rounded">buatPanelForm()</code> dan <code className="font-mono bg-zinc-100 px-1 rounded">buatPanelRingkasan()</code>:
          </p>
        </div>

        <div className="flex gap-1.5 font-mono text-xs">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-3.5 py-1.5 rounded-lg border font-bold cursor-pointer transition-colors ${
              activeTab === 'form'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'
            }`}
          >
            1. buatPanelForm()
          </button>
          <button
            onClick={() => setActiveTab('ringkasan')}
            className={`px-3.5 py-1.5 rounded-lg border font-bold cursor-pointer transition-colors ${
              activeTab === 'ringkasan'
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-100'
            }`}
          >
            2. buatPanelRingkasan()
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8">
          <CodeBlock
            code={activeTab === 'form' ? panelFormCode : panelRingkasanCode}
            filename="DemoFormRingkasan.java"
            label={activeTab === 'form' ? 'Kartu FORM' : 'Kartu RINGKASAN'}
            tone="java"
          />
        </div>

        <div className="lg:col-span-4 space-y-3">
          {activeTab === 'form' ? (
            <>
              <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
                <span className="font-mono text-xs font-bold text-emerald-700 block">
                  GridLayout(2, 2, 8, 8)
                </span>
                <p className="text-xs text-zinc-600">
                  Menyusun label dan field input dalam 2 baris x 2 kolom dengan jarak horizontal &amp; vertikal 8 piksel.
                </p>
              </div>
              <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
                <span className="font-mono text-xs font-bold text-emerald-700 block">
                  createEmptyBorder(12, 12, 12, 12)
                </span>
                <p className="text-xs text-zinc-600">
                  Memberikan ruang padding 12 piksel di sekeliling tepi dalam panel agar komponen tidak menempel ke bingkai jendela.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
                <span className="font-mono text-xs font-bold text-emerald-700 block">
                  setEditable(false) &amp; Word Wrap
                </span>
                <p className="text-xs text-zinc-600">
                  Mencegah pengguna mengedit teks hasil ringkasan secara langsung dan membungkus baris panjang secara rapi.
                </p>
              </div>
              <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
                <span className="font-mono text-xs font-bold text-emerald-700 block">
                  Kembalikan Fokus ke namaField
                </span>
                <p className="text-xs text-zinc-600">
                  Saat tombol <em>&quot;Kembali ke form&quot;</em> ditekan, kartu berpindah ke <code className="font-mono bg-zinc-100 px-1 rounded">FORM</code> dan fokus kursor langsung diarahkan ke <code className="font-mono bg-zinc-100 px-1 rounded">namaField</code>.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 14: 5. CONTOH LENGKAP DEMOFORMRINGKASAN (BAGIAN 3/3)
   ========================================================= */
export function DemoCodeValidationSlide() {
  const validationCode = `private void tampilkanRingkasan() {
    // 1. Baca seluruh masukan sebelum memperbarui hasil.
    String nama = namaField.getText().trim();
    String teksStok = stokField.getText().trim();

    // 2. Validasi field kosong, konversi, dan rentang.
    if (nama.isEmpty()) {
        tampilkanKesalahan("Nama barang wajib diisi. Masukkan nama barang.", namaField);
        return;
    }
    if (teksStok.isEmpty()) {
        tampilkanKesalahan("Stok wajib diisi. Masukkan bilangan bulat 0-100000.", stokField);
        return;
    }
    final int stok;
    try {
        stok = Integer.parseInt(teksStok);
    } catch (NumberFormatException e) {
        tampilkanKesalahan("Stok harus bilangan bulat 0-100000. Contoh: 25.", stokField);
        return;
    }
    if (stok < 0 || stok > BATAS_STOK) {
        tampilkanKesalahan("Stok harus antara 0 dan 100000. Perbaiki nilainya.", stokField);
        return;
    }

    // 3. Bentuk hasil hanya setelah semua masukan sah.
    String ringkasan = "Nama barang: " + nama + "\\nStok awal: " + stok
            + "\\n\\nRingkasan hanya berada di memori.\\nBelum ada penyimpanan ke berkas atau basis data.";

    // 4. Perbarui hasil dan navigasi sebagai tanggapan keberhasilan.
    ringkasanArea.setText(ringkasan);
    ringkasanArea.setCaretPosition(0);
    pesanLabel.setText(" ");
    navigasi.show(kartu, RINGKASAN);
}`;

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-4 border-b border-zinc-200 pb-3">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          5. Bedah <code className="font-mono text-emerald-600">DemoFormRingkasan.java</code> (3/3)
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Implementasi 4 tahapan di dalam <code className="font-mono bg-zinc-100 px-1 rounded">tampilkanRingkasan()</code> dan kejujuran status antarmuka:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8">
          <CodeBlock
            code={validationCode}
            filename="DemoFormRingkasan.java (tampilkanRingkasan)"
            label="4 Tahap Lengkap"
            tone="java"
            maxHeight="max-h-[410px]"
          />
        </div>

        <div className="lg:col-span-4 space-y-3">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 shadow-sm space-y-1.5">
            <span className="font-mono text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Kejujuran Status Antarmuka</span>
            </span>
            <p className="text-xs text-amber-950 leading-relaxed">
              Tombol dan pesan sengaja menyatakan kegiatan yang benar-benar dilakukan: <strong>&quot;Lihat ringkasan&quot;</strong>. Karena data hanya berada di memori proses, <strong>pesan &quot;Data tersimpan&quot; TIDAK BOLEH ditampilkan</strong> hanya karena ringkasan berhasil dibentuk!
            </p>
          </div>

          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1.5">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              Mengapa setCaretPosition(0) &amp; pesanLabel(&quot; &quot;)?
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Mengembalikan posisi scroll <code className="font-mono bg-zinc-100 px-1 rounded">JTextArea</code> ke baris paling atas dan membersihkan label pesan error sebelumnya ketika validasi akhirnya berhasil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

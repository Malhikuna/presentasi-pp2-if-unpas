import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, RotateCcw, ArrowRight } from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';

/* =========================================================
   MODUL 10 — SLIDE 1: COVER SLIDE (CLEAN KEYNOTE)
   ========================================================= */
export function Mod10CoverSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-center px-10 lg:px-24 max-w-5xl mx-auto">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-zinc-900 leading-[1.06]">
            JTable &amp; <br />
            <span className="text-[#4B5BF4]">TableModel</span>
          </h1>

          <p className="text-lg lg:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Memisahkan tampilan tabel, model data, identitas objek, dan lapisan penyimpanan di Java Swing.
          </p>
        </div>

        {/* Minimalist Visual Motif: 3 Mini Color Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <span className="px-5 py-2.5 rounded-xl bg-[#F2C94C] text-zinc-950 font-bold text-sm shadow-[4px_4px_0px_#C99E26]">
            JTable (View)
          </span>
          <ArrowRight className="w-5 h-5 text-zinc-400" strokeWidth={3} />
          <span className="px-5 py-2.5 rounded-xl bg-[#4B5BF4] text-white font-bold text-sm shadow-[4px_4px_0px_#2D39B8]">
            TableModel
          </span>
          <ArrowRight className="w-5 h-5 text-zinc-400" strokeWidth={3} />
          <span className="px-5 py-2.5 rounded-xl bg-[#10B981] text-white font-bold text-sm shadow-[4px_4px_0px_#047857]">
            Service &amp; DAO
          </span>
        </div>

        <div className="pt-8 text-xs font-mono text-zinc-400 tracking-wide">
          Wanda Gusdya Purnama, ST., MT. &bull; Praktikum Pemrograman II
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODUL 10 — SLIDE 2: REVIEW (4 TAHAP PENANGANAN FORM)
   ========================================================= */
export function Mod10ReviewStagesSlide({ step = 0 }) {
  const stages = [
    {
      num: '01',
      name: 'Pembacaan Input',
      desc: 'Baca teks dari field & bersihkan dengan trim().',
      bg: 'bg-[#F2C94C]',
      shadow: 'shadow-[5px_5px_0px_#C99E26]',
      text: 'text-zinc-950',
      sub: 'text-zinc-900/80',
    },
    {
      num: '02',
      name: 'Validasi & Konversi',
      desc: 'Cek kosong, parsing angka, dan batas nilai.',
      bg: 'bg-[#4B5BF4]',
      shadow: 'shadow-[5px_5px_0px_#2D39B8]',
      text: 'text-white',
      sub: 'text-indigo-100',
    },
    {
      num: '03',
      name: 'Eksekusi Tindakan',
      desc: 'Jalankan aksi utama hanya jika semua valid.',
      bg: 'bg-[#10B981]',
      shadow: 'shadow-[5px_5px_0px_#047857]',
      text: 'text-white',
      sub: 'text-emerald-50',
    },
    {
      num: '04',
      name: 'Umpan Balik UI',
      desc: 'Tampilkan hasil atau pesan error spesifik.',
      bg: 'bg-[#F43F5E]',
      shadow: 'shadow-[5px_5px_0px_#BE123C]',
      text: 'text-white',
      sub: 'text-rose-100',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-3xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
          Di pertemuan sebelumnya, apa saja tahapan penanganan tombol pada form?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[210px]">
        {stages.map((s, idx) => {
          const isCardRevealed = step > idx;
          return (
            <div key={idx} className="min-h-[200px] flex flex-col items-center">
              <AnimatePresence>
                {isCardRevealed && (
                  <motion.div
                    key={`m10-stage-${idx}`}
                    initial={{ opacity: 0, y: 20, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -16, scale: 0.94 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full flex flex-col items-center space-y-3"
                  >
                    <span className="font-mono text-sm font-black text-zinc-400">
                      Tahap {s.num}
                    </span>
                    <div
                      className={`w-full flex-1 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2.5 ${s.bg} ${s.shadow}`}
                    >
                      <h3 className={`text-xl font-extrabold leading-snug ${s.text}`}>{s.name}</h3>
                      <p className={`text-sm font-medium leading-relaxed ${s.sub}`}>{s.desc}</p>
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
   MODUL 10 — SLIDE 3: CAPAIAN LUARAN & 3 LAPISAN TABEL
   ========================================================= */
export function Mod10ObjectivesSlide() {
  const layers = [
    {
      label: 'Tampilan',
      title: 'JTable',
      desc: 'Menggambar sel, pilih baris, & urutkan tampilan (view)',
      bg: 'bg-[#F2C94C]',
      shadow: 'shadow-[6px_6px_0px_#C99E26]',
      text: 'text-zinc-950',
      sub: 'text-zinc-900/80',
    },
    {
      label: 'Model Data',
      title: 'TableModel',
      desc: 'Menyediakan baris, kolom, tipe data, & snapshot List',
      bg: 'bg-[#4B5BF4]',
      shadow: 'shadow-[6px_6px_0px_#2D39B8]',
      text: 'text-white',
      sub: 'text-indigo-100',
    },
    {
      label: 'Penyimpanan',
      title: 'DAO / Database',
      desc: 'Sumber kebenaran data permanen di luar layar UI',
      bg: 'bg-[#10B981]',
      shadow: 'shadow-[6px_6px_0px_#047857]',
      text: 'text-white',
      sub: 'text-emerald-50',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-12 space-y-2">
        <h2 className="text-3xl lg:text-5xl font-black text-zinc-900 tracking-tight">
          Pisahkan <span className="underline decoration-[#F2C94C] decoration-4 underline-offset-4">Tampilan</span> &amp;{' '}
          <span className="underline decoration-[#4B5BF4] decoration-4 underline-offset-4">Model Data</span>
        </h2>
        <p className="text-base text-zinc-500">
          JTable tidak memiliki data sendiri — ia selalu bertanya ke TableModel.
        </p>
      </div>

      {/* Mosh-Style 3-Block Diagram with Labels Above + Crisp Vector Arrows */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-5">
        {layers.map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto flex-1">
            <div className="w-full flex flex-col items-center space-y-3">
              <span className="text-lg font-extrabold text-zinc-800">{item.label}</span>
              <div
                className={`w-full min-h-[175px] rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-2.5 ${item.bg} ${item.shadow}`}
              >
                <h3 className={`font-mono text-2xl font-black ${item.text}`}>{item.title}</h3>
                <p className={`text-sm font-medium leading-snug ${item.sub}`}>{item.desc}</p>
              </div>
            </div>

            {idx < layers.length - 1 && (
              <ArrowRight
                className="w-7 h-7 text-zinc-400 shrink-0 rotate-90 md:rotate-0 md:mt-8"
                strokeWidth={3}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   MODUL 10 — SLIDE 5: KONTRAK TABLEMODEL (SPLIT COMPARISON)
   ========================================================= */
export function Mod10TableModelConceptSlide() {
  const methods = [
    { sig: 'getRowCount()', desc: 'Jumlah baris' },
    { sig: 'getColumnCount()', desc: 'Jumlah kolom' },
    { sig: 'getColumnName(c)', desc: 'Judul header' },
    { sig: 'getColumnClass(c)', desc: 'Tipe data kolom' },
    { sig: 'getValueAt(r, c)', desc: 'Nilai tiap sel' },
    { sig: 'isCellEditable(r, c)', desc: 'Boleh diedit?' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-5xl font-black text-zinc-900 tracking-tight">
          Kontrak <span className="text-[#4B5BF4]">TableModel</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: 6 Clean Uniform Mosh Component Nodes */}
        <div className="md:col-span-6 space-y-4">
          <div className="text-center md:text-left text-base font-extrabold text-zinc-800">
            6 Method Inti yang Ditanyakan JTable
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            {methods.map((m, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#ECEEF5] border-2 border-[#C7CCF0] px-4 py-3.5 text-center shadow-[0_3px_0_#C7CCF0]"
              >
                <div className="font-mono text-xs lg:text-sm font-black text-[#312E81]">
                  {m.sig}
                </div>
                <div className="text-xs font-semibold text-zinc-600 mt-1">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Mosh-Style Split Comparison Blocks */}
        <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col items-center space-y-3">
            <span className="text-base font-extrabold text-zinc-800">Prototipe Cepat</span>
            <div className="w-full min-h-[210px] rounded-2xl bg-[#F2C94C] shadow-[5px_5px_0px_#C99E26] p-6 flex flex-col justify-center space-y-3 text-zinc-950">
              <div className="font-mono text-base font-black">DefaultTableModel</div>
              <div className="space-y-2 text-sm font-semibold leading-snug text-zinc-900/90">
                <div>Pakai array Object[][]</div>
                <div>Default sel bisa diedit</div>
                <div>Tipe default Object.class</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <span className="text-base font-extrabold text-[#4B5BF4]">Disarankan</span>
            <div className="w-full min-h-[210px] rounded-2xl bg-[#4B5BF4] shadow-[5px_5px_0px_#2D39B8] p-6 flex flex-col justify-center space-y-3 text-white">
              <div className="font-mono text-base font-black">AbstractTableModel</div>
              <div className="space-y-2 text-sm font-semibold leading-snug text-indigo-100">
                <div>Pakai List&lt;Barang&gt;</div>
                <div>Aturan baca-saja eksplisit</div>
                <div>Tipe kolom sangat jelas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODUL 10 — SLIDE 8: POSISI BUKAN IDENTITAS (TACTILE DEMO)
   ========================================================= */
const INITIAL_IDENTITY_ITEMS = [
  { id: 101, nama: 'Buku tulis' },
  { id: 102, nama: 'Pensil' },
  { id: 103, nama: 'Penghapus' },
];

export function Mod10IdentityVsIndexSlide() {
  const [items, setItems] = useState(INITIAL_IDENTITY_ITEMS);
  const targetId = 103;
  const currentRowOfTarget = items.findIndex((i) => i.id === targetId);

  const handleDeleteTop = () => {
    if (items.length <= 1) return;
    setItems((prev) => prev.slice(1));
  };

  const handleReset = () => {
    setItems(INITIAL_IDENTITY_ITEMS);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-3xl lg:text-5xl font-black text-zinc-900 tracking-tight">
          Posisi Baris <span className="underline decoration-[#F43F5E] decoration-4 underline-offset-4">Bukan</span> Identitas Data
        </h2>
        <p className="text-base text-zinc-500">
          Indeks baris berubah saat data dihapus atau disortir — gunakan <strong>ID stabil</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Tactile Shifting Rows */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-zinc-700">
              Amati <span className="text-[#4B5BF4]">Penghapus (ID 103)</span> saat baris atas dihapus:
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteTop}
                disabled={items.length <= 1}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F43F5E] hover:bg-rose-600 disabled:bg-zinc-300 disabled:shadow-none text-white font-bold text-xs shadow-[3px_3px_0px_#BE123C] active:translate-y-0.5 cursor-pointer transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus Baris #0
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-bold text-xs cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {items.map((item, idx) => {
                const isTarget = item.id === targetId;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.22 }}
                    className={`px-5 py-4 rounded-2xl flex items-center justify-between ${
                      isTarget
                        ? 'bg-[#4B5BF4] text-white shadow-[5px_5px_0px_#2D39B8]'
                        : 'bg-[#ECEEF5] text-zinc-800 border-2 border-[#D4D8EB]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-lg font-mono text-xs font-black ${
                          isTarget
                            ? 'bg-[#F2C94C] text-zinc-950'
                            : 'bg-zinc-800/10 text-zinc-700'
                        }`}
                      >
                        Index: {idx}
                      </span>
                      <span className="text-base font-extrabold">{item.nama}</span>
                    </div>
                    <span
                      className={`font-mono text-sm font-black px-3 py-1 rounded-lg ${
                        isTarget ? 'bg-white/20 text-white' : 'bg-white text-zinc-700'
                      }`}
                    >
                      ID: {item.id}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 pt-2 text-sm font-extrabold">
            <span className="text-[#F43F5E]">Index sekarang: {currentRowOfTarget}</span>
            <span className="text-zinc-300">|</span>
            <span className="text-[#10B981]">ID tetap: {targetId}</span>
          </div>
        </div>

        {/* Right: Clean Code Container with Bold Mosh Stroke */}
        <div className="md:col-span-5 space-y-4">
          <div className="text-center text-base font-extrabold text-zinc-800">
            Teruskan ID ke Service
          </div>
          <div className="rounded-3xl border-[3px] border-[#4B5BF4] overflow-hidden shadow-[6px_6px_0px_#C7CCF0]">
            <CodeBlock
              filename="AmbilID.java"
              code={`int barisModel =
  tabel.convertRowIndexToModel(barisView);

Barang barang = model.getBarang(barisModel);
long id = barang.getId();

// Kirim ID ke service, bukan index!
service.hapusBarang(id);`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODUL 10 — SLIDE 9: CUPLIKAN KODE INTI (BOLD MOSH FRAME)
   ========================================================= */
export function Mod10CoreCodeSlide() {
  const [activeTab, setActiveTab] = useState('model');

  const tabs = [
    {
      id: 'barang',
      label: 'Barang.java',
      accent: 'bg-[#F2C94C] text-zinc-950 shadow-[4px_4px_0px_#C99E26]',
      border: 'border-[#E6B830]',
      note: 'Objek domain immutable (final) — data snapshot di model aman dari perubahan luar.',
      code: `public final class Barang {
    private final long id;
    private final String nama;
    private final int stok;

    public Barang(long id, String nama, int stok) {
        if (id <= 0) throw new IllegalArgumentException("ID harus positif.");
        if (nama == null || nama.trim().isEmpty())
            throw new IllegalArgumentException("Nama wajib diisi.");
        if (stok < 0) throw new IllegalArgumentException("Stok tidak boleh negatif.");
        this.id = id;
        this.nama = nama.trim();
        this.stok = stok;
    }

    public long getId() { return id; }
    public String getNama() { return nama; }
    public int getStok() { return stok; }
}`,
    },
    {
      id: 'model',
      label: 'BarangTableModel.java',
      accent: 'bg-[#4B5BF4] text-white shadow-[4px_4px_0px_#2D39B8]',
      border: 'border-[#4B5BF4]',
      note: 'Salin daftar snapshot, panggil fireTableDataChanged(), & deklarasikan getColumnClass().',
      code: `public class BarangTableModel extends AbstractTableModel {
    private final String[] kolom = {"ID", "Nama", "Stok"};
    private List<Barang> data = new ArrayList<>();

    public void setData(List<Barang> sumber) {
        data = new ArrayList<>(sumber); // salinan snapshot
        fireTableDataChanged();         // beri tahu JTable untuk refresh!
    }

    public Barang getBarang(int barisModel) { return data.get(barisModel); }
    @Override public int getRowCount() { return data.size(); }
    @Override public int getColumnCount() { return kolom.length; }
    @Override public String getColumnName(int c) { return kolom[c]; }
    @Override public boolean isCellEditable(int r, int c) { return false; }

    @Override public Class<?> getColumnClass(int c) {
        switch (c) {
            case 0: return Long.class;
            case 1: return String.class;
            default: return Integer.class;
        }
    }

    @Override public Object getValueAt(int r, int c) {
        Barang b = data.get(r);
        return (c == 0) ? b.getId() : (c == 1) ? b.getNama() : b.getStok();
    }
}`,
    },
    {
      id: 'demo',
      label: 'DemoTabelBarang.java',
      accent: 'bg-[#10B981] text-white shadow-[4px_4px_0px_#047857]',
      border: 'border-[#10B981]',
      note: 'Aktifkan RowSorter, bungkus dengan JScrollPane, & konversi indeks sebelum baca model.',
      code: `JTable tabel = new JTable(model);
tabel.setAutoCreateRowSorter(true);
tabel.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

lihat.addActionListener(event -> {
    int barisView = tabel.getSelectedRow();
    if (barisView < 0) {
        status.setText("Pilih satu barang terlebih dahulu.");
        return;
    }
    int barisModel = tabel.convertRowIndexToModel(barisView);
    Barang terpilih = model.getBarang(barisModel);
    status.setText("ID: " + terpilih.getId() + " | Nama: " + terpilih.getNama());
});

frame.add(new JScrollPane(tabel), BorderLayout.CENTER);`,
    },
  ];

  const current = tabs.find((t) => t.id === activeTab) || tabs[1];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-5xl mx-auto">
      <div className="text-center mb-5 space-y-4">
        <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight">
          Cuplikan Kode Inti
        </h2>

        {/* Tactile Floating Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {tabs.map((t) => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-extrabold cursor-pointer transition-all ${
                  isActive
                    ? t.accent
                    : 'bg-[#ECEEF5] text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mosh-Style Bold Stroked Code Container */}
      <div className={`rounded-3xl border-[3px] ${current.border} overflow-hidden shadow-lg`}>
        <CodeBlock filename={current.label} code={current.code} maxHeight="max-h-[360px]" />
      </div>

      <p className="text-center text-sm font-semibold text-zinc-600 mt-4">{current.note}</p>
    </div>
  );
}

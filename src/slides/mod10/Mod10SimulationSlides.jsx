import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Coffee,
  Minus,
  Square,
  X,
  Plus,
  RefreshCw,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Trash2,
  Power,
  Play,
  ArrowRight,
} from 'lucide-react';
import CodeBlock from '../../components/CodeBlock';

/* =========================================================
   HELPER: SWING WINDOW TITLE BAR
   ========================================================= */
function SwingTitleBar({ title }) {
  return (
    <div className="bg-[#2a4d7d] text-white px-3.5 py-2 flex items-center justify-between text-xs font-mono select-none">
      <div className="flex items-center gap-2">
        <Coffee className="w-3.5 h-3.5 text-amber-300" />
        <span className="font-sans font-bold text-xs">{title}</span>
      </div>
      <div className="flex items-center gap-1.5 opacity-85">
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
  );
}

/* =========================================================
   MODUL 10 — SLIDE 4: SIMULASI 1 (JSCROLLPANE & NOTIFY)
   ========================================================= */
const INITIAL_SCROLL_ROWS = [
  { id: 101, nama: 'Buku tulis', stok: 20 },
  { id: 102, nama: 'Pensil', stok: 5 },
  { id: 103, nama: 'Penghapus', stok: 12 },
];

const EXTRA_ITEMS = [
  { id: 104, nama: 'Penggaris', stok: 15 },
  { id: 105, nama: 'Spidol', stok: 8 },
  { id: 106, nama: 'Rautan', stok: 30 },
  { id: 107, nama: 'Stabilo', stok: 9 },
];

export function Mod10JTableScrollSimSlide() {
  const [useScrollPane, setUseScrollPane] = useState(true);
  const [autoNotify, setAutoNotify] = useState(true);
  const [modelRows, setModelRows] = useState(INITIAL_SCROLL_ROWS);
  const [viewRows, setViewRows] = useState(INITIAL_SCROLL_ROWS);
  const [extraIdx, setExtraIdx] = useState(0);

  const isOutOfSync = modelRows.length !== viewRows.length;

  const handleAddRow = () => {
    const nextItem = EXTRA_ITEMS[extraIdx % EXTRA_ITEMS.length];
    const uniqueItem = { ...nextItem, id: 101 + modelRows.length };
    const updated = [...modelRows, uniqueItem];
    setModelRows(updated);
    setExtraIdx((prev) => prev + 1);
    if (autoNotify) setViewRows(updated);
  };

  const handleManualFire = () => setViewRows(modelRows);

  const handleReset = () => {
    setModelRows(INITIAL_SCROLL_ROWS);
    setViewRows(INITIAL_SCROLL_ROWS);
    setExtraIdx(0);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Centered Keynote Header */}
      <div className="text-center mb-6 space-y-3">
        <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight">
          <span className="text-[#4B5BF4]">JScrollPane</span> &amp;{' '}
          <span className="text-[#10B981]">fireTableDataChanged()</span>
        </h2>

        {/* Floating Tactile Mode Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setUseScrollPane(true)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              useScrollPane
                ? 'bg-[#10B981] text-white shadow-[4px_4px_0px_#047857]'
                : 'bg-[#ECEEF5] text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Pakai JScrollPane
          </button>
          <button
            onClick={() => setUseScrollPane(false)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              !useScrollPane
                ? 'bg-[#F43F5E] text-white shadow-[4px_4px_0px_#BE123C]'
                : 'bg-[#ECEEF5] text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Tanpa JScrollPane
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
        {/* Left: Floating Swing JFrame Directly on Canvas */}
        <div className="md:col-span-7 space-y-3.5">
          <div className="text-center text-sm font-extrabold text-zinc-700">
            JTable di Layar (View)
          </div>

          <div className="border-2 border-zinc-400 rounded-2xl overflow-hidden shadow-xl bg-[#f4f2eb]">
            <SwingTitleBar
              title={
                useScrollPane
                  ? 'frame.add(new JScrollPane(tabel))'
                  : 'frame.add(tabel) — Header Hilang!'
              }
            />
            <div className="p-3.5">
              <div
                className={`bg-white border border-zinc-400 h-[150px] ${
                  useScrollPane ? 'overflow-y-auto' : 'overflow-hidden'
                }`}
              >
                <table className="w-full text-left border-collapse font-sans text-xs">
                  {useScrollPane && (
                    <thead className="sticky top-0 bg-[#e5e3dc] border-b border-zinc-400 text-zinc-800 select-none">
                      <tr>
                        <th className="px-3 py-1.5 border-r border-zinc-300 font-bold w-16">ID</th>
                        <th className="px-3 py-1.5 border-r border-zinc-300 font-bold">Nama</th>
                        <th className="px-3 py-1.5 font-bold w-20 text-right">Stok</th>
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {viewRows.map((row, idx) => (
                      <tr
                        key={row.id}
                        className={`border-b border-zinc-200 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/80'
                        }`}
                      >
                        <td className="px-3 py-2 border-r border-zinc-200 font-mono text-zinc-600">
                          {row.id}
                        </td>
                        <td className="px-3 py-2 border-r border-zinc-200 font-semibold text-zinc-900">
                          {row.nama}
                        </td>
                        <td className="px-3 py-2 font-mono text-right text-zinc-800">
                          {row.stok}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {!useScrollPane && (
                <div className="mt-2.5 px-3 py-2 rounded-xl bg-[#F43F5E] text-white text-xs font-bold text-center">
                  Header kolom hilang &amp; baris berlebih terpotong!
                </div>
              )}
            </div>
          </div>

          {/* Floating Controls Underneath */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <label className="flex items-center gap-2 text-xs font-bold text-zinc-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={autoNotify}
                onChange={(e) => setAutoNotify(e.target.checked)}
                className="accent-[#4B5BF4] w-4 h-4 cursor-pointer"
              />
              <span>Auto fireTableDataChanged()</span>
            </label>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleAddRow}
                className="px-4 py-2 rounded-xl bg-[#4B5BF4] hover:bg-indigo-600 text-white font-bold text-xs shadow-[3px_3px_0px_#2D39B8] active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Baris
              </button>

              {isOutOfSync && (
                <button
                  onClick={handleManualFire}
                  className="px-4 py-2 rounded-xl bg-[#F2C94C] text-zinc-950 font-black text-xs shadow-[3px_3px_0px_#C99E26] flex items-center gap-1.5 cursor-pointer animate-pulse"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  fireTableDataChanged()
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Tactile TableModel Block + Clean Code */}
        <div className="md:col-span-5 space-y-4">
          <div className="text-center text-sm font-extrabold text-zinc-700">
            Isi TableModel ({modelRows.length} data &bull;{' '}
            <span className={isOutOfSync ? 'text-[#F43F5E]' : 'text-[#10B981]'}>
              {isOutOfSync ? 'Belum Sinkron!' : 'Sinkron'}
            </span>
            )
          </div>

          <div className="rounded-2xl bg-[#312E81] text-white p-4 shadow-[6px_6px_0px_#1E1B4B] space-y-1.5 max-h-[155px] overflow-y-auto font-mono text-xs">
            {modelRows.map((row, idx) => {
              const isRendered = idx < viewRows.length;
              return (
                <div
                  key={row.id}
                  className={`px-3 py-1.5 rounded-lg flex items-center justify-between ${
                    isRendered
                      ? 'bg-white/10 text-indigo-50'
                      : 'bg-[#F2C94C] text-zinc-950 font-bold'
                  }`}
                >
                  <span>
                    [{idx}] {row.id} &middot; {row.nama}
                  </span>
                  <span className="text-[10px]">{isRendered ? 'Tampil' : 'Menunggu notify'}</span>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border-[3px] border-[#4B5BF4] overflow-hidden shadow-md">
            <CodeBlock
              filename="PasangTabel.java"
              code={`JTable tabel = new JTable(model);
JScrollPane area = new JScrollPane(tabel);
fireTableDataChanged();`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODUL 10 — SLIDE 6: SIMULASI 2 (SORTING STRING VS INTEGER)
   ========================================================= */
const SORT_SAMPLE_DATA = [
  { id: 101, nama: 'Buku tulis', stok: 100 },
  { id: 102, nama: 'Pensil', stok: 20 },
  { id: 103, nama: 'Penghapus', stok: 3 },
  { id: 104, nama: 'Penggaris', stok: 5 },
];

export function Mod10SortingTypeSimSlide() {
  const [stokType, setStokType] = useState('string');
  const [sortCol, setSortCol] = useState('stok');
  const [sortDir, setSortDir] = useState('asc');

  const handleSortClick = (col) => {
    if (sortCol === col) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const sortedRows = [...SORT_SAMPLE_DATA].sort((a, b) => {
    let cmp = 0;
    if (sortCol === 'id') cmp = a.id - b.id;
    else if (sortCol === 'nama') cmp = a.nama.localeCompare(b.nama);
    else if (sortCol === 'stok') {
      cmp =
        stokType === 'string'
          ? String(a.stok).localeCompare(String(b.stok))
          : a.stok - b.stok;
    }
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const renderSortIcon = (col) => {
    if (sortCol !== col) return <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />;
    return sortDir === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-[#4B5BF4]" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-[#4B5BF4]" />
    );
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-6 space-y-3">
        <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight">
          Sorting Teks vs Angka (<span className="text-[#4B5BF4]">getColumnClass</span>)
        </h2>

        {/* Tactile Mode Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setStokType('string');
              setSortCol('stok');
              setSortDir('asc');
            }}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              stokType === 'string'
                ? 'bg-[#F43F5E] text-white shadow-[4px_4px_0px_#BE123C]'
                : 'bg-[#ECEEF5] text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Stok = String (Salah)
          </button>
          <button
            onClick={() => {
              setStokType('integer');
              setSortCol('stok');
              setSortDir('asc');
            }}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              stokType === 'integer'
                ? 'bg-[#10B981] text-white shadow-[4px_4px_0px_#047857]'
                : 'bg-[#ECEEF5] text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Stok = Integer (Benar)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
        {/* Left: Floating Swing Table */}
        <div className="md:col-span-7 space-y-3.5">
          <div className="border-2 border-zinc-400 rounded-2xl overflow-hidden shadow-xl bg-[#f4f2eb]">
            <SwingTitleBar title="JTable — Klik Header Kolom untuk Sortir" />
            <div className="p-3.5">
              <div className="bg-white border border-zinc-400 overflow-hidden">
                <table className="w-full text-left border-collapse font-sans text-xs">
                  <thead className="bg-[#e5e3dc] border-b border-zinc-400 text-zinc-800 select-none">
                    <tr>
                      <th
                        onClick={() => handleSortClick('id')}
                        className="px-3 py-2 border-r border-zinc-300 font-bold cursor-pointer hover:bg-[#dad7ce] w-20"
                      >
                        <div className="flex items-center justify-between">
                          <span>ID</span>
                          {renderSortIcon('id')}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSortClick('nama')}
                        className="px-3 py-2 border-r border-zinc-300 font-bold cursor-pointer hover:bg-[#dad7ce]"
                      >
                        <div className="flex items-center justify-between">
                          <span>Nama</span>
                          {renderSortIcon('nama')}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSortClick('stok')}
                        className={`px-3 py-2 font-bold cursor-pointer hover:bg-[#dad7ce] w-36 ${
                          sortCol === 'stok' ? 'bg-[#F2C94C]/40' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>Stok ({stokType === 'string' ? 'String' : 'Integer'})</span>
                          {renderSortIcon('stok')}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedRows.map((row, idx) => (
                      <motion.tr
                        key={row.id}
                        layout
                        transition={{ duration: 0.2 }}
                        className={`border-b border-zinc-200 ${
                          idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/70'
                        }`}
                      >
                        <td className="px-3 py-2.5 border-r border-zinc-200 font-mono text-zinc-600">
                          {row.id}
                        </td>
                        <td className="px-3 py-2.5 border-r border-zinc-200 font-semibold text-zinc-900">
                          {row.nama}
                        </td>
                        <td
                          className={`px-3 py-2.5 font-mono text-sm font-black ${
                            stokType === 'string'
                              ? 'text-left text-[#F43F5E]'
                              : 'text-right text-[#10B981]'
                          }`}
                        >
                          {stokType === 'string' ? `"${row.stok}"` : row.stok}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Bold Tactile Result Strip */}
          <div
            className={`px-5 py-3 rounded-2xl font-mono text-xs font-extrabold flex items-center justify-between ${
              stokType === 'string'
                ? 'bg-[#F43F5E] text-white shadow-[4px_4px_0px_#BE123C]'
                : 'bg-[#10B981] text-white shadow-[4px_4px_0px_#047857]'
            }`}
          >
            <span>Urutan: {sortedRows.map((r) => r.stok).join('  →  ')}</span>
            <span>{stokType === 'string' ? 'Leksikografis ("1" < "2")' : 'Numerik Akurat'}</span>
          </div>
        </div>

        {/* Right: Bulletless Airy Takeaways + Bold Code Frame */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-2.5 text-sm font-bold text-zinc-800">
            <div>Simpan angka murni, jangan &quot;20 unit&quot;</div>
            <div>Tentukan kelas via switch kolom, bukan baris ke-0</div>
            <div>Nilai getValueAt() wajib cocok dengan tipenya</div>
          </div>

          <div className="rounded-3xl border-[3px] border-[#4B5BF4] overflow-hidden shadow-[5px_5px_0px_#C7CCF0]">
            <CodeBlock
              filename="getColumnClass.java"
              code={`@Override
public Class<?> getColumnClass(int col) {
    switch (col) {
        case 0: return Long.class;
        case 1: return String.class;
        case 2: return Integer.class;
        default: return Object.class;
    }
}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODUL 10 — SLIDE 7: SIMULASI 3 (INDEKS VIEW VS MODEL)
   ========================================================= */
const MODEL_ITEMS = [
  { modelIndex: 0, id: 101, nama: 'Buku tulis', stok: 20 },
  { modelIndex: 1, id: 102, nama: 'Pensil', stok: 5 },
  { modelIndex: 2, id: 103, nama: 'Penghapus', stok: 12 },
];

export function Mod10ViewVsModelSimSlide() {
  const [useConvert, setUseConvert] = useState(false);
  const [sortBy, setSortBy] = useState('stok');
  const [selectedViewRow, setSelectedViewRow] = useState(0);
  const [resultMsg, setResultMsg] = useState(null);

  const viewRows = [...MODEL_ITEMS].sort((a, b) => {
    if (sortBy === 'stok') return a.stok - b.stok;
    if (sortBy === 'nama') return a.nama.localeCompare(b.nama);
    return a.modelIndex - b.modelIndex;
  });

  const clickedItem = selectedViewRow >= 0 ? viewRows[selectedViewRow] : null;
  const accessedModelIndex =
    selectedViewRow < 0
      ? -1
      : useConvert
      ? viewRows[selectedViewRow].modelIndex
      : selectedViewRow;
  const accessedItem = accessedModelIndex >= 0 ? MODEL_ITEMS[accessedModelIndex] : null;

  const handleInspectChoice = () => {
    if (selectedViewRow < 0) {
      setResultMsg({
        status: 'empty',
        text: 'barisView == -1 → Aman, tidak diproses!',
      });
      return;
    }
    const isMatch = accessedItem.id === clickedItem.id;
    setResultMsg({
      status: isMatch ? 'ok' : 'bug',
      text: isMatch
        ? `BENAR! view(${selectedViewRow}) → model(${accessedModelIndex}) → ID ${accessedItem.id} (${accessedItem.nama})`
        : `SALAH BARIS! Klik "${clickedItem.nama}" (ID ${clickedItem.id}), tapi terambil model[${selectedViewRow}] = "${accessedItem.nama}" (ID ${accessedItem.id})!`,
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-6 space-y-3">
        <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight">
          Indeks <span className="text-[#4B5BF4]">View</span> vs Indeks{' '}
          <span className="text-[#10B981]">Model</span>
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setUseConvert(false);
              setResultMsg(null);
            }}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              !useConvert
                ? 'bg-[#F43F5E] text-white shadow-[4px_4px_0px_#BE123C]'
                : 'bg-[#ECEEF5] text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Tanpa Konversi (BUG)
          </button>
          <button
            onClick={() => {
              setUseConvert(true);
              setResultMsg(null);
            }}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              useConvert
                ? 'bg-[#10B981] text-white shadow-[4px_4px_0px_#047857]'
                : 'bg-[#ECEEF5] text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            convertRowIndexToModel()
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
        {/* Left: Floating Swing JTable */}
        <div className="md:col-span-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-extrabold text-[#4B5BF4]">1. Tampilan JTable (View)</span>
            <div className="flex gap-1.5 text-[11px] font-bold">
              {[
                { id: 'none', label: 'Asli' },
                { id: 'stok', label: 'Sort Stok ↑' },
                { id: 'nama', label: 'Sort Nama ↑' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => {
                    setSortBy(btn.id);
                    setResultMsg(null);
                  }}
                  className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                    sortBy === btn.id
                      ? 'bg-[#4B5BF4] text-white'
                      : 'bg-[#ECEEF5] text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-2 border-zinc-400 rounded-2xl overflow-hidden shadow-xl bg-[#f4f2eb]">
            <SwingTitleBar title="Daftar Barang di Memori" />
            <div className="p-3 space-y-3">
              <div className="bg-white border border-zinc-400">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-[#e5e3dc] border-b border-zinc-400 text-zinc-800 select-none">
                    <tr>
                      <th className="px-2.5 py-1.5 border-r border-zinc-300 font-mono text-[10px] text-[#4B5BF4]">
                        View
                      </th>
                      <th className="px-2.5 py-1.5 border-r border-zinc-300 font-bold">ID</th>
                      <th className="px-2.5 py-1.5 border-r border-zinc-300 font-bold">Nama</th>
                      <th className="px-2.5 py-1.5 font-bold text-right">Stok</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewRows.map((row, viewIdx) => {
                      const isSelected = selectedViewRow === viewIdx;
                      return (
                        <tr
                          key={row.id}
                          onClick={() => {
                            setSelectedViewRow(viewIdx);
                            setResultMsg(null);
                          }}
                          className={`border-b border-zinc-200 cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-[#2a4d7d] text-white font-bold'
                              : 'hover:bg-indigo-50 text-zinc-800'
                          }`}
                        >
                          <td
                            className={`px-2.5 py-2 border-r font-mono font-black ${
                              isSelected
                                ? 'border-blue-400/40 text-[#F2C94C]'
                                : 'border-zinc-200 text-[#4B5BF4]'
                            }`}
                          >
                            {viewIdx}
                          </td>
                          <td className="px-2.5 py-2 border-r border-zinc-200/40 font-mono">
                            {row.id}
                          </td>
                          <td className="px-2.5 py-2 border-r border-zinc-200/40">{row.nama}</td>
                          <td className="px-2.5 py-2 font-mono text-right">{row.stok}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    setSelectedViewRow(-1);
                    setResultMsg(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white border border-zinc-400 text-zinc-700 text-[11px] font-bold hover:bg-zinc-100 cursor-pointer"
                >
                  Kosongkan (-1)
                </button>
                <button
                  onClick={handleInspectChoice}
                  className="px-4 py-1.5 rounded-lg bg-[#F2C94C] hover:bg-amber-400 text-zinc-950 text-xs font-black shadow-[3px_3px_0px_#C99E26] active:translate-y-0.5 cursor-pointer"
                >
                  Lihat Pilihan
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-zinc-900 text-zinc-200 font-mono text-xs text-center">
            {useConvert ? (
              <span className="text-emerald-300">
                convertRowIndexToModel({selectedViewRow}) → {accessedModelIndex}
              </span>
            ) : (
              <span className="text-rose-300">
                model.getBarang({selectedViewRow}) // langsung pakai view!
              </span>
            )}
          </div>
        </div>

        {/* Right: Tactile TableModel Array + Result */}
        <div className="md:col-span-6 space-y-3.5">
          <div className="text-center md:text-left text-sm font-extrabold text-zinc-800">
            2. Urutan Asli di TableModel (Tetap!)
          </div>

          <div className="space-y-3">
            {MODEL_ITEMS.map((item) => {
              const isAccessed = accessedModelIndex === item.modelIndex;
              const isClickedActual = clickedItem?.id === item.id;
              const isBugRead = isAccessed && !isClickedActual;

              return (
                <div
                  key={item.id}
                  className={`px-4 py-3.5 rounded-2xl flex items-center justify-between transition-all ${
                    isBugRead
                      ? 'bg-[#F43F5E] text-white shadow-[5px_5px_0px_#BE123C]'
                      : isAccessed
                      ? 'bg-[#10B981] text-white shadow-[5px_5px_0px_#047857]'
                      : 'bg-[#ECEEF5] text-zinc-800 border-2 border-[#D4D8EB]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs font-black ${
                        isAccessed ? 'bg-black/20 text-white' : 'bg-zinc-900 text-white'
                      }`}
                    >
                      model[{item.modelIndex}]
                    </span>
                    <span className="text-sm font-extrabold">{item.nama}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs font-bold">
                    <span>ID: {item.id}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="min-h-[64px] flex items-center">
            {resultMsg ? (
              <div
                className={`w-full px-4 py-3 rounded-2xl font-bold text-xs leading-relaxed text-center ${
                  resultMsg.status === 'ok'
                    ? 'bg-[#10B981] text-white shadow-[4px_4px_0px_#047857]'
                    : resultMsg.status === 'bug'
                    ? 'bg-[#F43F5E] text-white shadow-[4px_4px_0px_#BE123C]'
                    : 'bg-[#F2C94C] text-zinc-950 shadow-[4px_4px_0px_#C99E26]'
                }`}
              >
                {resultMsg.text}
              </div>
            ) : (
              <div className="w-full px-4 py-3 rounded-2xl bg-[#ECEEF5] text-zinc-600 text-xs font-bold text-center">
                Klik tombol <span className="text-zinc-900">Lihat Pilihan</span> di jendela Swing untuk menguji!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODUL 10 — SLIDE 10: SIMULASI 4 (TABLEMODEL BUKAN DATABASE)
   ========================================================= */
const INITIAL_RAM_ITEMS = [
  { id: 101, nama: 'Buku tulis', stok: 20 },
  { id: 102, nama: 'Pensil', stok: 5 },
  { id: 103, nama: 'Penghapus', stok: 12 },
];

export function Mod10MemoryVsDbSimSlide() {
  const [rows, setRows] = useState(INITIAL_RAM_ITEMS);
  const [isRestarting, setIsRestarting] = useState(false);
  const [honestLabel, setHonestLabel] = useState(true);
  const [statusNote, setStatusNote] = useState('Data contoh dimuat di memori (RAM).');

  const handleAddRamItem = () => {
    const newId = 101 + rows.length;
    const names = ['Penggaris', 'Spidol', 'Rautan', 'Kertas A4', 'Binder'];
    const name = names[(rows.length - 3) % names.length] || `Barang #${newId}`;
    setRows((prev) => [...prev, { id: newId, nama: name, stok: 15 }]);
    setStatusNote(
      honestLabel
        ? `Ditampilkan di RAM (ID ${newId} belum disimpan ke DB).`
        : `"Tersimpan permanen!" (Menyesatkan!)`
    );
  };

  const handleDeleteLast = () => {
    if (rows.length === 0) return;
    setRows((prev) => prev.slice(0, -1));
    setStatusNote('Baris dihapus dari memori sesi ini.');
  };

  const handleRestartApp = () => {
    setIsRestarting(true);
    setTimeout(() => {
      setRows(INITIAL_RAM_ITEMS);
      setIsRestarting(false);
      setStatusNote('Aplikasi dibuka ulang! Semua perubahan hilang — kembali ke data awal.');
    }, 550);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-6 space-y-2">
        <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight">
          <span className="text-[#4B5BF4]">TableModel</span>{' '}
          <span className="underline decoration-[#F43F5E] decoration-4 underline-offset-4">Bukan</span> Basis Data
        </h2>
        <p className="text-sm text-zinc-500 font-medium">
          Ubah isi tabel di bawah, lalu tekan <strong>Restart Aplikasi</strong> untuk membuktikan sifat RAM.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-7 items-center">
        {/* Left: Floating Swing RAM Window */}
        <div className="md:col-span-7 space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              <button
                onClick={handleAddRamItem}
                disabled={isRestarting}
                className="px-3.5 py-2 rounded-xl bg-[#4B5BF4] hover:bg-indigo-600 text-white font-bold text-xs shadow-[3px_3px_0px_#2D39B8] flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Baris
              </button>
              <button
                onClick={handleDeleteLast}
                disabled={isRestarting || rows.length === 0}
                className="px-3.5 py-2 rounded-xl bg-[#ECEEF5] hover:bg-zinc-200 disabled:opacity-40 text-zinc-800 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus
              </button>
            </div>

            <button
              onClick={handleRestartApp}
              disabled={isRestarting}
              className="px-4 py-2 rounded-xl bg-[#F43F5E] hover:bg-rose-600 text-white font-extrabold text-xs shadow-[3px_3px_0px_#BE123C] flex items-center gap-1.5 cursor-pointer"
            >
              <Power className="w-3.5 h-3.5" />
              Restart Aplikasi
            </button>
          </div>

          <div className="border-2 border-zinc-400 rounded-2xl overflow-hidden shadow-xl bg-[#f4f2eb] min-h-[200px] flex flex-col">
            <SwingTitleBar title="Daftar Barang di Memori (RAM)" />
            {isRestarting ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-2 bg-zinc-900 text-white font-mono text-xs">
                <RefreshCw className="w-6 h-6 text-[#F2C94C] animate-spin" />
                <span>Menutup JVM &amp; Membuka Ulang...</span>
              </div>
            ) : (
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2.5">
                <div className="bg-white border border-zinc-400 max-h-[140px] overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="sticky top-0 bg-[#e5e3dc] border-b border-zinc-400 text-zinc-800">
                      <tr>
                        <th className="px-3 py-1.5 border-r border-zinc-300 font-bold w-16">ID</th>
                        <th className="px-3 py-1.5 border-r border-zinc-300 font-bold">Nama</th>
                        <th className="px-3 py-1.5 font-bold w-20 text-right">Stok</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.id} className="border-b border-zinc-200">
                          <td className="px-3 py-1.5 border-r border-zinc-200 font-mono text-zinc-600">
                            {r.id}
                          </td>
                          <td className="px-3 py-1.5 border-r border-zinc-200 font-semibold text-zinc-900">
                            {r.nama}
                          </td>
                          <td className="px-3 py-1.5 font-mono text-right text-zinc-800">
                            {r.stok}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold ${
                    !honestLabel ? 'bg-[#F43F5E] text-white' : 'bg-white text-zinc-700'
                  }`}
                >
                  {statusNote}
                </div>
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-xs font-bold text-zinc-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={honestLabel}
              onChange={(e) => setHonestLabel(e.target.checked)}
              className="accent-[#10B981] w-4 h-4 cursor-pointer"
            />
            <span>Pesan UI jujur (&quot;Ditampilkan&quot;, bukan &quot;Tersimpan&quot;)</span>
          </label>
        </div>

        {/* Right: Paired Mosh Solid Color Comparison Blocks */}
        <div className="md:col-span-5 space-y-5">
          <div className="space-y-2">
            <div className="text-center text-base font-extrabold text-zinc-800">
              TableModel (RAM)
            </div>
            <div className="rounded-2xl bg-[#F2C94C] shadow-[5px_5px_0px_#C99E26] p-5 text-center text-zinc-950 space-y-1">
              <div className="text-base font-black">Sementara</div>
              <p className="text-xs font-semibold text-zinc-900/85 leading-relaxed">
                Hanya snapshot di memori. Aplikasi ditutup → perubahan langsung hilang.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-center text-base font-extrabold text-zinc-800">
              Basis Data (DB)
            </div>
            <div className="rounded-2xl bg-[#10B981] shadow-[5px_5px_0px_#047857] p-5 text-center text-white space-y-1">
              <div className="text-base font-black">Permanen</div>
              <p className="text-xs font-semibold text-emerald-50 leading-relaxed">
                Menyimpan jangka panjang. Pesan &quot;Tersimpan&quot; baru muncul setelah DB konfirmasi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODUL 10 — SLIDE 11: SIMULASI 5 (ALUR GUI → SERVICE → DAO → DB)
   ========================================================= */
export function Mod10LayeredArchSimSlide() {
  const [scenario, setScenario] = useState(null);
  const [activeNode, setActiveNode] = useState(-1);
  const [statusBanner, setStatusBanner] = useState(
    'Klik salah satu skenario di bawah untuk melihat aliran data melintasi 4 lapisan.'
  );
  const [isError, setIsError] = useState(false);
  const timersRef = useRef([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const runScenario = (type) => {
    clearTimers();
    setScenario(type);
    setIsError(false);

    if (type === 'load') {
      const steps = [
        { node: 0, msg: '1. GUI meminta daftar barang (EDT)...' },
        { node: 1, msg: '2. Service meneruskan permintaan baca ke DAO...' },
        { node: 2, msg: '3. DAO (BarangDao.cariSemua) akses data di SwingWorker...' },
        { node: 3, msg: '4. Penyimpanan mengembalikan List<Barang>...' },
        { node: 0, msg: '5. Selesai! TableModel.setData() memperbarui JTable di EDT.' },
      ];
      steps.forEach((s, i) => {
        timersRef.current.push(
          setTimeout(() => {
            setActiveNode(s.node);
            setStatusBanner(s.msg);
          }, i * 680)
        );
      });
    } else if (type === 'save-ok') {
      const steps = [
        { node: 0, msg: '1. GUI validasi input & ambil ID stabil...' },
        { node: 1, msg: '2. Service cek aturan bisnis → LOLOS!' },
        { node: 2, msg: '3. DAO menyimpan ke penyimpanan lewat SwingWorker...' },
        { node: 3, msg: '4. Penyimpanan konfirmasi data tersimpan permanen.' },
        { node: 0, msg: '5. Sukses! TableModel di-refresh & tampil pesan "Tersimpan".' },
      ];
      steps.forEach((s, i) => {
        timersRef.current.push(
          setTimeout(() => {
            setActiveNode(s.node);
            setStatusBanner(s.msg);
          }, i * 680)
        );
      });
    } else if (type === 'save-fail') {
      const steps = [
        { node: 0, msg: '1. GUI mengirim permintaan simpan data...', err: false },
        { node: 1, msg: '2. Service menolak! (Duplikat / aturan bisnis dilanggar)', err: true },
        {
          node: 0,
          msg: '3. Dibatalkan! JTable tetap konsisten & input pengguna tidak dihapus.',
          err: true,
        },
      ];
      steps.forEach((s, i) => {
        timersRef.current.push(
          setTimeout(() => {
            setActiveNode(s.node);
            setStatusBanner(s.msg);
            setIsError(s.err);
          }, i * 820)
        );
      });
    }
  };

  const nodes = [
    {
      label: 'EDT',
      title: 'GUI & TableModel',
      sub: 'Tampilan & interaksi',
      bg: 'bg-[#F2C94C]',
      shadow: 'shadow-[5px_5px_0px_#C99E26]',
      text: 'text-zinc-950',
      subText: 'text-zinc-900/80',
    },
    {
      label: 'Aturan',
      title: 'Service',
      sub: 'Validasi & logika bisnis',
      bg: 'bg-[#4B5BF4]',
      shadow: 'shadow-[5px_5px_0px_#2D39B8]',
      text: 'text-white',
      subText: 'text-indigo-100',
    },
    {
      label: 'SwingWorker',
      title: 'DAO',
      sub: 'Kontrak BarangDao',
      bg: 'bg-[#8B5CF6]',
      shadow: 'shadow-[5px_5px_0px_#6D28D9]',
      text: 'text-white',
      subText: 'text-violet-100',
    },
    {
      label: 'Data',
      title: 'Penyimpanan',
      sub: 'Memori / JDBC',
      bg: 'bg-[#10B981]',
      shadow: 'shadow-[5px_5px_0px_#047857]',
      text: 'text-white',
      subText: 'text-emerald-50',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-3xl lg:text-5xl font-black text-zinc-900 tracking-tight">
          Arsitektur <span className="text-[#4B5BF4]">GUI → Service → DAO</span>
        </h2>
        <p className="text-sm lg:text-base text-zinc-500 font-medium">
          Ganti penyimpanan (Memori → JDBC) tanpa merombak tampilan JTable.
        </p>
      </div>

      {/* Mosh-Style 4 Tactile Blocks + Crisp Vector Arrows */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-7">
        {nodes.map((node, idx) => {
          const isActive = activeNode === idx;
          const isFail = isActive && isError;
          return (
            <div key={idx} className="flex flex-col md:flex-row items-center gap-3 flex-1 w-full">
              <div className="w-full flex flex-col items-center space-y-2.5">
                <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-zinc-500">
                  {node.label}
                </span>
                <motion.div
                  animate={{
                    scale: isActive ? 1.07 : activeNode >= 0 ? 0.96 : 1,
                    opacity: activeNode >= 0 && !isActive ? 0.65 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`w-full min-h-[126px] rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-1.5 ${
                    isFail
                      ? 'bg-[#F43F5E] text-white shadow-[5px_5px_0px_#BE123C]'
                      : `${node.bg} ${node.shadow}`
                  }`}
                >
                  <h3 className={`text-lg font-black ${isFail ? 'text-white' : node.text}`}>
                    {node.title}
                  </h3>
                  <p className={`text-xs font-semibold ${isFail ? 'text-rose-100' : node.subText}`}>
                    {node.sub}
                  </p>
                </motion.div>
              </div>

              {idx < nodes.length - 1 && (
                <ArrowRight
                  className={`w-6 h-6 shrink-0 rotate-90 md:rotate-0 md:mt-6 transition-colors ${
                    activeNode === idx ? 'text-zinc-900' : 'text-zinc-300'
                  }`}
                  strokeWidth={3}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Live Status Pill */}
      <div
        className={`max-w-3xl mx-auto w-full px-5 py-3.5 rounded-2xl text-center font-bold text-sm mb-6 transition-colors ${
          isError
            ? 'bg-[#F43F5E] text-white shadow-[4px_4px_0px_#BE123C]'
            : scenario
            ? 'bg-[#312E81] text-white shadow-[4px_4px_0px_#1E1B4B]'
            : 'bg-[#ECEEF5] text-zinc-700'
        }`}
      >
        {statusBanner}
      </div>

      {/* Trigger Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => runScenario('load')}
          className="px-5 py-2.5 rounded-xl bg-[#4B5BF4] hover:bg-indigo-600 text-white font-extrabold text-xs shadow-[4px_4px_0px_#2D39B8] active:translate-y-0.5 flex items-center gap-2 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Muat Data (cariSemua)
        </button>
        <button
          onClick={() => runScenario('save-ok')}
          className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white font-extrabold text-xs shadow-[4px_4px_0px_#047857] active:translate-y-0.5 flex items-center gap-2 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Simpan Valid (Sukses)
        </button>
        <button
          onClick={() => runScenario('save-fail')}
          className="px-5 py-2.5 rounded-xl bg-[#F43F5E] hover:bg-rose-600 text-white font-extrabold text-xs shadow-[4px_4px_0px_#BE123C] active:translate-y-0.5 flex items-center gap-2 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Simpan Gagal (Konsisten)
        </button>
      </div>
    </div>
  );
}

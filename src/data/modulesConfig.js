import { SLIDES_LIST } from './slidesList';

export const SLIDES_LIST_MOD10 = [
  // Grup 1: Pengantar & Review
  { id: 0, title: 'Cover: JTable & Pemisahan TableModel' },
  { id: 1, title: 'Review: 4 Tahapan Penanganan Form' },
  { id: 2, title: 'Capaian Luaran & 3 Lapisan Data Tabel' },

  // Grup 2: Konsep Inti & Simulasi JTable
  { id: 3, title: 'Simulasi 1: JTable, JScrollPane & fireTableDataChanged' },
  { id: 4, title: 'Kontrak TableModel: Default vs Abstract' },
  { id: 5, title: 'Simulasi 2: Sorting Teks vs Angka (getColumnClass)' },
  { id: 6, title: 'Simulasi 3: Indeks View vs Indeks Model' },
  { id: 7, title: 'Posisi Bukan Identitas: Pakai ID Stabil' },
  { id: 8, title: 'Cuplikan Kode Inti: Barang, TableModel & Demo' },

  // Grup 3: Memori, Arsitektur & Alur Pembaruan
  { id: 9, title: 'Simulasi 4: TableModel Bukan Database' },
  { id: 10, title: 'Simulasi 5: Alur GUI → Service → DAO → Penyimpanan' },

  // Grup 4: Tugas & Penutup
  { id: 11, title: 'Kerjakan Tugas & Musik Lo-Fi' },
  { id: 12, title: 'Rangkuman Materi Modul 10' },
  { id: 13, title: 'Penutup & Sesi Tanya Jawab (Q&A)' },
];

export const MODULES_CONFIG = [
  {
    id: 'modul-09',
    pertemuan: 'Pertemuan 2',
    code: 'MODUL 09',
    title: 'Event Handling, Validasi & Navigasi',
    shortDesc:
      'Menghubungkan ActionListener, validasi input form, navigasi CardLayout, serta EDT & SwingWorker.',
    highlights: ['ActionListener', 'Validasi Form', 'CardLayout', 'SwingWorker'],
    slidesList: SLIDES_LIST,
    subSteps: {
      1: 3,  // ReviewLayoutManagerSlide (3 cards)
      2: 5,  // ReviewBorderLayoutSlide (5 regions)
      15: 5, // ErrorMessageBestPracticeSlide (3 cases x 2 states)
    },
  },
  {
    id: 'modul-10',
    pertemuan: 'Pertemuan 3',
    code: 'MODUL 10',
    title: 'JTable & Pemisahan TableModel',
    shortDesc:
      'Memisahkan model data dari tampilan JTable, sorting numerik, konversi indeks view ke model, serta arsitektur GUI–Service–DAO.',
    highlights: ['TableModel', 'getColumnClass', 'convertRowIndexToModel', 'GUI-Service-DAO'],
    slidesList: SLIDES_LIST_MOD10,
    subSteps: {
      1: 4, // Mod10ReviewStagesSlide (4 stages)
    },
  },
];

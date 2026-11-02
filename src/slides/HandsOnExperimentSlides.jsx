import { Info } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

/* =========================================================
   SLIDE 19: LANGKAH EKSPERIMEN 1 — STRUKTUR PROYEK pp2-p09-[nim]
   ========================================================= */
export function ExperimentSetupSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-6 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Langkah 1: Buat Proyek <code className="font-mono text-emerald-600">pp2-p09-[nim]</code>
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Siapkan proyek Java baru dengan format penamaan resmi, package <code className="font-mono bg-zinc-100 px-1 rounded">p09</code>, dan kelas <code className="font-mono bg-zinc-100 px-1 rounded">Main</code>:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
        <div className="bg-white border-2 border-zinc-300 rounded-xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold">
            01
          </div>
          <h3 className="font-bold text-zinc-900 text-base">Nama Proyek</h3>
          <div className="p-2.5 rounded-lg bg-zinc-900 text-emerald-300 font-mono text-xs font-bold">
            pp2-p09-[nim]
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Ganti <code className="font-mono bg-zinc-100 px-1 rounded">[nim]</code> dengan Nomor Induk Mahasiswa Anda masing-masing (contoh: <code className="font-mono bg-zinc-100 px-1 rounded">pp2-p09-233040001</code>).
          </p>
        </div>

        <div className="bg-white border-2 border-zinc-300 rounded-xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold">
            02
          </div>
          <h3 className="font-bold text-zinc-900 text-base">Package &amp; Kelas</h3>
          <div className="p-2.5 rounded-lg bg-zinc-900 text-sky-300 font-mono text-xs font-bold">
            src / p09 / Main.java
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Buat package bernama <code className="font-mono bg-zinc-100 px-1 rounded">p09</code> dan tempatkan kelas utama <code className="font-mono bg-zinc-100 px-1 rounded">Main</code> di dalamnya.
          </p>
        </div>

        <div className="bg-white border-2 border-zinc-300 rounded-xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-mono font-bold">
            03
          </div>
          <h3 className="font-bold text-zinc-900 text-base">Arsitektur Aplikasi</h3>
          <div className="p-2.5 rounded-lg bg-zinc-900 text-amber-300 font-mono text-xs font-bold">
            JFrame(&quot;Form inventori&quot;)
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Menggunakan <code className="font-mono bg-zinc-100 px-1 rounded">CardLayout</code> dengan 2 kartu (<code className="font-mono bg-zinc-100 px-1 rounded">&quot;form&quot;</code> dan <code className="font-mono bg-zinc-100 px-1 rounded">&quot;ringkas&quot;</code>) serta dialog validasi <code className="font-mono bg-zinc-100 px-1 rounded">JOptionPane</code>.
          </p>
        </div>
      </div>

      <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-mono text-emerald-950 flex items-center gap-2">
        <Info className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>
          Mari kita bedah kode lengkap <code className="font-bold">Main.java</code> sesuai Gambar 1 dan Gambar 2 pada modul praktikum di dua slide berikutnya!
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 20: KODE KELAS MAIN (GAMBAR 1 - BARIS 1 S.D. 29)
   ========================================================= */
export function ExperimentMainPart1Slide() {
  const mainPart1Code = `package p09;

import java.awt.*;
import javax.swing.*;

/**
 * @author wdgus
 */
public class Main {
    static void tampil() {
        JFrame f = new JFrame("Form inventori");
        CardLayout layout = new CardLayout();
        JPanel kartu = new JPanel(layout);
        JPanel form = new JPanel(new GridLayout(3, 2, 8, 8));
        JTextField nama = new JTextField(16), stok = new JTextField();
        JButton tinjau = new JButton("Tinjau");
        form.add(new JLabel("Nama")); form.add(nama);
        form.add(new JLabel("Stok")); form.add(stok);
        form.add(new JLabel("Belum disimpan")); form.add(tinjau);

        JPanel ringkas = new JPanel(new BorderLayout());
        JLabel hasil = new JLabel();
        JButton kembali = new JButton("Kembali");
        ringkas.add(hasil); ringkas.add(kembali, BorderLayout.SOUTH);
        kartu.add(form, "form"); kartu.add(ringkas, "ringkas");`;

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-5 border-b border-zinc-200 pb-3">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Eksperimen 1: Kode <code className="font-mono text-emerald-600">Main.java</code> (Gambar 1)
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Bagian 1 (Baris 1&ndash;29): Inisialisasi <code className="font-mono bg-zinc-100 px-1 rounded">JFrame</code>, <code className="font-mono bg-zinc-100 px-1 rounded">CardLayout</code>, kartu <code className="font-mono bg-zinc-100 px-1 rounded">&quot;form&quot;</code>, dan kartu <code className="font-mono bg-zinc-100 px-1 rounded">&quot;ringkas&quot;</code>:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8">
          <CodeBlock
            code={mainPart1Code}
            filename="src/p09/Main.java (Gambar 1)"
            label="Deklarasi UI & Kartu"
            tone="java"
          />
        </div>

        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              Kartu 1: Panel &quot;form&quot;
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Menggunakan <code className="font-mono bg-zinc-100 px-1 rounded">GridLayout(3, 2, 8, 8)</code> berisi input <code className="font-mono bg-zinc-100 px-1 rounded">nama</code>, <code className="font-mono bg-zinc-100 px-1 rounded">stok</code>, label jujur <em>&quot;Belum disimpan&quot;</em>, dan tombol <code className="font-mono bg-zinc-100 px-1 rounded">Tinjau</code>.
            </p>
          </div>

          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1">
            <span className="font-mono text-xs font-bold text-emerald-700 block">
              Kartu 2: Panel &quot;ringkas&quot;
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Menggunakan <code className="font-mono bg-zinc-100 px-1 rounded">BorderLayout()</code> berisi <code className="font-mono bg-zinc-100 px-1 rounded">JLabel hasil</code> di tengah dan tombol <code className="font-mono bg-zinc-100 px-1 rounded">Kembali</code> di bagian bawah (<code className="font-mono bg-zinc-100 px-1 rounded">SOUTH</code>).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 21: KODE KELAS MAIN (GAMBAR 2 - BARIS 30 S.D. 52)
   ========================================================= */
export function ExperimentMainPart2Slide() {
  const mainPart2Code = `        tinjau.addActionListener(e -> {
            try {
                int nilai = Integer.parseInt(stok.getText().trim());
                if (nama.getText().isBlank() || nilai < 0)
                    throw new IllegalArgumentException();
                hasil.setText(nama.getText().trim() + ": " + nilai);
                layout.show(kartu, "ringkas");
            } catch (IllegalArgumentException ex) {
                JOptionPane.showMessageDialog(f,
                    "Nama wajib diisi; stok bilangan bulat >= 0");
            }
        });
        kembali.addActionListener(e -> layout.show(kartu, "form"));
        f.add(kartu); f.pack(); f.setLocationRelativeTo(null);
        f.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        f.setVisible(true);
    }
    public static void main(String[] args) {
        SwingUtilities.invokeLater(Main::tampil);
    }
}`;

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-5 border-b border-zinc-200 pb-3">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Eksperimen 1: Kode <code className="font-mono text-emerald-600">Main.java</code> (Gambar 2)
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Bagian 2 (Baris 30&ndash;52): Pendaftaran <code className="font-mono bg-zinc-100 px-1 rounded">ActionListener</code>, validasi terpadu, dan pemanggilan <code className="font-mono bg-zinc-100 px-1 rounded">Main::tampil</code> di EDT:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8">
          <CodeBlock
            code={mainPart2Code}
            filename="src/p09/Main.java (Gambar 2)"
            label="Listener & Validasi"
            tone="java"
          />
        </div>

        <div className="lg:col-span-4 space-y-3">
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 shadow-sm space-y-1.5">
            <span className="font-mono text-xs font-bold text-emerald-800 block">
              Mengapa catch(IllegalArgumentException) Menangkap Keduanya?
            </span>
            <p className="text-xs text-emerald-950 leading-relaxed">
              Di Java, <code className="font-mono bg-white px-1 rounded">NumberFormatException</code> adalah <strong>subclass (anak)</strong> dari <code className="font-mono bg-white px-1 rounded">IllegalArgumentException</code>! Sehingga satu blok <code className="font-mono bg-white px-1 rounded">catch</code> ini otomatis menangkap error huruf (<code className="font-mono bg-white px-1 rounded">&quot;abc&quot;</code>), nama kosong, maupun stok negatif (<code className="font-mono bg-white px-1 rounded">&lt; 0</code>).
            </p>
          </div>

          <div className="bg-white border-2 border-zinc-200 rounded-xl p-4 shadow-sm space-y-1.5">
            <span className="font-mono text-xs font-bold text-zinc-800 block">
              Method Reference: Main::tampil
            </span>
            <p className="text-xs text-zinc-600 leading-relaxed">
              <code className="font-mono bg-zinc-100 px-1 rounded">SwingUtilities.invokeLater(Main::tampil)</code> setara dengan <code className="font-mono bg-zinc-100 px-1 rounded">() -&gt; Main.tampil()</code> untuk menjalankan GUI di atas EDT.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 22: LANGKAH EKSPERIMEN 2, 3, 4, DAN 7
   ========================================================= */
export function ExperimentWalkthroughSlide() {
  const steps = [
    {
      num: 'Langkah 2',
      title: 'Uji Input Sah (Buku & Stok 3)',
      desc: 'Jalankan program, isi Nama dengan "Buku" dan Stok dengan "3", lalu tekan tombol Tinjau. Pastikan tampilan berpindah dan ringkasan "Buku: 3" tampil.',
      badge: 'Happy Path',
    },
    {
      num: 'Langkah 3',
      title: 'Uji Navigasi Tombol Kembali',
      desc: 'Tekan tombol Kembali dari halaman ringkasan. Periksa bahwa data pada form ("Buku" dan "3") masih ada di kotak teks dan dapat diperbaiki.',
      badge: 'State Persistence',
    },
    {
      num: 'Langkah 4',
      title: 'Uji Penolakan Input Salah',
      desc: 'Uji secara berurutan dengan: (a) nama kosong, (b) stok kosong, (c) stok "abc", dan (d) stok "-1". Pastikan dialog JOptionPane muncul dan aplikasi tetap berada pada kartu form.',
      badge: 'Negative Test',
    },
    {
      num: 'Langkah 7',
      title: 'Uji Kegunaan Berpasangan (Pair Usability)',
      desc: 'Lakukan uji kegunaan berpasangan: minta rekan praktikan lain mencoba menggunakan aplikasi Anda TANPA instruksi lisan untuk menguji kejelasan antarmuka & pesan.',
      badge: 'Usability Test',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-6 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Langkah Eksperimen 2, 3, 4 &amp; 7: Prosedur Pengujian
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Setelah kode <code className="font-mono bg-zinc-100 px-1 rounded">Main.java</code> berhasil dikompilasi, lakukan tahapan eksperimen berikut:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((st, idx) => (
          <div key={idx} className="bg-white border-2 border-zinc-300 rounded-xl p-5 shadow-sm space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white bg-emerald-600 px-2.5 py-0.5 rounded">
                {st.num}
              </span>
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase bg-zinc-100 px-2 py-0.5 rounded">
                {st.badge}
              </span>
            </div>
            <h3 className="font-bold text-zinc-900 text-base">{st.title}</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">{st.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 23: TABEL LATIHAN RESMI MODUL 09
   ========================================================= */
export function ExerciseMatrixSlide() {
  const testCases = [
    {
      action: 'Buku / 3',
      expected: 'Ringkasan Buku: 3',
      status: 'Berpindah ke kartu "ringkas"',
      tone: 'emerald',
    },
    {
      action: 'Nama kosong',
      expected: 'Dialog validasi; tetap pada form',
      status: 'Muncul JOptionPane, kartu tidak pindah',
      tone: 'amber',
    },
    {
      action: 'Stok abc atau -1',
      expected: 'Dialog validasi; aplikasi tidak berhenti',
      status: 'Exception tertangkap aman (no crash)',
      tone: 'amber',
    },
    {
      action: 'Kembali lalu ubah stok',
      expected: 'Ringkasan mengikuti nilai baru',
      status: 'Data lama masih ada & ter-update saat Tinjau',
      tone: 'emerald',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-6 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Tabel Latihan: Pemeriksaan &amp; Pencatatan Bukti
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Jalankan pemeriksaan berikut pada data Latihan. <strong>Catat hasil aktual dan bukti (screenshot) secara terpisah</strong>:
        </p>
      </div>

      {/* Tabel Latihan Resmi (Halaman 9) */}
      <div className="bg-white border-2 border-zinc-300 rounded-xl overflow-hidden shadow-sm mb-4">
        <div className="grid grid-cols-12 bg-zinc-900 text-white p-3.5 font-mono text-xs font-bold uppercase">
          <div className="col-span-4">Kasus atau Tindakan</div>
          <div className="col-span-4">Hasil yang Diharapkan</div>
          <div className="col-span-4">Indikator Verifikasi Praktikan</div>
        </div>

        <div className="divide-y divide-zinc-200 text-xs">
          {testCases.map((tc, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 p-4 items-center gap-3 ${
                idx % 2 === 1 ? 'bg-zinc-50/80' : 'bg-white'
              }`}
            >
              <div className="col-span-4 font-mono font-bold text-zinc-900 text-sm">
                {tc.action}
              </div>
              <div className="col-span-4 font-semibold text-emerald-700">
                {tc.expected}
              </div>
              <div className="col-span-4">
                <span
                  className={`font-mono text-[11px] px-2.5 py-1 rounded inline-block font-medium ${
                    tc.tone === 'emerald'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}
                >
                  {tc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3.5 bg-zinc-100 rounded-xl text-xs font-mono text-zinc-700 flex items-center justify-between">
        <span>Pastikan setiap kasus diuji pada aplikasi yang sedang berjalan dan dicatat hasil aktualnya.</span>
        <span className="font-bold text-emerald-700">Slide berikutnya: Uji Coba di Simulator Live! &rarr;</span>
      </div>
    </div>
  );
}

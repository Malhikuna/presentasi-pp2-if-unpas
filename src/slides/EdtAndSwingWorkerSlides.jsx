import { useState } from 'react';
import { Cpu, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';

/* =========================================================
   SLIDE 15: 6. EDT DAN PEKERJAAN LAMBAT
   ========================================================= */
export function EdtConceptSlide() {
  const [simState, setSimState] = useState('idle'); // 'idle' | 'blocked' | 'worker'

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-6 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          6. Event Dispatch Thread (EDT) &amp; Pekerjaan Lambat
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Listener tindakan Swing dijalankan pada <strong>Event Dispatch Thread (EDT)</strong> yang juga bertugas menggambar ulang tampilan jendela:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
        {/* Aman di EDT */}
        <div className="bg-white border-2 border-emerald-500 rounded-xl p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-emerald-700 uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Aman Dijalankan Langsung di EDT</span>
            </div>
            <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">
              Cepat (&lt; beberapa ms)
            </span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Operasi ringan yang selesai seketika tidak akan mengganggu kelancaran antarmuka pengguna:
          </p>
          <ul className="text-xs text-zinc-800 space-y-1.5 font-mono">
            <li>&bull; Membaca nilai teks dari <code className="bg-zinc-100 px-1 rounded">JTextField</code></li>
            <li>&bull; Validasi singkat (<code className="bg-zinc-100 px-1 rounded">isEmpty</code>, <code className="bg-zinc-100 px-1 rounded">Integer.parseInt</code>)</li>
            <li>&bull; Pembentukan ringkasan kecil di memori</li>
            <li>&bull; Mengubah label &amp; berpindah kartu <code className="bg-zinc-100 px-1 rounded">CardLayout</code></li>
          </ul>
        </div>

        {/* Bahaya Memblokir EDT */}
        <div className="bg-white border-2 border-red-400 rounded-xl p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-red-100 pb-2.5">
            <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-red-700 uppercase">
              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Dilarang Dijalankan Langsung di EDT</span>
            </div>
            <span className="text-[11px] font-mono bg-red-50 text-red-700 px-2 py-0.5 rounded font-semibold">
              Memblokir GUI (Freeze!)
            </span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Pekerjaan lambat yang dijalankan langsung di dalam <code className="font-mono bg-zinc-100 px-1 rounded">ActionListener</code> akan membuat jendela <strong>Not Responding / membeku</strong>:
          </p>
          <ul className="text-xs text-zinc-800 space-y-1.5 font-mono">
            <li>&bull; Kueri / koneksi ke Basis Data (Database)</li>
            <li>&bull; Permintaan Jaringan (HTTP / Socket API)</li>
            <li>&bull; Pembacaan atau penulisan Berkas Besar (File I/O)</li>
            <li>&bull; Perhitungan komputasi yang berat</li>
          </ul>
        </div>
      </div>

      {/* Mini Interactive Comparison Bar */}
      <div className="bg-zinc-900 text-white rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex items-center gap-1.5">
            {simState === 'blocked' ? (
              <>
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 inline" />
                <span>EDT Terkunci: Tombol macet, jendela tidak bisa digeser atau ditutup sampai kueri selesai!</span>
              </>
            ) : simState === 'worker' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 inline" />
                <span>SwingWorker: Tugas berat jalan di Thread Pekerja, EDT tetap bebas merespons antarmuka!</span>
              </>
            ) : (
              <span>Klik simulasi di kanan untuk membandingkan efek pada Event Dispatch Thread:</span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSimState('blocked')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer font-bold transition-colors ${
              simState === 'blocked' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            Simulasi Blokir EDT
          </button>
          <button
            onClick={() => setSimState('worker')}
            className={`px-3 py-1.5 rounded-lg cursor-pointer font-bold transition-colors ${
              simState === 'worker' ? 'bg-emerald-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            Simulasi SwingWorker
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 16: TABEL ARSITEKTUR SWINGWORKER
   ========================================================= */
export function SwingWorkerTableSlide() {
  const rows = [
    {
      part: 'Listener sebelum execute()',
      thread: 'EDT (Event Dispatch Thread)',
      threadTone: 'emerald',
      duty: 'Baca dan validasi input dari komponen form; siapkan tampilan status proses ("Sedang menyimpan").',
    },
    {
      part: 'doInBackground()',
      thread: 'Thread Pekerja (Background)',
      threadTone: 'amber',
      duty: 'Jalankan pekerjaan lambat (database, file, jaringan) TANPA mengakses komponen Swing secara langsung.',
    },
    {
      part: 'process(...) jika digunakan',
      thread: 'EDT (Event Dispatch Thread)',
      threadTone: 'emerald',
      duty: 'Tampilkan pembaruan progres sementara yang dikirim melalui pemanggilan publish(...).',
    },
    {
      part: 'done()',
      thread: 'EDT (Event Dispatch Thread)',
      threadTone: 'emerald',
      duty: 'Ambil hasil akhir melalui get() dan perbarui tampilan komponen antarmuka (sukses atau gagal).',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-5 border-b border-zinc-200 pb-3">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          Arsitektur <code className="font-mono text-emerald-600">SwingWorker</code>: Pembagian Tugas Thread
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          <code className="font-mono bg-zinc-100 px-1 rounded">SwingWorker</code> memisahkan dengan tegas antara pekerjaan latar dan pembaruan komponen antarmuka:
        </p>
      </div>

      {/* Tabel Resmi Modul 09 */}
      <div className="bg-white border-2 border-zinc-300 rounded-xl overflow-hidden shadow-sm mb-4">
        <div className="grid grid-cols-12 bg-zinc-900 text-white p-3.5 font-mono text-xs font-bold uppercase">
          <div className="col-span-3">Bagian</div>
          <div className="col-span-3">Thread Eksekusi</div>
          <div className="col-span-6">Tanggung Jawab Utama</div>
        </div>

        <div className="divide-y divide-zinc-200 text-xs">
          {rows.map((r, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-12 p-3.5 items-center gap-3 ${
                idx % 2 === 1 ? 'bg-zinc-50/80' : 'bg-white'
              }`}
            >
              <div className="col-span-3 font-mono font-bold text-zinc-900">{r.part}</div>
              <div className="col-span-3">
                <span
                  className={`font-mono text-[11px] font-bold px-2.5 py-1 rounded inline-block ${
                    r.threadTone === 'amber'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {r.thread}
                </span>
              </div>
              <div className="col-span-6 text-zinc-700 leading-relaxed">{r.duty}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs font-mono text-red-950 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
        <span>
          Aturan Emas Thread-Safety Swing: Baca nilai komponen di EDT sebelum worker dijalankan. <strong>JANGAN membaca JTextField atau mengubah JLabel langsung dari doInBackground()!</strong>
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 17: 7. POLA INTEGRASI SWINGWORKER (7 LANGKAH NYATA)
   ========================================================= */
export function SwingWorkerIntegrationSlide() {
  const steps = [
    '1. Listener membaca dan memvalidasi seluruh masukan di EDT.',
    '2. Tombol tindakan dinonaktifkan sementara (setEnabled(false)) untuk mencegah pengiriman berulang.',
    '3. Status menyatakan “Sedang menyimpan”, tanpa mengklaim keberhasilan lebih awal.',
    '4. Worker menjalankan operasi service pada doInBackground().',
    '5. Pada done(), panggil get() untuk memperoleh hasil atau menangkap kegagalan pekerjaan.',
    '6. Jika berhasil, tampilkan konfirmasi sesuai hasil service. Jika gagal, pertahankan masukan & tampilkan saran perbaikan.',
    '7. Aktifkan kembali kontrol pada blok finally agar form tetap dapat digunakan setelah penanganan selesai.',
  ];

  const workerPatternCode = `// Contoh pola done() pada SwingWorker (Satu instance untuk satu tugas!)
@Override
protected void done() {
    try {
        HasilSimpan hasil = get(); // Ambil hasil di done(), JANGAN di listener!
        tampilkanKonfirmasi(hasil);
    } catch (CancellationException e) {
        pesanLabel.setText("Penyimpanan dibatalkan.");
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt(); // Pertahankan status interupsi
        pesanLabel.setText("Proses penyimpanan terinterupsi.");
    } catch (ExecutionException e) {
        Throwable sebab = e.getCause(); // Periksa penyebab asli dari doInBackground
        pesanLabel.setText("Gagal menyimpan ke server. Coba lagi.");
    } finally {
        simpanButton.setEnabled(true); // Langkah 7: Aktifkan kembali kontrol
    }
}`;

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-4 border-b border-zinc-200 pb-3">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          7. Pola Integrasi <code className="font-mono text-emerald-600">SwingWorker</code> untuk Penyimpanan Nyata
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          7 langkah alur integrasi service penyimpanan serta aturan penanganan eksepsi di <code className="font-mono bg-zinc-100 px-1 rounded">done()</code>:
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        <div className="lg:col-span-5 space-y-1.5">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="px-3.5 py-2 rounded-lg bg-white border border-zinc-200 text-xs text-zinc-700 leading-snug shadow-2xs"
            >
              {s}
            </div>
          ))}
        </div>

        <div className="lg:col-span-7 space-y-2.5">
          <CodeBlock
            code={workerPatternCode}
            filename="PolaSwingWorkerDone.java"
            label="Pola Integrasi"
            tone="java"
            maxHeight="max-h-[340px]"
          />
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] font-mono text-amber-950">
            Catatan: <code className="font-bold">execute()</code> menjadwalkan worker dan segera kembali (asinkron). Jangan memanggil <code className="font-bold">get()</code> di listener karena akan kembali memblokir EDT!
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SLIDE 18: 8. MENJAGA KEADAAN (STATE) FORM TETAP JELAS
   ========================================================= */
export function FormStateConsistencySlide() {
  const states = [
    {
      state: '1. Siap Menerima Masukan',
      badge: 'Ready / Idle',
      desc: 'Form aktif, field siap diketik oleh pengguna, tombol tindakan aktif, dan tidak ada klaim status palsu.',
    },
    {
      state: '2. Masukan Ditolak',
      badge: 'Validation Failed',
      desc: 'Tetap berada di kartu Form, isian pengguna dipertahankan, pesan perbaikan spesifik tampil, fokus diarahkan ke field salah.',
    },
    {
      state: '3. Proses Berlangsung',
      badge: 'In Progress (Worker)',
      desc: 'Hanya ada jika memakai penyimpanan nyata/latar: tombol dinonaktifkan sementara dan status menampilkan "Sedang menyimpan".',
    },
    {
      state: '4. Proses Selesai',
      badge: 'Completed / Summary',
      desc: 'Berpindah ke kartu Ringkasan atau menampilkan konfirmasi nyata sesuai hasil operasi yang benar-benar telah selesai.',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="mb-6 border-b border-zinc-200 pb-4">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight">
          8. Menjaga Keadaan (State) Form Tetap Jelas
        </h2>
        <p className="text-sm text-zinc-600 mt-1">
          Form yang baik membedakan 4 keadaan secara tegas dengan tampilan dan tindakan yang konsisten:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {states.map((st, idx) => (
          <div key={idx} className="bg-white border-2 border-zinc-300 rounded-xl p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-zinc-900 text-base">{st.state}</h3>
              <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                {st.badge}
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">{st.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 leading-relaxed">
          <strong className="font-mono text-zinc-900 block mb-0.5">Waspada Hasil Lama (Stale Worker Result):</strong>
          Jika hasil worker lama baru selesai ketika pengguna sudah mengedit masukan lain, jangan menampilkan hasil lama seolah mewakili masukan terbaru!
        </div>
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 leading-relaxed">
          <strong className="font-mono text-emerald-800 block mb-0.5">Sumber Kebenaran Keberhasilan:</strong>
          Kode tampilan tidak seharusnya menebak keberhasilan hanya dari perubahan label atau perpindahan panel; keberhasilan berasal dari hasil operasi yang memang dijalankan.
        </div>
      </div>
    </div>
  );
}

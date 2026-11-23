import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

function tokenizeCodeLine(line) {
  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('--') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
    const isError = trimmed.includes('❌') || trimmed.includes('Gagal') || trimmed.includes('Error') || trimmed.includes('Jangan');
    const isSuccess = trimmed.includes('✅') || trimmed.includes('Berhasil') || trimmed.includes('Success') || trimmed.includes('Sah');
    return [
      {
        type: isError ? 'comment-error' : isSuccess ? 'comment-success' : 'comment',
        value: line,
      },
    ];
  }

  // Regex handles Java, Swing, SQL & JS/JSX tokens
  const tokenRegex =
    /(\/\*[\s\S]*?\*\/|--.*$|\/\/.*$|'(?:\\.|[^'])*'|"(?:\\.|[^"])*"|`(?:\\.|[^`])*`|\b(?:package|import|public|private|protected|static|final|class|interface|extends|implements|void|return|new|try|catch|finally|throw|throws|if|else|for|while|switch|case|break|continue|true|false|null|this|super|var|const|let|function|export|default)\b|\b(?:int|long|double|float|boolean|char|byte|short|String|Integer|Long|Object|Class|List|ArrayList|Arrays|Exception|RuntimeException|IllegalArgumentException|NumberFormatException|IndexOutOfBoundsException|ExecutionException|InterruptedException|CancellationException|JFrame|JPanel|JButton|JLabel|JTextField|JTextArea|JScrollPane|JOptionPane|JTable|TableModel|DefaultTableModel|AbstractTableModel|ListSelectionModel|CardLayout|BorderLayout|GridLayout|BorderFactory|SwingUtilities|SwingWorker|ActionListener|ActionEvent|Override|Barang|BarangTableModel|BarangDao)\b|\b(?:addActionListener|actionPerformed|invokeLater|showMessageDialog|parseInt|getText|setText|trim|isEmpty|isBlank|requestFocusInWindow|selectAll|setEditable|setLineWrap|setWrapStyleWord|setCaretPosition|setDefaultCloseOperation|setContentPane|setLocationRelativeTo|setVisible|setSize|pack|show|add|createEmptyBorder|doInBackground|process|done|execute|get|setAutoCreateRowSorter|setSelectionMode|getSelectedRow|convertRowIndexToModel|convertRowIndexToView|getValueAt|getColumnClass|getColumnName|getRowCount|getColumnCount|isCellEditable|fireTableDataChanged|setData|getBarang|getId|getNama|getStok|cariSemua|asList|size)\b|\b[A-Z][A-Z0-9_]{2,}\b|\b\d+(?:_\d+)*L?\b|[{}()[\].,:;=?+-><|&!]+|\s+|[^\s]+)/g;

  const tokens = [];
  let match;

  while ((match = tokenRegex.exec(line)) !== null) {
    const val = match[0];

    if (/^\s+$/.test(val)) {
      tokens.push({ type: 'whitespace', value: val });
    } else if (val.startsWith('--') || val.startsWith('//') || val.startsWith('/*')) {
      tokens.push({ type: 'comment', value: val });
    } else if (/^['"`]/.test(val)) {
      tokens.push({ type: 'string', value: val });
    } else if (
      /^(package|import|public|private|protected|static|final|class|interface|extends|implements|void|return|new|try|catch|finally|throw|throws|if|else|for|while|switch|case|break|continue|true|false|null|this|super|var|const|let|function|export|default)$/.test(
        val
      )
    ) {
      tokens.push({ type: 'keyword', value: val });
    } else if (
      /^(int|long|double|float|boolean|char|byte|short|String|Integer|Long|Object|Class|List|ArrayList|Arrays|Exception|RuntimeException|IllegalArgumentException|NumberFormatException|IndexOutOfBoundsException|ExecutionException|InterruptedException|CancellationException|JFrame|JPanel|JButton|JLabel|JTextField|JTextArea|JScrollPane|JOptionPane|JTable|TableModel|DefaultTableModel|AbstractTableModel|ListSelectionModel|CardLayout|BorderLayout|GridLayout|BorderFactory|SwingUtilities|SwingWorker|ActionListener|ActionEvent|Override|Barang|BarangTableModel|BarangDao)$/.test(
        val
      )
    ) {
      tokens.push({ type: 'builtin', value: val });
    } else if (
      /^(addActionListener|actionPerformed|invokeLater|showMessageDialog|parseInt|getText|setText|trim|isEmpty|isBlank|requestFocusInWindow|selectAll|setEditable|setLineWrap|setWrapStyleWord|setCaretPosition|setDefaultCloseOperation|setContentPane|setLocationRelativeTo|setVisible|setSize|pack|show|add|createEmptyBorder|doInBackground|process|done|execute|get|setAutoCreateRowSorter|setSelectionMode|getSelectedRow|convertRowIndexToModel|convertRowIndexToView|getValueAt|getColumnClass|getColumnName|getRowCount|getColumnCount|isCellEditable|fireTableDataChanged|setData|getBarang|getId|getNama|getStok|cariSemua|asList|size)$/.test(
        val
      )
    ) {
      tokens.push({ type: 'method', value: val });
    } else if (/^[A-Z][A-Z0-9_]{2,}$/.test(val)) {
      tokens.push({ type: 'constant', value: val });
    } else if (/^\d+(?:_\d+)*L?$/.test(val)) {
      tokens.push({ type: 'number', value: val });
    } else if (/^[{}()[\];,.:->]+$/.test(val)) {
      tokens.push({ type: 'brace', value: val });
    } else {
      tokens.push({ type: 'ident', value: val });
    }
  }

  return tokens;
}

const TOKEN_CLASSES = {
  whitespace: '',
  comment: 'text-zinc-500 italic',
  'comment-error': 'text-rose-400 font-medium italic',
  'comment-success': 'text-emerald-400 font-medium italic',
  string: 'text-emerald-300',
  keyword: 'text-indigo-400 font-semibold',
  builtin: 'text-sky-300 font-medium',
  method: 'text-amber-200',
  constant: 'text-purple-300 font-semibold',
  number: 'text-amber-300',
  brace: 'text-zinc-400',
  ident: 'text-zinc-200',
};

export default function CodeBlock({
  code,
  filename,
  tone = 'java', // 'neutral' | 'error' | 'success' | 'java' | 'sql'
  maxHeight = 'max-h-[440px]',
}) {
  const [copied, setCopied] = useState(false);
  const lines = code.trim().split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const borderClass =
    tone === 'error'
      ? 'border-red-500/30 shadow-xs'
      : tone === 'success'
      ? 'border-emerald-500/30 shadow-xs'
      : 'border-zinc-800 shadow-xs';

  return (
    <div className={`rounded-xl border bg-[#18181B] overflow-hidden ${borderClass} flex flex-col font-mono`}>
      {/* Dark Window Header */}
      {filename && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#1F1F23] border-b border-zinc-800 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 mr-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <span className="font-semibold text-zinc-200">{filename}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Salin kode"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Dark Editor Code Body */}
      <div className={`p-4 overflow-x-auto overflow-y-auto font-mono text-[12px] leading-relaxed bg-[#18181B] ${maxHeight}`}>
        {lines.map((line, idx) => {
          const tokens = tokenizeCodeLine(line);
          return (
            <div key={idx} className="table-row group hover:bg-zinc-800/40 rounded px-1 -mx-1">
              <span className="table-cell select-none pr-4 text-right text-zinc-600 text-[11px] group-hover:text-zinc-400 transition-colors w-8">
                {idx + 1}
              </span>
              <span className="table-cell whitespace-pre">
                {tokens.map((tok, tIdx) => (
                  <span key={tIdx} className={TOKEN_CLASSES[tok.type] || 'text-zinc-200'}>
                    {tok.value}
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

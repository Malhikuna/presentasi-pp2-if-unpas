import { useState, useEffect, useRef } from 'react';
import { ChevronUp, LayoutGrid, Check, ChevronLeft, ChevronRight, Home } from 'lucide-react';

export default function FloatingNav({
  currentIndex,
  totalSlides,
  slidesList = [],
  modules = [],
  activeModuleId,
  onSelectModule,
  onGoHome,
  onPrev,
  onNext,
  onSelectSlide,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalSlides - 1;

  // Close popup when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      {/* 1. BOTTOM LEFT: HOME, MODULE SWITCHER & SLIDE COUNTER */}
      <div
        ref={menuRef}
        className={`fixed bottom-0 left-0 z-50 p-6 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 hover:opacity-100 focus-within:opacity-100'
        }`}
      >
        <div className="relative">
          {/* Slide & Module Selector Popup Drawer */}
          {isOpen && (
            <div className="absolute bottom-12 left-0 w-76 max-h-96 overflow-y-auto bg-white border border-zinc-200 rounded-xl shadow-lg p-2 space-y-2 mb-2 text-xs">
              {/* Quick Module Switcher */}
              {modules.length > 0 && (
                <div className="pb-2 border-b border-zinc-100 space-y-1">
                  <div className="px-2 py-1 font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                    Ganti Modul
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {modules.map((mod) => {
                      const isModActive = mod.id === activeModuleId;
                      return (
                        <button
                          key={mod.id}
                          onClick={() => {
                            onSelectModule?.(mod.id);
                            setIsOpen(false);
                          }}
                          className={`px-2 py-1.5 rounded-lg text-left font-mono text-[11px] transition-colors cursor-pointer ${
                            isModActive
                              ? 'bg-emerald-600 text-white font-bold'
                              : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                          }`}
                        >
                          <span className="block truncate">{mod.pertemuan}</span>
                          <span
                            className={`text-[9px] block ${
                              isModActive ? 'text-emerald-100' : 'text-zinc-500'
                            }`}
                          >
                            {mod.code}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <div className="px-2 py-1 border-b border-zinc-100 font-mono text-[11px] text-zinc-400 uppercase tracking-wider flex justify-between items-center">
                  <span>Daftar Slide</span>
                  <span>{totalSlides} Total</span>
                </div>
                <div className="space-y-0.5 pt-1">
                  {slidesList.map((item, idx) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={item.id ?? idx}
                        onClick={() => {
                          onSelectSlide(idx);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-zinc-900 text-white font-medium'
                            : 'text-zinc-700 hover:bg-zinc-100'
                        }`}
                      >
                        <div className="truncate flex items-center gap-2">
                          <span
                            className={`font-mono text-[10px] ${
                              isActive ? 'text-zinc-300' : 'text-zinc-400'
                            }`}
                          >
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="truncate">{item.title}</span>
                        </div>
                        {isActive && <Check className="w-3.5 h-3.5 shrink-0 text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Trigger Row: Home + Slide Counter */}
          <div className="flex items-center gap-1.5">
            {onGoHome && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onGoHome();
                }}
                className="flex items-center justify-center bg-white border border-zinc-200 rounded-lg p-2 shadow-sm hover:bg-zinc-50 transition-colors cursor-pointer text-zinc-600 hover:text-zinc-900"
                title="Kembali ke Beranda Pilih Modul"
              >
                <Home className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-2 bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono font-medium shadow-sm hover:bg-zinc-50 transition-colors cursor-pointer text-zinc-700"
              title="Lihat daftar slide & ganti modul"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-zinc-400" />
              <span>
                Slide <strong className="text-zinc-900">{String(currentIndex + 1).padStart(2, '0')}</strong> /{' '}
                {String(totalSlides).padStart(2, '0')}
              </span>
              <ChevronUp
                className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${
                  isOpen ? 'rotate-180 text-zinc-900' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 2. BOTTOM RIGHT: PREV & NEXT BUTTONS (COMPACT & FANCY ON HOVER) */}
      <div className="fixed bottom-0 right-0 z-50 p-6 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200 select-none">
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md border border-zinc-200/90 rounded-xl p-1 shadow-md shadow-zinc-950/5">
          {/* Prev Button */}
          <button
            onClick={onPrev}
            disabled={isFirst}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer ${
              isFirst
                ? 'text-zinc-300 cursor-not-allowed'
                : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 active:scale-95'
            }`}
            title="Slide Sebelumnya (Arrow Left)"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={isLast}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
              isLast
                ? 'text-zinc-300 cursor-not-allowed'
                : 'bg-zinc-900 text-white hover:bg-zinc-800 active:scale-95 shadow-2xs'
            }`}
            title="Slide Berikutnya (Arrow Right)"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
}

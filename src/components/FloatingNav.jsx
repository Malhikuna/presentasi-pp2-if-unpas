import { useState, useEffect, useRef } from 'react';
import { ChevronUp, LayoutGrid, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FloatingNav({
  currentIndex,
  totalSlides,
  slidesList = [],
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
      {/* 1. BOTTOM LEFT: SLIDE COUNTER & QUICK JUMP */}
      <div
        ref={menuRef}
        className={`fixed bottom-0 left-0 z-50 p-6 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 hover:opacity-100 focus-within:opacity-100'
        }`}
      >
        <div className="relative">
          {/* Slide Selector Popup Drawer */}
          {isOpen && (
            <div className="absolute bottom-12 left-0 w-72 max-h-80 overflow-y-auto bg-white border border-zinc-200 rounded-xl shadow-lg p-2 space-y-1 mb-2 text-xs">
              <div className="px-2 py-1.5 border-b border-zinc-100 font-mono text-[11px] text-zinc-400 uppercase tracking-wider flex justify-between items-center">
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
          )}

          {/* Trigger Button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 bg-white border border-zinc-200 rounded-lg px-3 py-2 text-xs font-mono font-medium shadow-sm hover:bg-zinc-50 transition-colors cursor-pointer text-zinc-700"
            title="Lihat daftar slide & lompat ke slide"
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

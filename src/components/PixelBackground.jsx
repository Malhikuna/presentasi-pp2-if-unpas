import { useMemo } from 'react';
import { motion } from 'framer-motion';

// Generates a grid of subtle monochrome pixel blocks that float/flicker
export default function PixelBackground() {
  // Left side pixels
  const leftPixels = useMemo(() => {
    const items = [];
    for (let r = 0; r < 24; r++) {
      for (let c = 0; c < 8; c++) {
        const seed = (r * 17 + c * 31) % 100;
        if (seed > 52) {
          items.push({
            id: `l-${r}-${c}`,
            row: r,
            col: c,
            size: seed % 3 === 0 ? 10 : seed % 2 === 0 ? 8 : 6,
            color: seed % 4 === 0 ? 'bg-zinc-950' : seed % 4 === 1 ? 'bg-zinc-800' : seed % 4 === 2 ? 'bg-zinc-400' : 'bg-white',
            baseOpacity: ((seed % 10) + 4) / 100, // 0.04 - 0.13 opacity
            duration: 3 + (seed % 5),
            delay: (seed % 20) * 0.2,
            driftY: (seed % 2 === 0 ? 1 : -1) * (8 + (seed % 12)),
          });
        }
      }
    }
    return items;
  }, []);

  // Right side pixels
  const rightPixels = useMemo(() => {
    const items = [];
    for (let r = 0; r < 24; r++) {
      for (let c = 0; c < 8; c++) {
        const seed = (r * 23 + c * 19) % 100;
        if (seed > 52) {
          items.push({
            id: `r-${r}-${c}`,
            row: r,
            col: c,
            size: seed % 3 === 0 ? 10 : seed % 2 === 0 ? 8 : 6,
            color: seed % 4 === 0 ? 'bg-zinc-950' : seed % 4 === 1 ? 'bg-zinc-800' : seed % 4 === 2 ? 'bg-zinc-400' : 'bg-white',
            baseOpacity: ((seed % 10) + 4) / 100,
            duration: 3 + (seed % 5),
            delay: (seed % 20) * 0.2,
            driftY: (seed % 2 === 0 ? 1 : -1) * (8 + (seed % 12)),
          });
        }
      }
    }
    return items;
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Left Flank Pixel Animation */}
      <div
        className="absolute top-0 bottom-0 left-0 w-36 lg:w-52"
        style={{
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div className="relative w-full h-full">
          {leftPixels.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                opacity: p.baseOpacity,
                y: 0,
              }}
              animate={{
                opacity: [p.baseOpacity, p.baseOpacity * 2.2, p.baseOpacity * 0.5, p.baseOpacity],
                y: [0, p.driftY, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute rounded-[1px] ${p.color}`}
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                top: `${(p.row / 24) * 100}%`,
                left: `${(p.col / 8) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Flank Pixel Animation */}
      <div
        className="absolute top-0 bottom-0 right-0 w-36 lg:w-52"
        style={{
          maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div className="relative w-full h-full">
          {rightPixels.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                opacity: p.baseOpacity,
                y: 0,
              }}
              animate={{
                opacity: [p.baseOpacity, p.baseOpacity * 2.2, p.baseOpacity * 0.5, p.baseOpacity],
                y: [0, p.driftY, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute rounded-[1px] ${p.color}`}
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                top: `${(p.row / 24) * 100}%`,
                right: `${(p.col / 8) * 100}%`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

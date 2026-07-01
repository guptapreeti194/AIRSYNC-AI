import React from "react"

// Helper to animate plane along a circle path using SVG
const PlaneSVG = ({ progress }: { progress: number }) => {
  // Circle path params
  const r = 80;
  const cx = 120;
  const cy = 100;
  // Angle for progress (0 = takeoff, 0.5 = top, 1 = land)
  const angle = 270 + progress * 360;
  const rad = (angle * Math.PI) / 180;
  // Plane position
  const x = cx + r * Math.cos(rad);
  const y = cy + r * Math.sin(rad);

  // Plane rotation (so nose points along path)
  const rotation = angle + 90;

  return (
    <svg width="240" height="200" style={{ position: "absolute", left: 0, top: 0 }}>
      {/* Circle path (for reference, faded) */}
      <circle cx={cx} cy={cy} r={r} stroke="#d1d5db" strokeDasharray="6 6" strokeWidth="2" fill="none" />
      {/* Realistic Plane */}
      <g transform={`translate(${x},${y}) rotate(${rotation})`}>
        {/* Fuselage */}
        <ellipse cx={0} cy={0} rx={18} ry={5} fill="#2563eb" />
        {/* Cockpit */}
        <ellipse cx={10} cy={0} rx={5} ry={4} fill="#60a5fa" />
        {/* Propeller */}
        <rect x={18} y={-1} width={8} height={2} rx={1} fill="#dbeafe" />
        <rect x={21} y={-4} width={2} height={8} rx={1} fill="#dbeafe" />
        {/* Main Wings
        <polygon points="-2,-2 -28,-18 0,0 28,-18 2,-2" fill="#2563eb" stroke="#1e40af" strokeWidth="1"/>
        <polygon points="-2,2 -28,18 0,0 28,18 2,2" fill="#2563eb" stroke="#1e40af" strokeWidth="1"/> */}
        {/* Tail horizontal stabilizer */}
        <polygon points="-16,-2 -24,-8 -18,0" fill="#2563eb" stroke="#1e40af" strokeWidth="1"/>
        <polygon points="-16,2 -24,8 -18,0" fill="#2563eb" stroke="#1e40af" strokeWidth="1"/>
        {/* Tail vertical stabilizer */}
        <polygon points="-18,0 -22,-10 -14,-6" fill="#2563eb" stroke="#1e40af" strokeWidth="1"/>
        {/* Wheels (only show when on ground) */}
        {progress < 0.05 || progress > 0.95 ? (
          <>
            <ellipse cx={-10} cy={7} rx={2} ry={2} fill="#374151" />
            <ellipse cx={-10} cy={-7} rx={2} ry={2} fill="#374151" />
            <ellipse cx={14} cy={7} rx={1.5} ry={1.5} fill="#374151" />
          </>
        ) : null}
      </g>
    </svg>
  );
};

const Loader: React.FC = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let frame: number;
    let start: number | undefined;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) / 2500; // 2.5s for full circle
      setProgress((elapsed % 1));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 via-gray-50 to-stone-100 dark:from-gray-900 dark:via-gray-800 dark:to-stone-900 z-[9999]">
      <div className="relative flex flex-col items-center" style={{ width: 240, height: 200 }}>
        {/* Animated Plane on circular path */}
        <PlaneSVG progress={progress} />
      </div>

      <style>{`
        @keyframes runway {
          0% { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
        
        @keyframes signal {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        
        @keyframes progress {
          0% { width: 10%; }
          50% { width: 70%; }
          100% { width: 90%; }
        }
        
        .animate-runway {
          animation: runway 1.2s linear infinite;
        }
        
        .animate-signal {
          animation: signal 1.5s ease-in-out infinite;
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Loader
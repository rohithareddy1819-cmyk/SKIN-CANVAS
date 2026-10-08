import { useEffect, useRef, useState } from 'react';
import { Upload, Scan, Sparkles, Info } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const SCAN_IMAGE = 'https://images.pexels.com/photos/6681652/pexels-photo-6681652.jpeg?auto=compress&cs=tinysrgb&h=900&w=700';

const analysisPoints = [
  { id: 'forehead', label: 'Texture', x: 50, y: 18, delay: 600 },
  { id: 'left-cheek', label: 'Hydration', x: 28, y: 45, delay: 1000 },
  { id: 'right-cheek', label: 'Tone', x: 72, y: 45, delay: 1400 },
  { id: 'nose', label: 'Pores', x: 50, y: 52, delay: 1800 },
  { id: 'left-eye', label: 'Fine Lines', x: 38, y: 35, delay: 2200 },
  { id: 'right-eye', label: 'Fine Lines', x: 62, y: 35, delay: 2400 },
  { id: 'chin', label: 'Oiliness', x: 50, y: 70, delay: 2800 },
  { id: 'jaw', label: 'Sensitivity', x: 50, y: 82, delay: 3200 },
];

const phases = ['idle', 'scanning', 'mapping', 'complete'] as const;

export default function SkinAnalysis() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [phase, setPhase] = useState<typeof phases[number]>('idle');
  const [scanProgress, setScanProgress] = useState(0);
  const [activePoints, setActivePoints] = useState<Set<string>>(new Set());
  const timersRef = useRef<number[]>([]);

  const startAnalysis = () => {
    clearTimers();
    setPhase('scanning');
    setScanProgress(0);
    setActivePoints(new Set());

    const scanDuration = 3000;
    const scanStart = performance.now();
    const scanAnim = (now: number) => {
      const p = Math.min((now - scanStart) / scanDuration, 1);
      setScanProgress(p * 100);
      if (p < 1) requestAnimationFrame(scanAnim);
      else setPhase('mapping');
    };
    requestAnimationFrame(scanAnim);

    analysisPoints.forEach((pt) => {
      const t = window.setTimeout(() => {
        setActivePoints((prev) => new Set(prev).add(pt.id));
      }, scanDuration + pt.delay);
      timersRef.current.push(t);
    });

    const completeTimer = window.setTimeout(() => {
      setPhase('complete');
    }, scanDuration + 3800);
    timersRef.current.push(completeTimer);
  };

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    if (visible && phase === 'idle') {
      const t = window.setTimeout(startAnalysis, 400);
      timersRef.current.push(t);
    }
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const showPoints = phase === 'mapping' || phase === 'complete';
  const showMap = phase === 'complete';

  return (
    <section id="analysis" className="relative bg-charcoal-900 py-24 lg:py-40 overflow-hidden">
      {/* AI grid overlay */}
      <div className="absolute inset-0 scan-grid opacity-50" />
      {/* Ambient AI glow */}
      <div className="ambient-blob h-[500px] w-[500px] bg-ai-400/8 top-1/4 left-1/4 animate-glow-pulse" />
      <div className="ambient-blob h-[400px] w-[400px] bg-sage-600/6 bottom-1/4 right-1/4 animate-glow-pulse" style={{ animationDelay: '2s' }} />

      <div ref={ref} className="relative-z mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-16 text-center`}>
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-sage-400/50" />
            <p className="editorial-eyebrow text-sage-300">AI Skin Analysis</p>
            <div className="h-px w-8 bg-sage-400/50" />
          </div>
          <h2 className="font-serif text-display-2 font-light text-ivory-50">
            MEET <span className="italic font-extralight text-sage-300">YOUR SKIN.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Image / Scanner */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm bg-charcoal-800 shadow-2xl shadow-ai-400/10">
              <img
                src={SCAN_IMAGE}
                alt="Skin analysis portrait"
                className={`h-full w-full object-cover transition-all duration-700 ${
                  phase === 'idle' ? 'opacity-30 grayscale' : phase === 'scanning' ? 'opacity-60' : 'opacity-90'
                }`}
              />

              {/* Scan grid overlay during scanning */}
              {phase === 'scanning' && (
                <div className="absolute inset-0 scan-grid" />
              )}

              {/* Corner brackets */}
              <div className="pointer-events-none absolute inset-3">
                <div className="absolute top-0 left-0 h-5 w-5 border-l border-ai-300/50" />
                <div className="absolute top-0 right-0 h-5 w-5 border-r border-ai-300/50" />
                <div className="absolute bottom-0 left-0 h-5 w-5 border-b border-ai-300/50" />
                <div className="absolute bottom-0 right-0 h-5 w-5 border-b border-ai-300/50" />
              </div>

              {/* Scan line */}
              {phase === 'scanning' && (
                <>
                  <div
                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-ai-300 to-transparent shadow-[0_0_24px_rgba(168,184,208,0.7)]"
                    style={{ top: `${scanProgress}%` }}
                  />
                  <div
                    className="absolute inset-x-0 h-32 bg-gradient-to-b from-ai-300/15 to-transparent"
                    style={{ top: `${scanProgress - 15}%` }}
                  />
                </>
              )}

              {/* Analysis points */}
              {showPoints && analysisPoints.map((pt) => (
                <div
                  key={pt.id}
                  className="absolute"
                  style={{ left: `${pt.x}%`, top: `${pt.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`relative transition-all duration-500 ${activePoints.has(pt.id) ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                    {/* Pulse ring */}
                    <div className="absolute -inset-2 rounded-full border border-ai-300/30 animate-pulse-soft" />
                    <div className="h-3 w-3 rounded-full border-2 border-ai-300 bg-ai-300/40 shadow-[0_0_10px_rgba(168,184,208,0.5)]" />
                    {showMap && (
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-charcoal-900/85 backdrop-blur-sm px-3 py-1 border border-ai-300/20">
                        <span className="font-sans text-[0.65rem] font-medium text-ai-200">{pt.label}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Idle overlay */}
              {phase === 'idle' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-charcoal-600 bg-charcoal-800/50">
                    <Upload className="h-6 w-6 text-charcoal-400" />
                  </div>
                  <p className="font-sans text-xs text-charcoal-400">Upload a skin photo to begin</p>
                </div>
              )}

              {/* Phase indicator */}
              {phase !== 'idle' && (
                <div className="absolute bottom-0 inset-x-0 flex items-center justify-between bg-gradient-to-t from-charcoal-900/95 to-transparent px-4 pb-4 pt-16">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${phase === 'complete' ? 'bg-sage-400' : 'bg-ai-300 animate-pulse-soft'}`} />
                    <span className="font-sans text-xs text-ai-200">
                      {phase === 'scanning' && 'Scanning...'}
                      {phase === 'mapping' && 'Mapping characteristics...'}
                      {phase === 'complete' && 'Analysis complete'}
                    </span>
                  </div>
                  {phase === 'scanning' && (
                    <span className="font-sans text-xs text-ai-300 font-medium tabular-nums">{Math.round(scanProgress)}%</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Analysis info */}
          <div className="lg:col-span-7 lg:pt-4">
            <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''}`}>
              <h3 className="font-serif text-2xl font-light text-ivory-50 mb-2">
                Visible skin characteristics
              </h3>
              <p className="font-sans text-sm text-charcoal-400 mb-8">Identified across 8 facial regions</p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
                {['Hydration', 'Texture', 'Tone', 'Redness', 'Pores', 'Fine Lines', 'Oiliness', 'Sensitivity'].map((trait, i) => (
                  <div
                    key={trait}
                    className={`flex items-center gap-2.5 transition-all duration-500 ${showPoints ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
                    style={{ transitionDelay: `${showPoints ? i * 100 : 0}ms` }}
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-charcoal-800 border border-charcoal-700">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-300" />
                    </div>
                    <span className="font-sans text-sm text-ivory-200">{trait}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-start gap-3 rounded-xl border border-charcoal-700 bg-charcoal-800/40 p-5">
                <Info className="h-4 w-4 mt-0.5 shrink-0 text-sage-400" />
                <p className="font-sans text-xs leading-relaxed text-charcoal-400">
                  AI-generated insights are for informational purposes and are not a medical diagnosis.
                </p>
              </div>

              {phase === 'complete' && (
                <div className="mt-8 flex items-center gap-3 rounded-xl bg-sage-600/10 border border-sage-600/20 p-4 animate-fade-up">
                  <Sparkles className="h-5 w-5 text-sage-300" />
                  <p className="font-sans text-sm text-ivory-100">
                    Your personalized skin profile is ready. <a href="#profile" className="underline text-sage-300 hover:text-sage-200 transition-colors">View profile →</a>
                  </p>
                </div>
              )}

              <button
                onClick={startAnalysis}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-charcoal-700 px-4 py-2.5 font-sans text-sm text-ai-300 transition-all hover:border-ai-400/40 hover:bg-charcoal-800/50"
              >
                <Scan className="h-4 w-4" />
                Re-run analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useRef, ChangeEvent } from 'react';
import { Upload, RotateCw, Info, CheckCircle2, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

interface DiagnosticItem {
  id: string;
  name: string;
  score: number;
  status: 'Optimal' | 'Needs Attention' | 'Good';
  badgeColor: string;
  barColor: string;
  description: string;
  rx: string;
  // Position on facial image (%)
  dotPos?: { x: number; y: number };
}

const DIAGNOSTICS: DiagnosticItem[] = [
  {
    id: 'hydration',
    name: 'Hydration',
    score: 79,
    status: 'Optimal',
    badgeColor: 'border-[#f59e0b]/40 bg-[#f59e0b]/15 text-[#fbbf24]',
    barColor: 'bg-[#fbbf24]',
    description: '79% dermal water retention capability.',
    rx: 'Rx: Use Hyaluronic Acid + Ceramide rich daily fluid.',
    dotPos: { x: 33, y: 44 },
  },
  {
    id: 'texture',
    name: 'Texture',
    score: 63,
    status: 'Needs Attention',
    badgeColor: 'border-[#d97706]/40 bg-[#d97706]/15 text-[#f59e0b]',
    barColor: 'bg-[#f59e0b]',
    description: '63% surface smoothness score with low keratin accumulation.',
    rx: 'Rx: Niacinamide (5%) or gentle enzymatic peeling.',
    dotPos: { x: 50, y: 17 },
  },
  {
    id: 'tone',
    name: 'Tone Evenness',
    score: 83,
    status: 'Optimal',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400',
    barColor: 'bg-emerald-400',
    description: '83% pigment dispersion consistency across dermal layers.',
    rx: 'Rx: Ascorbic Acid (Vitamin C) antioxidant photoprotection.',
    dotPos: { x: 74, y: 44 },
  },
  {
    id: 'redness',
    name: 'Redness (Erythema)',
    score: 45,
    status: 'Needs Attention',
    badgeColor: 'border-rose-500/40 bg-rose-500/15 text-rose-400',
    barColor: 'bg-rose-400',
    description: 'Vascular reactivity index evaluated as elevated.',
    rx: 'Rx: Centella Asiatica (Cica) & soothing oat extract.',
  },
  {
    id: 'pores',
    name: 'Pores',
    score: 58,
    status: 'Good',
    badgeColor: 'border-amber-500/40 bg-amber-500/15 text-amber-300',
    barColor: 'bg-amber-400',
    description: 'Follicular dilation rated as enlarged.',
    rx: 'Rx: Salicylic Acid (BHA 1-2%) to clear follicular sebum.',
    dotPos: { x: 52, y: 50 },
  },
  {
    id: 'oiliness',
    name: 'Oiliness',
    score: 85,
    status: 'Optimal',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400',
    barColor: 'bg-emerald-400',
    description: 'Sebaceous secretion rate is balanced.',
    rx: 'Rx: Zinc PCA with lightweight water-gel hydration.',
    dotPos: { x: 52, y: 70 },
  },
  {
    id: 'fine-lines',
    name: 'Fine Lines',
    score: 84,
    status: 'Optimal',
    badgeColor: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400',
    barColor: 'bg-emerald-400',
    description: 'Intact collagen matrix with strong elastic rebound.',
    rx: 'Rx: Daily broad-spectrum SPF 50+ mineral filter.',
    dotPos: { x: 37, y: 35 },
  },
  {
    id: 'sensitivity',
    name: 'Sensitivity',
    score: 48,
    status: 'Needs Attention',
    badgeColor: 'border-rose-500/40 bg-rose-500/15 text-rose-400',
    barColor: 'bg-rose-400',
    description: 'Barrier resilience index estimated at reactive threshold.',
    rx: 'Rx: Fragrance-free barrier repair balm with phytoceramides.',
    dotPos: { x: 52, y: 83 },
  },
];

// Additional point shown on image: Radiance
const EXTRA_POINTS = [
  { id: 'radiance', label: 'Radiance', x: 69, y: 35 },
];

export default function SkinAnalysis() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [activeTab, setActiveTab] = useState<'diagnostics' | 'plan'>('diagnostics');
  const [selectedPhoto, setSelectedPhoto] = useState<string>('/analyzed-photo.jpg');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(100);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [activeTime, setActiveTime] = useState('23:10');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startScanAnimation = () => {
    setIsScanning(true);
    setScanProgress(0);

    const startTime = performance.now();
    const duration = 2400;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      setScanProgress(progress);

      if (progress < 100) {
        requestAnimationFrame(animate);
      } else {
        setIsScanning(false);
        const nowObj = new Date();
        const hrs = String(nowObj.getHours()).padStart(2, '0');
        const mins = String(nowObj.getMinutes()).padStart(2, '0');
        setActiveTime(`${hrs}:${mins}`);
      }
    };

    requestAnimationFrame(animate);
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedPhoto(url);
      startScanAnimation();
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section
      id="analysis"
      className="relative overflow-hidden py-20 lg:py-32 text-zinc-100"
      style={{
        backgroundColor: '#111216',
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
        `,
        backgroundSize: '36px 36px',
      }}
    >
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Subtle radial ambient glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/8 blur-[130px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/6 blur-[120px]" />

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        
        {/* Eyebrow & Title Header */}
        <div className={`mb-8 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="mb-3.5 flex items-center justify-center gap-3">
            <span className="h-[1px] w-7 bg-zinc-600/70" />
            <p className="text-[11px] font-medium tracking-[0.22em] text-zinc-400 uppercase">
              INTELLIGENT FACIAL DIAGNOSTICS
            </p>
            <span className="h-[1px] w-7 bg-zinc-600/70" />
          </div>

          <h2 className="font-['Bodoni_Moda',serif] text-4xl sm:text-5xl lg:text-6xl font-normal tracking-wide text-zinc-100">
            MEET <span className="italic font-light text-[#cbd5e1]">YOUR SKIN.</span>
          </h2>

          <p className="mx-auto mt-3.5 max-w-2xl text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
            Upload your photo or selfie to let our computer vision algorithm accurately analyze your dermal characteristics across 8 clinical biometric facial regions.
          </p>

          {/* Upload Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={triggerUpload}
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_0_24px_rgba(147,51,234,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_rgba(147,51,234,0.6)] active:scale-95 bg-gradient-to-r from-[#9333ea] via-[#7c3aed] to-[#6366f1]"
            >
              <Upload className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Upload Your Photo
            </button>
          </div>
        </div>

        {/* Main Grid: Left Scanner + Right Diagnostics */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-start">
          
          {/* ── Left Column: Analyzed Photo / Scanner ── */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[390px] rounded-2xl sm:rounded-3xl border border-zinc-800/90 bg-[#16171d]/90 p-3 shadow-2xl backdrop-blur-md">
              
              {/* Corner Bracket (Top Right) */}
              <div className="pointer-events-none absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-purple-400/50" />

              {/* Photo Display Card */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-950">
                {/* Photo Image */}
                <img
                  src={selectedPhoto}
                  alt="Biometric Facial Analysis"
                  className={`h-full w-full object-cover transition-all duration-700 ${
                    isScanning ? 'scale-105 brightness-90 filter' : 'scale-100 brightness-100'
                  }`}
                />

                {/* Scanning Laser Line */}
                {isScanning && (
                  <div
                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee] pointer-events-none transition-all z-20"
                    style={{ top: `${scanProgress}%` }}
                  >
                    <div className="absolute inset-x-0 -top-12 h-12 bg-gradient-to-b from-transparent to-cyan-500/20" />
                  </div>
                )}

                {/* Interactive Hotspots / Dynamic Badges */}
                {DIAGNOSTICS.filter(d => d.dotPos).map((pt) => {
                  const isHovered = hoveredPoint === pt.id;
                  const isDefaultPhoto = selectedPhoto.includes('analyzed');

                  if (isDefaultPhoto) {
                    // For the 2nd photo (which already has crisp labels rendered), overlay glowing interactive hover hotspot
                    return (
                      <div
                        key={pt.id}
                        className="absolute cursor-pointer z-10 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${pt.dotPos!.x}%`,
                          top: `${pt.dotPos!.y}%`,
                        }}
                        onMouseEnter={() => setHoveredPoint(pt.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <div
                          className={`h-7 w-20 rounded-full transition-all duration-200 ${
                            isHovered
                              ? 'ring-2 ring-purple-400 bg-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-110'
                              : 'hover:bg-white/10'
                          }`}
                        />
                      </div>
                    );
                  }

                  // For custom uploaded photos, render the full dynamic pins and badges
                  return (
                    <div
                      key={pt.id}
                      className="absolute transition-transform duration-300 cursor-pointer z-10"
                      style={{
                        left: `${pt.dotPos!.x}%`,
                        top: `${pt.dotPos!.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseEnter={() => setHoveredPoint(pt.id)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      <div className="relative flex items-center">
                        <div className={`absolute -inset-1.5 rounded-full border border-zinc-400/50 ${isHovered ? 'scale-125 border-purple-400 bg-purple-500/30' : 'animate-pulse'}`} />
                        <div className={`h-2.5 w-2.5 rounded-full border border-white shadow-md ${isHovered ? 'bg-purple-300' : 'bg-zinc-200/90'}`} />
                        <div className={`ml-2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium border shadow-lg backdrop-blur-md transition-all ${
                          isHovered
                            ? 'bg-purple-900/90 border-purple-400 text-white scale-105'
                            : 'bg-black/75 border-zinc-700/80 text-zinc-100'
                        }`}>
                          {pt.name}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Extra Point: Radiance */}
                {EXTRA_POINTS.map((pt) => {
                  const isHovered = hoveredPoint === pt.id;
                  const isDefaultPhoto = selectedPhoto.includes('analyzed');

                  if (isDefaultPhoto) {
                    return (
                      <div
                        key={pt.id}
                        className="absolute cursor-pointer z-10 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${pt.x}%`,
                          top: `${pt.y}%`,
                        }}
                        onMouseEnter={() => setHoveredPoint(pt.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                      >
                        <div
                          className={`h-7 w-20 rounded-full transition-all duration-200 ${
                            isHovered
                              ? 'ring-2 ring-purple-400 bg-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.5)] scale-110'
                              : 'hover:bg-white/10'
                          }`}
                        />
                      </div>
                    );
                  }

                  return (
                    <div
                      key={pt.id}
                      className="absolute transition-transform duration-300 cursor-pointer z-10"
                      style={{
                        left: `${pt.x}%`,
                        top: `${pt.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      onMouseEnter={() => setHoveredPoint(pt.id)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      <div className="relative flex items-center">
                        <div className={`absolute -inset-1.5 rounded-full border border-zinc-400/50 ${isHovered ? 'scale-125 border-purple-400 bg-purple-500/30' : 'animate-pulse'}`} />
                        <div className={`h-2.5 w-2.5 rounded-full border border-white shadow-md ${isHovered ? 'bg-purple-300' : 'bg-zinc-200/90'}`} />
                        <div className={`ml-2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium border shadow-lg backdrop-blur-md transition-all ${
                          isHovered
                            ? 'bg-purple-900/90 border-purple-400 text-white scale-105'
                            : 'bg-black/75 border-zinc-700/80 text-zinc-100'
                        }`}>
                          {pt.label}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Bottom Overlay Status Bar - for custom photos or when scanning */}
                {(!selectedPhoto.includes('analyzed') || isScanning) && (
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 py-3 text-xs z-20">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="font-sans text-[11px] font-medium text-zinc-200">
                        {isScanning ? `Analyzing photo... ${Math.round(scanProgress)}%` : 'Uploaded photo analyzed'}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-zinc-400">{activeTime}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons Below Photo */}
              <div className="mt-3.5 flex items-center justify-between px-1 text-xs text-zinc-400">
                <button
                  onClick={triggerUpload}
                  className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors py-1"
                >
                  <ImageIcon className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Upload new photo</span>
                </button>
                <button
                  onClick={startScanAnimation}
                  className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors py-1"
                >
                  <RotateCw className={`h-3.5 w-3.5 text-zinc-400 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>Re-run AI scan</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Right Column: Diagnostic & Classification Results ── */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            
            {/* Top Card: Skin Classification */}
            <div className="rounded-2xl border border-zinc-800/90 bg-[#181920]/95 p-5 sm:p-6 shadow-xl backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                
                {/* Left side classification info */}
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-purple-400">
                      SKIN CLASSIFICATION
                    </span>
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-950/60 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      Custom Photo
                    </span>
                  </div>

                  <h3 className="mt-1 text-xl sm:text-2xl font-serif text-white tracking-wide font-normal">
                    Combination (Standard)
                  </h3>

                  {/* Classification Pills */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {['#Combination', '#Mild Dehydration', '#Balanced', '#Erythema Prone'].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-zinc-700/60 bg-zinc-800/80 px-2.5 py-0.5 text-xs font-mono text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right side: Health Index */}
                <div className="flex items-center sm:items-end gap-3 self-end sm:self-auto">
                  <div className="text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                      HEALTH INDEX
                    </p>
                    <div className="flex items-baseline justify-end gap-0.5">
                      <span className="text-3xl font-light text-white">75</span>
                      <span className="text-xs text-zinc-400">/100</span>
                    </div>
                  </div>

                  {/* Flower/Sparkle Icon Badge */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700/70 bg-zinc-800/90 text-purple-300 shadow-inner">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-6 border-b border-zinc-800/80 pb-2 text-xs sm:text-sm">
              <button
                onClick={() => setActiveTab('diagnostics')}
                className={`font-medium transition-colors pb-2 -mb-2 border-b-2 ${
                  activeTab === 'diagnostics'
                    ? 'text-white border-purple-400 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 border-transparent'
                }`}
              >
                8 Diagnostic Characteristics
              </button>
              <button
                onClick={() => setActiveTab('plan')}
                className={`font-medium transition-colors pb-2 -mb-2 border-b-2 ${
                  activeTab === 'plan'
                    ? 'text-white border-purple-400 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 border-transparent'
                }`}
              >
                Prioritized Action Plan
              </button>
            </div>

            {/* Diagnostics View */}
            {activeTab === 'diagnostics' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {DIAGNOSTICS.map((item) => {
                  const isHovered = hoveredPoint === item.id;
                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredPoint(item.id)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      className={`group rounded-xl border p-4 transition-all duration-300 ${
                        isHovered
                          ? 'border-purple-400/70 bg-[#1f2029] shadow-[0_0_15px_rgba(168,85,247,0.15)] scale-[1.01]'
                          : 'border-zinc-800/90 bg-[#181920]/95 hover:border-zinc-700'
                      }`}
                    >
                      {/* Title & Status Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-sans text-xs sm:text-sm font-semibold text-zinc-100">
                          {item.name}
                        </span>
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] sm:text-[11px] font-medium ${item.badgeColor}`}>
                          {item.score}/100 • {item.status}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800/80">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${item.barColor}`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>

                      {/* Description */}
                      <p className="mt-2 text-[11px] sm:text-xs text-zinc-300/90 leading-snug">
                        {item.description}
                      </p>

                      {/* Rx Recommendation */}
                      <p className="mt-1 text-[11px] text-zinc-400 leading-snug font-mono">
                        {item.rx}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Action Plan View */}
            {activeTab === 'plan' && (
              <div className="space-y-3">
                <div className="rounded-xl border border-zinc-800/90 bg-[#181920]/95 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-rose-400 uppercase tracking-wide">
                      Priority 1 • Barrier Recovery & Soothing
                    </span>
                    <span className="rounded-full border border-rose-500/40 bg-rose-500/15 px-2 py-0.5 text-[10px] text-rose-400">
                      Immediate (Days 1–14)
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-300">
                    Address elevated vascular erythema and fragile moisture barrier with Centella Asiatica (Cica), colloidal oatmeal, and ceramide NP balm.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800/90 bg-[#181920]/95 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                      Priority 2 • Pore Clarity & Gentle Texture
                    </span>
                    <span className="rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[10px] text-amber-300">
                      Weekly (Days 14–30)
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-300">
                    Incorporate BHA (Salicylic Acid 1.5%) micro-dosing twice weekly to clear sebum while buffering with 5% Niacinamide serum.
                  </p>
                </div>

                <div className="rounded-xl border border-zinc-800/90 bg-[#181920]/95 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">
                      Priority 3 • Cellular Defense & Hydration Retention
                    </span>
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-400">
                      Ongoing Maintenance
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-300">
                    Maintain optimal collagen density and even tone with daily broad-spectrum SPF 50+ mineral shield and multi-weight Hyaluronic Acid fluid.
                  </p>
                </div>
              </div>
            )}

            {/* Disclaimer Box */}
            <div className="flex items-start gap-3 rounded-xl border border-zinc-800/80 bg-[#181a20]/70 p-3.5 text-xs text-zinc-400">
              <Info className="h-4 w-4 shrink-0 text-zinc-400 mt-0.5" />
              <p className="leading-relaxed text-[11px] sm:text-xs">
                AI insights evaluate epidermal surface parameters for cosmetic optimization. Insights are purely educational and do not constitute a medical diagnosis.
              </p>
            </div>

            {/* Bottom Profile CTA Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-zinc-800/90 bg-[#181920]/95 p-4 sm:p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-300">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-zinc-200">
                  Profile updated from your photo. Ready to view tailored product recommendations.
                </p>
              </div>

              <a
                href="#profile"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-100 hover:shadow-lg active:scale-95"
              >
                <span>View Skin Profile</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

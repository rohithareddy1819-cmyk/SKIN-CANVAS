import { useReveal, useCountUp } from '@/hooks/useReveal';
import { hydrationTrend, textureTrend } from '@/data/products';
import { Calendar, TrendingUp, CheckCircle2 } from 'lucide-react';

function TrendChart({ data, label, color, start }: { data: { label: string; value: number }[]; label: string; color: string; start: boolean }) {
  const width = 500;
  const height = 160;
  const padding = 30;
  const maxVal = 100;
  const minVal = 50;

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1)) * (width - padding * 2),
    y: height - padding - ((d.value - minVal) / (maxVal - minVal)) * (height - padding * 2),
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="font-sans text-sm font-medium text-charcoal-700">{label}</span>
        <span className="font-sans text-xs text-charcoal-400">
          {data[0].value} → <span className="font-medium text-sage-600">{data[data.length - 1].value}</span>
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`${label}-grad`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((g) => (
          <line
            key={g}
            x1={padding} x2={width - padding}
            y1={height - padding - (g / 100) * (height - padding * 2)}
            y2={height - padding - (g / 100) * (height - padding * 2)}
            stroke="#E9DFD2" strokeWidth="0.5" strokeDasharray="2 4"
          />
        ))}
        {/* Area */}
        <path d={areaD} fill={`url(#${label}-grad`} className={`transition-opacity duration-1000 ${start ? 'opacity-100' : 'opacity-0'}`} />
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-all duration-[2000ms] ease-editorial ${start ? 'opacity-100' : 'opacity-0'}`}
          style={{ strokeDasharray: 1000, strokeDashoffset: start ? 0 : 1000 }}
        />
        {/* Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x} cy={p.y} r="3"
            fill={color}
            className={`transition-opacity duration-500 ${start ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: `${start ? 1500 + i * 100 : 0}ms` }}
          />
        ))}
      </svg>
      <div className="mt-1 flex justify-between px-7">
        {data.map((d) => (
          <span key={d.label} className="font-sans text-[0.6rem] text-charcoal-400">{d.label.replace('Day ', '')}</span>
        ))}
      </div>
    </div>
  );
}

export default function Progress() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const dayCount = useCountUp(42, 1500, visible);

  return (
    <section id="progress" className="relative bg-ivory-50 py-24 lg:py-40 overflow-hidden">
      <div className="ambient-blob h-[400px] w-[400px] bg-peach-200/10 top-1/3 -left-40" />
      <div ref={ref} className="relative-z mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-16`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-sage-400/50" />
            <p className="editorial-eyebrow">Progress Tracking</p>
          </div>
          <h2 className="font-serif text-display-2 font-light text-charcoal-900">
            WATCH YOUR CANVAS<br />
            <span className="italic font-extralight text-sage-600">CHANGE.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Day counter + summary */}
          <div className={`reveal reveal-delay-1 ${visible ? 'is-visible' : ''} lg:col-span-4`}>
            <div className="rounded-2xl bg-gradient-to-br from-sage-200/50 to-peach-100/30 border border-sage-200/30 p-8 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-sage-300/20 blur-2xl" />
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-4 w-4 text-sage-600" />
                <span className="editorial-eyebrow">Day</span>
              </div>
              <p className="font-serif text-7xl font-extralight text-charcoal-900">{dayCount}</p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-charcoal-600">
                Your hydration profile has improved since your first check-in.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  { label: 'Check-ins completed', value: '6' },
                  { label: 'Routine consistency', value: '89%' },
                  { label: 'Goals on track', value: '2 of 3' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between border-b border-ivory-300/50 pb-2">
                    <span className="font-sans text-xs text-charcoal-500">{stat.label}</span>
                    <span className="font-sans text-sm font-medium text-charcoal-800">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Before / After */}
            <div className="mt-6 rounded-2xl border border-ivory-300 bg-ivory-100 p-6">
              <h4 className="font-serif text-base font-medium text-charcoal-900 mb-4">Before & After</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="aspect-square overflow-hidden rounded-xl bg-ivory-200">
                    <img src="https://images.pexels.com/photos/6681652/pexels-photo-6681652.jpeg?auto=compress&cs=tinysrgb&h=400&w=400" alt="Before" className="h-full w-full object-cover opacity-60 grayscale" />
                  </div>
                  <p className="mt-2 text-center font-sans text-xs text-charcoal-400">Day 1</p>
                </div>
                <div>
                  <div className="aspect-square overflow-hidden rounded-xl bg-ivory-200">
                    <img src="https://images.pexels.com/photos/6681652/pexels-photo-6681652.jpeg?auto=compress&cs=tinysrgb&h=400&w=400" alt="After" className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-2 text-center font-sans text-xs text-sage-600">Day 42</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} lg:col-span-8`}>
            <div className="rounded-2xl border border-ivory-300 bg-ivory-100 p-6 lg:p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-sage-600" />
                <h3 className="font-serif text-lg font-medium text-charcoal-900">Skin Profile Trends</h3>
              </div>

              <div className="space-y-10">
                <TrendChart data={hydrationTrend} label="Hydration" color="#8B9A82" start={visible} />
                <TrendChart data={textureTrend} label="Texture" color="#D09B6F" start={visible} />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { label: 'Hydration', change: '+24', positive: true },
                  { label: 'Texture', change: '+19', positive: true },
                  { label: 'Tone', change: '+12', positive: true },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 rounded-xl bg-ivory-50 p-4">
                    <CheckCircle2 className="h-5 w-5 text-sage-500" />
                    <div>
                      <p className="font-sans text-xs text-charcoal-400">{stat.label}</p>
                      <p className="font-serif text-lg text-charcoal-900">{stat.change} <span className="text-xs text-sage-600">pts</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

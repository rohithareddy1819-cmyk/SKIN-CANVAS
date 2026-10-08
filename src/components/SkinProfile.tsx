import { useReveal, useCountUp } from '@/hooks/useReveal';
import { skinMetrics, skinTags, skinPriorities, skinAvoidances } from '@/data/products';
import { Ban } from 'lucide-react';

function RadialMetric({ label, value, max, start }: { label: string; value: number; max: number; start: boolean }) {
  const count = useCountUp(value, 1800, start);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (count / max) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#E9DFD2" strokeWidth="3" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#8B9A82"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-3xl font-light text-charcoal-900">{count}</span>
          <span className="font-sans text-[0.6rem] uppercase tracking-wide text-charcoal-400">/ {max}</span>
        </div>
      </div>
      <span className="mt-3 font-sans text-sm font-medium text-charcoal-700">{label}</span>
    </div>
  );
}

export default function SkinProfile() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="profile" className="relative bg-ivory-100 py-24 lg:py-40 overflow-hidden">
      <div className="ambient-blob h-[400px] w-[400px] bg-sage-300/10 top-1/4 -right-40" />
      <div ref={ref} className="relative-z mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-12 lg:mb-16`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-sage-400/50" />
            <p className="editorial-eyebrow">Your Skin Profile</p>
          </div>
          <h2 className="font-serif text-display-2 font-light text-charcoal-900">
            YOUR SKIN <span className="italic font-extralight text-sage-600">CANVAS</span>
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {skinTags.map((tag) => (
              <span key={tag} className="rounded-full border border-sage-300 bg-sage-200/40 px-5 py-2 font-sans text-sm font-medium text-sage-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* What we noticed */}
          <div className={`reveal reveal-delay-1 ${visible ? 'is-visible' : ''}`}>
            <h3 className="font-serif text-xl font-medium text-charcoal-800 mb-8">What we noticed</h3>

            <div className="flex flex-wrap justify-center gap-8 sm:justify-start">
              {skinMetrics.map((m) => (
                <RadialMetric key={m.label} label={m.label} value={m.value} max={m.max} start={visible} />
              ))}
            </div>

            <div className="mt-10 space-y-4">
              {[
                { label: 'Redness', value: 'Low', color: 'bg-sage-400' },
                { label: 'Sensitivity', value: 'Low', color: 'bg-sage-400' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b border-ivory-300 pb-3">
                  <span className="font-sans text-sm text-charcoal-600">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-20 rounded-full bg-ivory-300">
                      <div className={`h-full w-1/4 rounded-full ${item.color}`} />
                    </div>
                    <span className="font-sans text-sm font-medium text-charcoal-800 w-16 text-right">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-ivory-300 bg-ivory-50/70 p-6">
              <p className="font-serif text-xs uppercase tracking-widest text-sage-600 font-semibold mb-2">Analysis Insight</p>
              <p className="font-sans text-sm text-charcoal-600 leading-relaxed">
                Your skin demonstrates strong barrier resilience with micro-dehydration along the cheeks. Prioritizing humectants while avoiding moisture-stripping agents will balance sebum and refine skin texture.
              </p>
            </div>
          </div>

          {/* Priorities & What to Avoid */}
          <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''}`}>
            <div>
              <h3 className="font-serif text-xl font-medium text-charcoal-800 mb-6">Your priorities</h3>

              <div className="space-y-4">
                {skinPriorities.map((p) => (
                  <div
                    key={p.rank}
                    className="group flex items-start gap-5 rounded-2xl border border-ivory-300 bg-ivory-50 p-5 transition-all duration-300 hover:border-sage-300 hover:shadow-md"
                  >
                    <span className="font-serif text-3xl font-extralight text-sage-400 group-hover:text-sage-600 transition-colors">
                      {String(p.rank).padStart(2, '0')}
                    </span>
                    <div className="flex-1">
                      <p className="font-serif text-lg text-charcoal-900">{p.text}</p>
                    </div>
                    <div className="mt-2 h-2 w-2 rounded-full bg-sage-300 group-hover:bg-sage-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* What to avoid for your skin */}
            <div className="mt-10">
              <h3 className="font-serif text-xl font-medium text-charcoal-800 mb-6">What to avoid for your skin</h3>

              <div className="space-y-4">
                {skinAvoidances.map((item) => (
                  <div
                    key={item.item}
                    className="group flex items-start gap-4 rounded-2xl border border-ivory-300 bg-ivory-50 p-5 transition-all duration-300 hover:border-peach-300 hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-peach-100/60 text-peach-500 group-hover:bg-peach-200/70 group-hover:text-peach-600 transition-colors">
                      <Ban className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-serif text-base font-medium text-charcoal-900">{item.item}</p>
                        <span className="rounded-full border border-peach-200 bg-peach-100/50 px-2.5 py-0.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-charcoal-600">
                          {item.badge}
                        </span>
                      </div>
                      <p className="mt-1 font-sans text-xs leading-relaxed text-charcoal-600">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Under all of that */}
            <div className="mt-8 rounded-xl bg-gradient-to-br from-sage-200/40 to-peach-100/30 border border-sage-200/40 p-6">
              <p className="font-sans text-sm leading-relaxed text-charcoal-600">
                Your routine and product recommendations are tailored to these priorities. As your skin changes, your profile updates automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

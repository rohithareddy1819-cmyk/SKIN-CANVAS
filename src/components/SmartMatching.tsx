import { Check, Sparkles } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { products } from '@/data/products';

const topMatch = products[0];

export default function SmartMatching() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-ivory-50 py-24 lg:py-40 overflow-hidden">
      <div className="ambient-blob h-[500px] w-[500px] bg-sage-300/12 top-1/4 right-0 animate-drift" />

      <div ref={ref} className="relative-z mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-16 text-center`}>
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-sage-400/50" />
            <p className="editorial-eyebrow">Smart Matching</p>
            <div className="h-px w-8 bg-sage-400/50" />
          </div>
          <h2 className="font-serif text-display-2 font-light text-charcoal-900">
            NOT JUST POPULAR.<br />
            <span className="italic font-extralight text-sage-600">RIGHT FOR YOU.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
          {/* Score display */}
          <div className={`reveal reveal-delay-1 ${visible ? 'is-visible' : ''} lg:col-span-5`}>
            <div className="relative mx-auto flex h-72 w-72 items-center justify-center">
              {/* Ambient glow behind ring */}
              <div className="absolute inset-8 rounded-full bg-sage-300/20 blur-3xl animate-glow-pulse" />

              <svg className="h-full w-full -rotate-90 relative" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="#E9DFD2" strokeWidth="2" />
                <circle
                  cx="100" cy="100" r="90" fill="none" stroke="#8B9A82" strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 90}
                  strokeDashoffset={2 * Math.PI * 90 * (1 - topMatch.matchScore / 100)}
                  style={{ transition: 'stroke-dashoffset 2s ease' }}
                />
                {/* Inner decorative ring */}
                <circle cx="100" cy="100" r="78" fill="none" stroke="#E9DFD2" strokeWidth="1" strokeDasharray="3 6" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-serif text-7xl font-extralight text-charcoal-900">{topMatch.matchScore}%</span>
                <span className="mt-1 font-sans text-xs uppercase tracking-wide text-charcoal-400">Skin Match</span>
              </div>
              {/* Floating sparkles */}
              <div className="absolute -top-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-sage-200 shadow-md animate-float">
                <Sparkles className="h-5 w-5 text-sage-700" />
              </div>
            </div>
          </div>

          {/* Why */}
          <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} lg:col-span-7`}>
            <h3 className="font-serif text-2xl font-light text-charcoal-900 mb-2">
              {topMatch.brand} — {topMatch.name}
            </h3>
            <p className="font-sans text-sm text-charcoal-500 mb-8">Why this match?</p>

            <div className="space-y-4">
              {topMatch.matchReasons.map((reason, i) => (
                <div
                  key={reason}
                  className={`group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-500 hover:bg-ivory-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${visible ? 300 + i * 150 : 0}ms` }}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage-200/60 transition-all group-hover:bg-sage-200 group-hover:scale-110">
                    <Check className="h-4 w-4 text-sage-700" />
                  </div>
                  <span className="font-sans text-base text-charcoal-700">{reason}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { label: 'Hydration', value: topMatch.attributes.hydration },
                { label: 'Texture', value: topMatch.attributes.texture },
                { label: 'Sensitivity', value: topMatch.attributes.sensitivity },
              ].map((attr) => (
                <div key={attr.label} className="rounded-xl border border-ivory-300 bg-ivory-100 p-4 text-center transition-all duration-300 hover:border-sage-300 hover:shadow-md">
                  <p className="font-sans text-xs text-charcoal-400 mb-1">{attr.label}</p>
                  <p className="font-serif text-lg text-charcoal-900">{attr.value}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 font-sans text-sm font-light leading-relaxed text-charcoal-500 max-w-lg">
              Skin Canvas ranks products by personal relevance — not popularity. Your skin profile, routine, and goals all influence the score.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

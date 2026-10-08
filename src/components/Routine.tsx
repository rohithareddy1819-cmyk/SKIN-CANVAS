import { Sun, Moon, ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { routines } from '@/data/products';

export default function Routine() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="routine" className="relative bg-ivory-50 py-24 lg:py-40 overflow-hidden">
      <div className="ambient-blob h-[400px] w-[400px] bg-sage-300/10 bottom-1/4 -right-40" />
      <div ref={ref} className="relative-z mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-16`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-sage-400/50" />
            <p className="editorial-eyebrow">Personalized Routine</p>
          </div>
          <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }} className="text-display-2 font-bold text-charcoal-900 tracking-tight leading-none">
            BUILT AROUND<br />
            <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }} className="italic font-normal text-sage-600">YOUR SKIN.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {routines.map((routine, ri) => (
            <div
              key={routine.period}
              className={`reveal reveal-delay-${ri + 1} ${visible ? 'is-visible' : ''} group relative rounded-2xl border border-ivory-300 bg-ivory-100 p-8 lg:p-10 transition-all duration-500 hover:border-sage-300 hover:shadow-lg`}
            >
              <div className="flex items-center gap-3 mb-8">
                {routine.period === 'Morning' ? (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-peach-100/50">
                    <Sun className="h-4 w-4 text-peach-500" />
                  </div>
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ai-100/30">
                    <Moon className="h-4 w-4 text-ai-500" />
                  </div>
                )}
                <span className="editorial-eyebrow">{routine.period}</span>
              </div>

              <div className="space-y-0">
                {routine.steps.map((step, si) => (
                  <div key={si} className="group relative pl-8 pb-8 last:pb-0">
                    {/* Timeline line */}
                    {si < routine.steps.length - 1 && (
                      <div className="absolute left-[7px] top-4 bottom-0 w-px bg-ivory-300" />
                    )}
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-sage-400 bg-ivory-50">
                      <div className="h-1.5 w-1.5 rounded-full bg-sage-400 transition-colors group-hover:bg-sage-600" />
                    </div>

                    <div className="flex items-baseline gap-3 mb-1">
                      <h4 className="font-serif text-xl font-medium text-charcoal-900">{step.step}</h4>
                      <span className="font-sans text-xs text-charcoal-400">→ {step.productType}</span>
                    </div>
                    <p className="font-sans text-sm font-light leading-relaxed text-charcoal-600 max-w-md">
                      {step.reason}
                    </p>

                    <a
                      href="#discover"
                      className="mt-3 inline-flex items-center gap-1.5 font-sans text-xs font-medium text-sage-700 transition-colors hover:text-sage-600"
                    >
                      Find products
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`reveal reveal-delay-3 ${visible ? 'is-visible' : ''} mt-12 text-center`}>
          <p className="font-sans text-sm text-charcoal-500 max-w-lg mx-auto">
            Routines are category-first and brand-neutral. We recommend what your skin needs — then help you find the right product from any brand.
          </p>
        </div>
      </div>
    </section>
  );
}

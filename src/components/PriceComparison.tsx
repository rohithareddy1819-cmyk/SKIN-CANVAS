import { ArrowRight, TrendingDown, Store } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { products } from '@/data/products';

const featured = products[1];

const retailers = featured.retailers.sort((a, b) => a.price - b.price);
const bestPrice = retailers[0].price;
const maxPrice = Math.max(...retailers.map((r) => r.price));
const savings = maxPrice - bestPrice;

export default function PriceComparison() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="price" className="relative bg-charcoal-900 py-24 lg:py-40 overflow-hidden">
      {/* Ambient glow */}
      <div className="ambient-blob h-[500px] w-[500px] bg-sage-600/8 top-0 right-1/4 animate-glow-pulse" />
      <div className="ambient-blob h-[400px] w-[400px] bg-ai-400/5 bottom-1/4 left-1/4 animate-glow-pulse" style={{ animationDelay: '3s' }} />

      <div ref={ref} className="relative-z mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-16 text-center`}>
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-sage-400/50" />
            <p className="editorial-eyebrow text-sage-300">Best Price Intelligence</p>
            <div className="h-px w-8 bg-sage-400/50" />
          </div>
          <h2 className="font-serif text-display-2 font-light text-ivory-50">
            BUY <span className="italic font-extralight text-sage-300">SMARTER.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Product preview */}
          <div className={`reveal reveal-delay-1 ${visible ? 'is-visible' : ''} lg:col-span-4`}>
            <div className="rounded-2xl border border-charcoal-700 bg-charcoal-800/40 p-6 backdrop-blur-sm">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-charcoal-800 mb-5">
                <img src={featured.image} alt={featured.name} className="h-full w-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/40 to-transparent" />
              </div>
              <p className="font-sans text-xs text-charcoal-400">{featured.brand}</p>
              <h3 className="font-serif text-xl font-medium text-ivory-50 mb-3">{featured.name}</h3>
              <div className="flex items-center gap-2 rounded-lg border border-charcoal-700 bg-charcoal-800/50 px-3 py-2.5">
                <Store className="h-3.5 w-3.5 text-charcoal-400 shrink-0" />
                <p className="font-sans text-xs text-charcoal-400">Skin Canvas is not the seller. We help you find where to buy it.</p>
              </div>
            </div>
          </div>

          {/* Price comparison */}
          <div className={`reveal reveal-delay-2 ${visible ? 'is-visible' : ''} lg:col-span-8`}>
            {/* Best price hero */}
            <div className="mb-8 rounded-2xl border border-sage-600/20 bg-gradient-to-br from-sage-600/15 via-sage-600/8 to-transparent p-6 lg:p-8 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-sage-400/10 blur-3xl" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-sans text-xs uppercase tracking-wide text-sage-300 mb-2">Best Available Price</p>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-5xl font-light text-ivory-50">₹{bestPrice}</span>
                    <span className="font-sans text-lg text-charcoal-400 line-through">₹{maxPrice}</span>
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-sage-600/20 border border-sage-600/30 px-4 py-1.5">
                    <TrendingDown className="h-4 w-4 text-sage-300" />
                    <span className="font-sans text-sm font-medium text-sage-300">Save ₹{savings}</span>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full bg-ivory-50 px-6 py-3.5 font-sans text-sm font-medium text-charcoal-900 transition-all hover:scale-105 hover:shadow-xl hover:shadow-ivory-50/10 active:scale-95"
                >
                  Shop at ₹{bestPrice}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Retailer rows */}
            <div className="space-y-3">
              {retailers.map((retailer, i) => {
                const isBest = retailer.price === bestPrice;
                const barWidth = (retailer.price / maxPrice) * 100;
                return (
                  <div
                    key={retailer.name}
                    className={`group flex items-center gap-4 rounded-xl border p-4 transition-all duration-500 hover:scale-[1.01] ${
                      isBest ? 'border-sage-600/40 bg-sage-600/10 hover:border-sage-600/60' : 'border-charcoal-700 bg-charcoal-800/30 hover:bg-charcoal-800/50'
                    }`}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? 'translateY(0)' : 'translateY(10px)',
                      transitionDelay: `${visible ? 400 + i * 100 : 0}ms`,
                    }}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${isBest ? 'bg-sage-600/20' : 'bg-charcoal-700 group-hover:bg-charcoal-600'}`}>
                      <Store className={`h-4 w-4 ${isBest ? 'text-sage-300' : 'text-charcoal-300'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-sans text-sm font-medium text-ivory-100">{retailer.name}</span>
                        <span className={`font-serif text-lg ${isBest ? 'text-sage-300' : 'text-ivory-100'}`}>₹{retailer.price}</span>
                      </div>
                      <div className="h-1 rounded-full bg-charcoal-700">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${isBest ? 'bg-sage-400' : 'bg-charcoal-500'}`}
                          style={{ width: visible ? `${barWidth}%` : '0%', transitionDelay: `${600 + i * 100}ms` }}
                        />
                      </div>
                    </div>
                    {isBest && (
                      <span className="rounded-full bg-sage-600/30 border border-sage-600/40 px-3 py-1 font-sans text-xs font-medium text-sage-300">Best</span>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="mt-6 font-sans text-xs text-charcoal-500">
              Prices shown are for demonstration. This interface is designed to connect to real-time pricing APIs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Check, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { products } from '@/data/products';

const compareProducts = products.slice(0, 3);

const rows: { label: string; key: string; render: (p: typeof compareProducts[0]) => React.ReactNode }[] = [
  { label: 'Skin Match', key: 'match', render: (p) => <span className="font-serif text-xl text-sage-700">{p.matchScore}%</span> },
  { label: 'Hydration', key: 'hyd', render: (p) => p.attributes.hydration },
  { label: 'Texture', key: 'tex', render: (p) => p.attributes.texture },
  { label: 'Sensitivity', key: 'sens', render: (p) => p.attributes.sensitivity },
  { label: 'Rating', key: 'rating', render: (p) => (
    <span className="inline-flex items-center gap-1.5">
      <Star className="h-3.5 w-3.5 fill-peach-400 text-peach-400" />
      {p.rating}
    </span>
  ) },
  { label: 'Size', key: 'size', render: (p) => p.size },
  { label: 'Price', key: 'price', render: (p) => (
    <span className="font-serif text-xl font-medium text-charcoal-900">₹{p.price}</span>
  ) },
];

export default function Comparison() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [mobileIndex, setMobileIndex] = useState(0);

  return (
    <section id="compare" className="bg-ivory-100 py-24 lg:py-40">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-16`}>
          <p className="editorial-eyebrow mb-5">Product Comparison</p>
          <h2 className="font-serif text-display-2 font-light text-charcoal-900">
            COMPARE BEFORE<br />
            <span className="italic font-extralight text-sage-600">YOU BUY.</span>
          </h2>
        </div>

        {/* Desktop table */}
        <div className={`reveal reveal-delay-1 ${visible ? 'is-visible' : ''} hidden lg:block`}>
          <div className="overflow-hidden rounded-2xl border border-ivory-300 bg-ivory-50">
            {/* Product headers */}
            <div className="grid grid-cols-[180px_repeat(3,1fr)] border-b border-ivory-300">
              <div className="p-6" />
              {compareProducts.map((p) => (
                <div key={p.id} className="border-l border-ivory-300 p-6">
                  <div className="flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="h-16 w-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-sans text-xs text-charcoal-400">{p.brand}</p>
                      <h4 className="font-serif text-base font-medium text-charcoal-900">{p.name}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Data rows */}
            {rows.map((row, ri) => (
              <div key={row.key} className={`grid grid-cols-[180px_repeat(3,1fr)] ${ri < rows.length - 1 ? 'border-b border-ivory-200' : ''}`}>
                <div className="p-6">
                  <span className="font-sans text-sm font-medium text-charcoal-500">{row.label}</span>
                </div>
                {compareProducts.map((p) => (
                  <div key={p.id} className="flex items-center border-l border-ivory-200 p-6">
                    <span className="font-sans text-sm text-charcoal-800">{row.render(p)}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* CTA row */}
            <div className="grid grid-cols-[180px_repeat(3,1fr)]">
              <div className="p-6" />
              {compareProducts.map((p) => (
                <div key={p.id} className="flex items-center border-l border-ivory-300 p-6">
                  <a href="#price" className="inline-flex items-center gap-1.5 rounded-full bg-charcoal-900 px-4 py-2.5 font-sans text-xs font-medium text-ivory-50 transition-all hover:scale-105 hover:bg-charcoal-800">
                    View prices
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className={`reveal reveal-delay-1 ${visible ? 'is-visible' : ''} lg:hidden`}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setMobileIndex((i) => Math.max(0, i - 1))}
              disabled={mobileIndex === 0}
              className="rounded-full border border-ivory-300 p-2 text-charcoal-600 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="font-sans text-sm text-charcoal-500">{mobileIndex + 1} / {compareProducts.length}</span>
            <button
              onClick={() => setMobileIndex((i) => Math.min(compareProducts.length - 1, i + 1))}
              disabled={mobileIndex === compareProducts.length - 1}
              className="rounded-full border border-ivory-300 p-2 text-charcoal-600 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-ivory-300 bg-ivory-50">
            <div
              className="flex transition-transform duration-500 ease-editorial"
              style={{ transform: `translateX(-${mobileIndex * 100}%)` }}
            >
              {compareProducts.map((p) => (
                <div key={p.id} className="w-full shrink-0 p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={p.image} alt={p.name} className="h-20 w-20 rounded-xl object-cover" />
                    <div>
                      <p className="font-sans text-xs text-charcoal-400">{p.brand}</p>
                      <h4 className="font-serif text-lg font-medium text-charcoal-900">{p.name}</h4>
                      <p className="font-sans text-xs text-charcoal-400 mt-1">{p.size}</p>
                    </div>
                  </div>

                  {rows.map((row) => (
                    <div key={row.key} className="flex items-center justify-between border-b border-ivory-200 py-3 last:border-0">
                      <span className="font-sans text-sm text-charcoal-500">{row.label}</span>
                      <span className="font-sans text-sm font-medium text-charcoal-800">{row.render(p)}</span>
                    </div>
                  ))}

                  <a href="#price" className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-charcoal-900 px-4 py-3 font-sans text-sm font-medium text-ivory-50">
                    View prices
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

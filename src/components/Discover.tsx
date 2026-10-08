import { useState } from 'react';
import { ArrowRight, Star, Check, Sparkles } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { products } from '@/data/products';

const categories = ['All', 'Cleansers', 'Serums', 'Moisturizers', 'Sunscreens'];

export default function Discover() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <section id="discover" className="relative bg-ivory-100 py-24 lg:py-40 overflow-hidden">
      <div className="ambient-blob h-[400px] w-[400px] bg-peach-200/12 top-1/4 -left-40" />

      <div ref={ref} className="relative-z mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-12`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-sage-400/50" />
            <p className="editorial-eyebrow">Discover Products</p>
          </div>
          <h2 className="font-serif text-display-2 font-light text-charcoal-900">
            FIND WHAT FITS<br />
            <span className="italic font-extralight text-sage-600">YOUR SKIN.</span>
          </h2>
          <p className="mt-6 max-w-lg font-sans text-lg font-light leading-relaxed text-charcoal-600">
            Explore products from brands you already love — and brands you haven't discovered yet.
          </p>
        </div>

        {/* Category tabs */}
        <div className={`reveal reveal-delay-1 ${visible ? 'is-visible' : ''} mb-10 flex gap-2 overflow-x-auto scrollbar-hide`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-charcoal-900 text-ivory-50 shadow-md shadow-charcoal-900/20'
                  : 'border border-ivory-300 text-charcoal-600 hover:border-charcoal-400 hover:bg-ivory-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} ${visible ? 'is-visible' : ''} group flex flex-col overflow-hidden rounded-2xl border border-ivory-300 bg-ivory-50 transition-all duration-500 hover:shadow-2xl hover:shadow-charcoal-900/8 hover:border-sage-300 hover:-translate-y-1`}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="absolute top-4 left-4 rounded-full bg-ivory-50/95 backdrop-blur-sm px-3 py-1.5 shadow-sm">
                  <span className="font-sans text-xs font-medium text-charcoal-900">{product.brand}</span>
                </div>

                {/* Match score with ring */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-charcoal-900/90 backdrop-blur-sm px-3 py-1.5 shadow-lg">
                  <Sparkles className="h-3 w-3 text-ai-300" />
                  <span className="font-sans text-xs font-semibold text-ai-200">{product.matchScore}% match</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <p className="font-sans text-xs text-charcoal-400 mb-1">{product.category}</p>
                <h3 className="font-serif text-lg font-medium text-charcoal-900 mb-2">{product.name}</h3>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.keyIngredients.slice(0, 3).map((ing) => (
                    <span key={ing} className="rounded-full bg-sage-200/40 px-2.5 py-1 font-sans text-[0.65rem] text-sage-700">
                      {ing}
                    </span>
                  ))}
                </div>

                <p className="font-sans text-xs font-light leading-relaxed text-charcoal-500 mb-4 italic">
                  "{product.matchScore >= 92 ? 'Excellent' : 'Good'} fit for your hydration priority."
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-3.5 w-3.5 fill-peach-400 text-peach-400" />
                  <span className="font-sans text-sm font-medium text-charcoal-800">{product.rating}</span>
                  <span className="font-sans text-xs text-charcoal-400">({product.reviews.toLocaleString()})</span>
                  <span className="mx-1 text-ivory-300">·</span>
                  <span className="font-sans text-xs text-charcoal-400">{product.size}</span>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-ivory-200 pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl font-light text-charcoal-900">₹{product.price}</span>
                    <span className="font-sans text-xs text-charcoal-400 line-through">₹{product.originalPrice}</span>
                  </div>
                  <a
                    href="#compare"
                    className="inline-flex items-center gap-1.5 rounded-full bg-charcoal-900 px-4 py-2.5 font-sans text-xs font-medium text-ivory-50 transition-all duration-300 hover:scale-105 hover:bg-charcoal-800 hover:shadow-md"
                  >
                    Compare
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

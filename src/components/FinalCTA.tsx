import { ArrowRight, Sparkles } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function FinalCTA() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-charcoal-900 py-24 lg:py-40 overflow-hidden">
      {/* AI grid overlay */}
      <div className="absolute inset-0 scan-grid opacity-30" />
      {/* Ambient gradient accents */}
      <div className="ambient-blob h-[500px] w-[500px] bg-sage-600/12 -top-40 left-1/2 -translate-x-1/2 animate-glow-pulse" />
      <div className="ambient-blob h-[400px] w-[400px] bg-peach-500/6 bottom-0 right-1/4 animate-glow-pulse" style={{ animationDelay: '2s' }} />
      <div className="ambient-blob h-[350px] w-[350px] bg-ai-400/5 bottom-1/4 left-1/4 animate-glow-pulse" style={{ animationDelay: '4s' }} />

      <div ref={ref} className="relative-z mx-auto max-w-4xl px-6 text-center">
        <div className={`reveal ${visible ? 'is-visible' : ''}`}>
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-sage-400/50" />
            <p className="editorial-eyebrow text-sage-300">Begin Your Journey</p>
            <div className="h-px w-8 bg-sage-400/50" />
          </div>
          <h2 className="font-serif text-display-1 font-extralight text-ivory-50 leading-tight text-balance">
            YOUR SKIN IS UNIQUE.<br />
            <span className="italic text-sage-300">YOUR ROUTINE SHOULD BE TOO.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-md font-sans text-lg font-light leading-relaxed text-charcoal-400">
            Start with your skin. We'll help you figure out the rest.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a href="#analysis" className="btn-primary group !bg-ivory-50 !text-charcoal-900 hover:!bg-ivory-100 hover:!shadow-xl hover:!shadow-ivory-50/10">
              <Sparkles className="mr-2 h-4 w-4" />
              Analyze My Skin
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#discover" className="btn-secondary !border-charcoal-600 !text-ivory-100 hover:!bg-ivory-50 hover:!text-charcoal-900 hover:!border-ivory-50">
              Explore Products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Shield, Lock, Eye, HelpCircle, Heart } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const trustItems = [
  {
    icon: Lock,
    title: 'Secure Image Handling',
    desc: 'Your skin photos are encrypted and processed privately. You control what is stored and can delete at any time.',
  },
  {
    icon: Shield,
    title: 'Transparent Recommendations',
    desc: 'Every product score is explainable. We show you exactly why a product matches your skin — no black boxes.',
  },
  {
    icon: Eye,
    title: 'No Medical Diagnosis',
    desc: 'AI-generated insights are informational. For medical concerns, always consult a qualified dermatologist.',
  },
  {
    icon: HelpCircle,
    title: 'Explainable AI',
    desc: 'Ask "Why was this recommended?" at any point. Every recommendation links back to your skin profile data.',
  },
];

export default function TrustSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="bg-ivory-100 py-24 lg:py-40">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-16`}>
          <p className="editorial-eyebrow mb-5">Trust & Privacy</p>
          <h2 style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }} className="text-display-2 font-bold text-charcoal-900 tracking-tight leading-none">
            YOUR SKIN DATA<br />
            <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }} className="italic font-normal text-sage-600">IS YOURS.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {trustItems.map((item, i) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} ${visible ? 'is-visible' : ''} flex gap-5 rounded-2xl border border-ivory-300 bg-ivory-50 p-7 transition-all duration-500 hover:border-sage-300 hover:shadow-md`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage-200/50">
                <item.icon className="h-5 w-5 text-sage-700" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium text-charcoal-900 mb-2">{item.title}</h3>
                <p className="font-sans text-sm font-light leading-relaxed text-charcoal-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={`reveal reveal-delay-3 ${visible ? 'is-visible' : ''} mt-12 flex items-start gap-4 rounded-2xl bg-gradient-to-r from-sage-200/30 to-peach-100/20 p-6`}>
          <Heart className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
          <p className="font-sans text-sm leading-relaxed text-charcoal-600">
            Every product recommendation includes a "Why was this recommended?" explanation. We never hide the logic behind a score — your skin deserves clarity, not mystery.
          </p>
        </div>
      </div>
    </section>
  );
}

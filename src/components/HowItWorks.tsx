import { useReveal } from '@/hooks/useReveal';
import { Camera, Brain, Compass, Tag } from 'lucide-react';

const steps = [
  { number: '01', title: 'Analyze', desc: 'Upload a skin photo.', icon: Camera },
  { number: '02', title: 'Understand', desc: 'AI identifies visible skin characteristics.', icon: Brain },
  { number: '03', title: 'Discover', desc: 'Find products across brands that fit your needs.', icon: Compass },
  { number: '04', title: 'Save', desc: 'Compare prices and find where to buy.', icon: Tag },
];

export default function HowItWorks() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="how-it-works" className="relative bg-ivory-50 py-24 lg:py-40 overflow-hidden">
      {/* Ambient glow */}
      <div className="ambient-blob h-[400px] w-[400px] bg-sage-300/12 top-20 right-1/4" />

      <div ref={ref} className="relative-z mx-auto max-w-7xl px-6 lg:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-16 lg:mb-24`}>
          <p className="editorial-eyebrow mb-5">How It Works</p>
          <h2 className="font-serif text-display-2 font-light text-charcoal-900">
            SKINCARE,<br />
            <span className="italic font-extralight text-sage-600">UNDERSTOOD.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${i + 1} ${visible ? 'is-visible' : ''} group relative lg:border-l lg:border-ivory-300 lg:px-10 lg:py-2 transition-colors duration-500 hover:border-sage-400`}
            >
              {/* Icon */}
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-ivory-100 border border-ivory-300 transition-all duration-500 group-hover:bg-sage-200/50 group-hover:border-sage-400 group-hover:scale-105">
                <step.icon className="h-5 w-5 text-charcoal-600 transition-colors duration-500 group-hover:text-sage-700" />
              </div>

              <span className="font-serif text-5xl font-extralight text-sage-300 block mb-4 transition-colors duration-500 group-hover:text-sage-500">{step.number}</span>
              <h3 className="font-serif text-2xl font-medium text-charcoal-900 mb-3">{step.title}</h3>
              <p className="font-sans text-base font-light leading-relaxed text-charcoal-600 max-w-[14rem]">{step.desc}</p>

              {/* Connecting dot */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-[3.5rem] h-2 w-2 rounded-full bg-ivory-300 translate-x-1 transition-colors duration-500 group-hover:bg-sage-400" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

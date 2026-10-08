import { Sun, Moon, ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { routines } from '@/data/products';

export default function Routine() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="routine" className="relative bg-[#fdf6f2] py-20 lg:py-32 overflow-hidden">
      {/* Keyframe animations */}
      <style>{`
        @keyframes floatSun {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(-12px) rotate(15deg); }
          60% { transform: translateY(-6px) rotate(-8deg); }
        }
        @keyframes floatMoon {
          0%, 100% { transform: translateY(0px) rotate(-10deg); }
          40% { transform: translateY(-14px) rotate(8deg); }
          70% { transform: translateY(-5px) rotate(-15deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.7; filter: blur(10px) brightness(1); }
          50% { opacity: 1; filter: blur(14px) brightness(1.3); }
        }
        @keyframes glowPulseMoon {
          0%, 100% { opacity: 0.5; filter: blur(10px) brightness(1); }
          50% { opacity: 0.9; filter: blur(16px) brightness(1.25); }
        }
      `}</style>
      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-12 relative`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#c9b8b0]" />
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.18em] text-[#9e8880]">Personalized Routine</p>
          </div>

          {/* Heading with floating icons */}
          <div className="relative inline-block">

            {/* Animated Sun — left of heading */}
            <div
              className="absolute -left-2 top-2 lg:-left-10 lg:top-4"
              style={{ animation: 'floatSun 4s ease-in-out infinite' }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #fbbf24 0%, #f97316 60%, transparent 100%)',
                  width: '44px',
                  height: '44px',
                  top: '-6px',
                  left: '-6px',
                  animation: 'glowPulse 3s ease-in-out infinite',
                }}
              />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: 'linear-gradient(135deg, #fde68a, #f97316)' }}
              >
                <Sun className="h-4 w-4 text-white drop-shadow-sm" />
              </div>
            </div>

            {/* Animated Moon — right of heading */}
            <div
              className="absolute -right-8 top-0 lg:-right-14 lg:top-2"
              style={{ animation: 'floatMoon 5s ease-in-out infinite' }}
            >
              {/* Glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #c4b5fd 0%, #818cf8 60%, transparent 100%)',
                  width: '44px',
                  height: '44px',
                  top: '-6px',
                  left: '-6px',
                  animation: 'glowPulseMoon 4s ease-in-out infinite',
                }}
              />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full"
                style={{ background: 'linear-gradient(135deg, #c4b5fd, #6366f1)' }}
              >
                <Moon className="h-4 w-4 text-white drop-shadow-sm" />
              </div>
            </div>

            <h2
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
              className="text-[3.2rem] sm:text-[4rem] lg:text-[5rem] font-bold text-[#1e1310] leading-[0.92] tracking-tight pl-10 lg:pl-0"
            >
              BUILT AROUND<br />
              <span
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                className="italic font-normal text-[#6b7a52]"
              >
                YOUR SKIN.
              </span>
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {routines.map((routine, ri) => {
            const isMorning = routine.period === 'Morning';
            return (
              <div
                key={routine.period}
                className={`reveal reveal-delay-${ri + 1} ${visible ? 'is-visible' : ''} rounded-2xl p-8 lg:p-10`}
                style={{
                  background: isMorning
                    ? 'linear-gradient(145deg, #fdeede 0%, #fdf0e6 60%, #f9ece4 100%)'
                    : 'linear-gradient(145deg, #edeaf8 0%, #eff0f8 60%, #eaf0f8 100%)',
                }}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{
                      background: isMorning ? 'rgba(255,200,120,0.25)' : 'rgba(160,160,220,0.25)',
                    }}
                  >
                    {isMorning
                      ? <Sun className="h-4 w-4 text-[#d4943a]" />
                      : <Moon className="h-4 w-4 text-[#7c80c2]" />
                    }
                  </div>
                  <div>
                    <p className="font-sans text-[0.6rem] uppercase tracking-[0.18em] text-[#9e8880]">{routine.period}</p>
                    <p className="font-sans text-xs text-[#9e8880]">{isMorning ? 'Rise & protect' : 'Repair & restore'}</p>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-7">
                  {routine.steps.map((step, si) => (
                    <div key={si} className="flex gap-4">
                      {/* Circle dot */}
                      <div className="mt-1 flex-shrink-0">
                        <div
                          className="flex h-5 w-5 items-center justify-center rounded-full border-2"
                          style={{
                            borderColor: isMorning ? '#d4943a80' : '#7c80c280',
                            background: isMorning ? '#fdeede' : '#edeaf8',
                          }}
                        >
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ background: isMorning ? '#d4943a' : '#7c80c2' }}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex items-baseline gap-2 mb-1">
                          <h4 className="font-serif text-lg font-semibold text-[#1e1310]">{step.step}</h4>
                          <span className="font-sans text-[0.7rem] text-[#b0a09a]">— {step.productType}</span>
                        </div>
                        <p className="font-sans text-sm leading-relaxed text-[#5c4a44] max-w-xs">
                          {step.reason}
                        </p>
                        <a
                          href="#discover"
                          className="mt-2 inline-flex items-center gap-1 font-sans text-xs font-medium text-[#7a6a56] hover:text-[#5a4a36] transition-colors"
                        >
                          Find products
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className={`reveal reveal-delay-3 ${visible ? 'is-visible' : ''} mt-10 text-center`}>
          <p className="font-sans text-sm text-[#9e8880] max-w-lg mx-auto leading-relaxed">
            Routines are category-first and brand–neutral. We recommend what your skin
            <br className="hidden sm:block" /> needs — then help you find the right product from any brand.
          </p>
        </div>

      </div>
    </section>
  );
}

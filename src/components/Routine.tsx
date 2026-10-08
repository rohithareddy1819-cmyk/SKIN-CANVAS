import { Sun, Moon, ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { routines } from '@/data/products';

export default function Routine() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="routine" className="relative bg-[#fdf6f2] py-20 lg:py-32 overflow-hidden">
      {/* ── Premium Keyframe Animations ── */}
      <style>{`
        @keyframes sunFloat {
          0%,100% { transform: translateY(0px) scale(1); }
          40%      { transform: translateY(-18px) scale(1.06); }
          70%      { transform: translateY(-8px) scale(0.97); }
        }
        @keyframes sunSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes sunOrbit {
          from { transform: rotate(0deg) translateX(26px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(26px) rotate(-360deg); }
        }
        @keyframes sunOrbit2 {
          from { transform: rotate(180deg) translateX(20px) rotate(-180deg); }
          to   { transform: rotate(540deg) translateX(20px) rotate(-540deg); }
        }
        @keyframes sunHalo {
          0%,100% { opacity:0.35; transform:scale(1); }
          50%      { opacity:0.7;  transform:scale(1.18); }
        }
        @keyframes moonFloat {
          0%,100% { transform: translateY(0px) rotate(-12deg) scale(1); }
          35%      { transform: translateY(-20px) rotate(6deg) scale(1.07); }
          65%      { transform: translateY(-9px) rotate(-18deg) scale(0.96); }
        }
        @keyframes moonOrbit {
          from { transform: rotate(0deg) translateX(22px) rotate(0deg); }
          to   { transform: rotate(-360deg) translateX(22px) rotate(360deg); }
        }
        @keyframes moonOrbit2 {
          from { transform: rotate(90deg) translateX(30px) rotate(-90deg); }
          to   { transform: rotate(-270deg) translateX(30px) rotate(270deg); }
        }
        @keyframes moonAtmos {
          0%,100% { opacity:0.3; transform:scale(1) rotate(0deg); }
          50%      { opacity:0.65; transform:scale(1.22) rotate(15deg); }
        }
        @keyframes shimmer {
          0%,100% { opacity:0; transform:scale(0.6); }
          50%      { opacity:1; transform:scale(1.1); }
        }
        @keyframes twinkle {
          0%,100% { opacity:0.2; transform:scale(0.7) rotate(0deg); }
          50%      { opacity:1;   transform:scale(1.2) rotate(180deg); }
        }
      `}</style>

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* ── Header ── */}
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-12 relative`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c9b8b0]" />
            <p className="font-sans text-[0.65rem] uppercase tracking-[0.18em] text-[#9e8880]">Personalized Routine</p>
          </div>

          {/* Heading row with premium animated sun & moon */}
          <div className="flex items-center gap-6 lg:gap-10 flex-wrap">

            {/* ☀️ PREMIUM SUN */}
            <div
              className="relative flex-shrink-0 flex items-center justify-center"
              style={{ width: 80, height: 80, animation: 'sunFloat 4.5s ease-in-out infinite' }}
            >
              {/* Outer halo 1 */}
              <div className="absolute rounded-full" style={{
                width: 80, height: 80,
                background: 'radial-gradient(circle, #fde68a55 0%, #fb923c33 50%, transparent 80%)',
                animation: 'sunHalo 3s ease-in-out infinite',
              }} />
              {/* Outer halo 2 */}
              <div className="absolute rounded-full" style={{
                width: 60, height: 60,
                background: 'radial-gradient(circle, #fbbf2466 0%, #f9731644 60%, transparent 100%)',
                animation: 'sunHalo 3s ease-in-out infinite 0.8s',
              }} />
              {/* Spinning rays ring */}
              <div className="absolute" style={{
                width: 56, height: 56,
                animation: 'sunSpin 8s linear infinite',
              }}>
                {[0,45,90,135,180,225,270,315].map(deg => (
                  <div key={deg} className="absolute" style={{
                    width: 2, height: 10,
                    background: 'linear-gradient(to bottom, #fbbf24, transparent)',
                    borderRadius: 2,
                    top: '50%', left: '50%',
                    transformOrigin: '0 0',
                    transform: `rotate(${deg}deg) translateX(-1px) translateY(-28px)`,
                  }} />
                ))}
              </div>
              {/* Orbiting sparkle 1 */}
              <div className="absolute" style={{
                width: 8, height: 8,
                top: '50%', left: '50%',
                marginTop: -4, marginLeft: -4,
                animation: 'sunOrbit 3s linear infinite',
              }}>
                <div className="w-2 h-2 rounded-full bg-[#fde68a] shadow-lg shadow-amber-300" />
              </div>
              {/* Orbiting sparkle 2 */}
              <div className="absolute" style={{
                width: 6, height: 6,
                top: '50%', left: '50%',
                marginTop: -3, marginLeft: -3,
                animation: 'sunOrbit2 2.2s linear infinite',
              }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#fb923c]" />
              </div>
              {/* Core sun circle */}
              <div className="relative flex items-center justify-center rounded-full shadow-xl" style={{
                width: 44, height: 44,
                background: 'linear-gradient(135deg, #fef08a 0%, #f97316 60%, #dc2626 100%)',
                boxShadow: '0 0 20px #fbbf2488, 0 0 40px #f9731633',
              }}>
                <Sun className="h-5 w-5 text-white drop-shadow" />
              </div>
            </div>

            {/* Heading text */}
            <h2
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
              className="text-[3rem] sm:text-[4rem] lg:text-[5rem] font-bold text-[#1e1310] leading-[0.92] tracking-tight"
            >
              BUILT AROUND<br />
              <span
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                className="italic font-normal text-[#6b7a52]"
              >
                YOUR SKIN.
              </span>
            </h2>

            {/* 🌙 PREMIUM MOON */}
            <div
              className="relative flex-shrink-0 flex items-center justify-center"
              style={{ width: 80, height: 80, animation: 'moonFloat 5.5s ease-in-out infinite' }}
            >
              {/* Atmosphere halo */}
              <div className="absolute rounded-full" style={{
                width: 80, height: 80,
                background: 'radial-gradient(circle, #c4b5fd44 0%, #818cf833 50%, transparent 80%)',
                animation: 'moonAtmos 4s ease-in-out infinite',
              }} />
              <div className="absolute rounded-full" style={{
                width: 60, height: 60,
                background: 'radial-gradient(circle, #ddd6fe55 0%, #6366f133 60%, transparent 100%)',
                animation: 'moonAtmos 4s ease-in-out infinite 1s',
              }} />
              {/* Orbiting star 1 */}
              <div className="absolute" style={{
                width: 7, height: 7,
                top: '50%', left: '50%',
                marginTop: -3.5, marginLeft: -3.5,
                animation: 'moonOrbit 4s linear infinite',
              }}>
                <div style={{
                  width: 7, height: 7,
                  clipPath: 'polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
                  background: '#c4b5fd',
                  animation: 'twinkle 2s ease-in-out infinite',
                }} />
              </div>
              {/* Orbiting star 2 */}
              <div className="absolute" style={{
                width: 5, height: 5,
                top: '50%', left: '50%',
                marginTop: -2.5, marginLeft: -2.5,
                animation: 'moonOrbit2 3s linear infinite',
              }}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#a5b4fc]" style={{
                  animation: 'shimmer 1.8s ease-in-out infinite',
                  boxShadow: '0 0 4px #818cf8',
                }} />
              </div>
              {/* Core moon circle */}
              <div className="relative flex items-center justify-center rounded-full shadow-xl" style={{
                width: 44, height: 44,
                background: 'linear-gradient(135deg, #ddd6fe 0%, #818cf8 55%, #4f46e5 100%)',
                boxShadow: '0 0 20px #818cf888, 0 0 40px #6366f133',
              }}>
                <Moon className="h-5 w-5 text-white drop-shadow" />
                {/* crescent inner highlight */}
                <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.25)', filter: 'blur(2px)' }} />
              </div>
            </div>

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
                <div className="flex items-center gap-4 mb-8">
                  {/* Animated icon */}
                  <div className="relative flex-shrink-0">
                    {/* Glow ring */}
                    <div
                      className="absolute rounded-full pointer-events-none"
                      style={{
                        inset: '-6px',
                        background: isMorning
                          ? 'radial-gradient(circle, #fbbf2460 0%, #f9731640 60%, transparent 100%)'
                          : 'radial-gradient(circle, #c4b5fd60 0%, #818cf840 60%, transparent 100%)',
                        animation: isMorning
                          ? 'glowPulse 3s ease-in-out infinite'
                          : 'glowPulseMoon 4s ease-in-out infinite',
                      }}
                    />
                    {/* Icon circle */}
                    <div
                      className="relative flex h-10 w-10 items-center justify-center rounded-full shadow-md"
                      style={{
                        background: isMorning
                          ? 'linear-gradient(135deg, #fde68a, #f97316)'
                          : 'linear-gradient(135deg, #ddd6fe, #6366f1)',
                        animation: isMorning
                          ? 'floatSun 4s ease-in-out infinite'
                          : 'floatMoon 5s ease-in-out infinite',
                      }}
                    >
                      {isMorning
                        ? <Sun className="h-5 w-5 text-white drop-shadow-sm" />
                        : <Moon className="h-5 w-5 text-white drop-shadow-sm" />
                      }
                    </div>
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

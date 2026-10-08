import { useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import landingImage from '../assets/hero-landing.jpg';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const textOpacity = Math.max(1 - scrollY / 500, 0);

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-[#f8e6e3]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.7),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(255,255,255,0.42),transparent_28%)]" />
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#f3c9c5]/40 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#efd0b0]/25 blur-3xl" />

      <div
        className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 sm:px-10 lg:grid-cols-12 lg:gap-4 lg:px-16 lg:pb-12 lg:pt-24"
        style={{ opacity: textOpacity }}
      >
        <div className="order-2 lg:order-1 lg:col-span-5 lg:pr-8">
          <div className="mb-7 flex items-center gap-3 animate-fade-in">
            <span className="h-px w-8 bg-[#c98183]" />
            <span className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[#a66b70]">
              The skin intelligence platform
            </span>
          </div>

          <h1 className="max-w-xl font-serif text-[clamp(3.4rem,6vw,6.8rem)] font-medium leading-[0.9] tracking-[-0.04em] text-[#241c1b] animate-fade-up">
            Your Skin,
            <br />
            <span className="italic font-light text-[#b97379]">Understood.</span>
          </h1>

          <p className="mt-7 max-w-md font-sans text-base font-light leading-relaxed text-[#604c4b] sm:text-lg animate-fade-up" style={{ animationDelay: '0.15s', animationFillMode: 'backwards' }}>
            Discover what your skin needs, build a routine that feels like you, and find the right products across every brand.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
            <a
              href="#discover"
              className="group inline-flex items-center justify-center rounded-full bg-[#302625] px-7 py-3.5 font-sans text-sm font-medium text-white shadow-lg shadow-[#6e4a4a]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#453534] hover:shadow-xl active:scale-95"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#analysis"
              className="group inline-flex items-center justify-center rounded-full border border-[#bf898b] bg-white/25 px-7 py-3.5 font-sans text-sm font-medium text-[#4d3736] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/55 active:scale-95"
            >
              <Sparkles className="mr-2 h-4 w-4 text-[#b97379]" />
              AI Analysis
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#d7aaa8]/70 pt-5 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
            <div className="flex items-center gap-2 text-[#715858]">
              <Sparkles className="h-4 w-4 text-[#b97379]" />
              <span className="font-sans text-xs">AI-guided insights</span>
            </div>
            <div className="flex items-center gap-2 text-[#715858]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8fa181]" />
              <span className="font-sans text-xs">Brand neutral</span>
            </div>
            <div className="flex items-center gap-2 text-[#715858]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d29a83]" />
              <span className="font-sans text-xs">Personalized</span>
            </div>
          </div>
        </div>

        <div className="relative order-1 flex min-h-[390px] items-center justify-center lg:order-2 lg:col-span-7 lg:min-h-[680px]">
          <div className="absolute right-0 top-1/2 h-[88%] w-[92%] -translate-y-1/2 overflow-hidden rounded-[46%_46%_4%_4%/34%_34%_4%_4%] bg-[#f3cfcc] shadow-2xl shadow-[#9f6d6a]/20 sm:w-[76%] lg:w-[84%]">
            <img
              src={landingImage}
              alt="Glowing skin portrait - Skin Canvas"
              className="h-full w-full object-cover object-[center_35%] transition-transform duration-700 ease-editorial hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#6d4140]/10 via-transparent to-white/10" />
          </div>

          <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-2xl border border-white/70 bg-white/75 px-4 py-4 shadow-xl shadow-[#9f6d6a]/10 backdrop-blur-md animate-float sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4d7d4]">
                <Sparkles className="h-5 w-5 text-[#b97379]" />
              </div>
              <div>
                <p className="font-sans text-[0.65rem] uppercase tracking-[0.14em] text-[#9f7775]">Skin Canvas AI</p>
                <p className="font-serif text-lg text-[#302625]">Made for your skin</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => document.querySelector('#advisor')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-5 right-3 z-10 flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-4 py-2.5 font-sans text-xs font-medium text-[#4d3736] shadow-lg backdrop-blur-md transition-all hover:bg-white sm:bottom-10 sm:right-8"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#302625] text-white">
              <Play className="ml-0.5 h-3 w-3 fill-current" />
            </span>
            Meet your skin
          </button>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 font-sans text-[0.62rem] uppercase tracking-[0.2em] text-[#9f7775] lg:flex">
        <span className="h-6 w-px bg-[#bd8586]" />
        Explore your canvas
      </div>
    </section>
  );
}

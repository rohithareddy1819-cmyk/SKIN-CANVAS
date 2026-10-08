import { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import SkinAnalysis from '@/components/SkinAnalysis';
import SkinProfile from '@/components/SkinProfile';
import Routine from '@/components/Routine';
import Discover from '@/components/Discover';
import SmartMatching from '@/components/SmartMatching';
import Comparison from '@/components/Comparison';
import PriceComparison from '@/components/PriceComparison';
import AIAdvisor from '@/components/AIAdvisor';
import Progress from '@/components/Progress';
import TrustSection from '@/components/TrustSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div
      className="min-h-screen bg-ivory-50"
      style={{ animation: 'fadeInPage 0.6s ease forwards' }}
    >
      <style>{`@keyframes fadeInPage { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <SkinAnalysis />
        <SkinProfile />
        <Routine />
        <Discover />
        <SmartMatching />
        <Comparison />
        <PriceComparison />
        <AIAdvisor />
        <Progress />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;

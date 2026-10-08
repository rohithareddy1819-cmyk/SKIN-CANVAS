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
  return (
    <div className="min-h-screen bg-ivory-50">
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

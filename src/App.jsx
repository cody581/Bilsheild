import Navbar from './Navbar';
import Hero from './Hero';
import SavingsCalculator from './SavingsCalculator';
import HowItWorks from './HowItWorks';
import TrustSignals from './TrustSignals';
import WaitlistSignup from './WaitlistSignup';
import Footer from './Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <SavingsCalculator />
        <TrustSignals />
        <WaitlistSignup />
      </main>
      <Footer />
    </div>
  );
}

export default App;

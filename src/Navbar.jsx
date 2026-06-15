import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-bs-950/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#nav-shield)" />
              <path d="M16 6L24 9.5V16C24 21.5 20 26.5 16 28C12 26.5 8 21.5 8 16V9.5L16 6Z" fill="white" fillOpacity="0.9" />
              <path d="M14 17L17 14L19 17" stroke="#0d7663" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 14V18" stroke="#0d7663" strokeWidth="1.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="nav-shield" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#3b8bf2" />
                  <stop offset="1" stopColor="#0d937a" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white font-bold text-lg">BillShield</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#how-it-works" className="text-sm text-bs-200 hover:text-white transition-colors">How It Works</a>
            <a href="#calculator" className="text-sm text-bs-200 hover:text-white transition-colors">Savings</a>
            <a href="#waitlist" className="text-sm px-4 py-2 rounded-lg bg-teal-500/20 text-teal-300 
                                         hover:bg-teal-500/30 hover:text-teal-200 border border-teal-500/30 
                                         transition-all font-medium">
              Join Waitlist
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-3">
              <a
                href="#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-bs-200 hover:text-white px-2 py-2 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-bs-200 hover:text-white px-2 py-2 transition-colors"
              >
                Savings Calculator
              </a>
              <a
                href="#waitlist"
                onClick={() => setMobileOpen(false)}
                className="text-sm text-teal-300 font-medium px-2 py-2 transition-colors"
              >
                Join Waitlist →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
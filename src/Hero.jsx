export default function Hero() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-bs-950 via-bs-900 to-teal-950 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, white 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-bs-500/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 
                        text-teal-200 text-xs font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          Zero effort. Real savings.
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
          We Negotiate Your Bills{' '}
          <span className="bg-gradient-to-r from-teal-300 to-bs-300 bg-clip-text text-transparent">
            So You Don't Have To
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-bs-200 max-w-2xl mx-auto mb-8 leading-relaxed">
          BillShield automatically finds every recurring bill, negotiates lower rates, 
          and saves you <strong className="text-white">15–40%</strong> on everything you already pay for. 
          Internet. Phone. Insurance. Streaming. SaaS. Set it and forget it.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            onClick={scrollToWaitlist}
            className="px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-400 to-teal-500 
                       text-bs-950 hover:from-teal-300 hover:to-teal-400 
                       shadow-xl shadow-teal-500/30 hover:shadow-teal-500/40
                       transition-all duration-200 transform hover:scale-[1.02]"
          >
            Start Saving Today — It's Free
          </button>
          <a
            href="#how-it-works"
            className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white/80 
                       border border-white/20 hover:bg-white/10 hover:text-white
                       transition-all duration-200"
          >
            How It Works
          </a>
        </div>

        {/* Trust */}

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-bs-300 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pay only if we save you money
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            100% money-back guarantee
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Avg. $300+ saved per year
          </div>
        </div>
      </div>
    </section>
  );
}
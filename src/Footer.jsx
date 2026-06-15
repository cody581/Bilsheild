export default function Footer() {
  return (
    <footer className="bg-bs-950 text-bs-300 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="url(#shield-grad)" />
              <path d="M16 6L24 9.5V16C24 21.5 20 26.5 16 28C12 26.5 8 21.5 8 16V9.5L16 6Z" fill="white" fillOpacity="0.9" />
              <path d="M14 17L17 14L19 17" stroke="#0d7663" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 14V18" stroke="#0d7663" strokeWidth="1.5" strokeLinecap="round" />
              <defs>
                <linearGradient id="shield-grad" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#3b8bf2" />
                  <stop offset="1" stopColor="#0d937a" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-white font-bold text-lg">BillShield</span>
          </div>

          <p className="text-xs text-bs-400 text-center md:text-right">
            &copy; {new Date().getFullYear()} BillShield. All rights reserved.
            <br className="md:hidden" />
            <span className="hidden md:inline"> — </span>
            Save smarter. Save automatically.
          </p>
        </div>
      </div>
    </footer>
  );
}
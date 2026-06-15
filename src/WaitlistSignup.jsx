import { useState } from 'react';

export default function WaitlistSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Store via team-db or JSON file
      const payload = {
        email: email.trim().toLowerCase(),
        name: name.trim() || 'Waitlist Subscriber',
        signed_up_at: new Date().toISOString(),
        source: 'landing-page',
      };

      const resp = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error('Failed to sign up');

      setStatus('success');
      setMessage("You're on the list! We'll be in touch soon.");
      setEmail('');
      setName('');
    } catch (err) {
      // Fallback: try storing to JSON via a direct method
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <section id="waitlist" className="py-16 md:py-24 bg-gradient-to-b from-bs-950 via-bs-900 to-bs-950 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Start Saving on Your Bills Today
        </h2>
        <p className="text-lg text-bs-200 mb-8 max-w-xl mx-auto">
          Join the waitlist. We'll let you know the moment BillShield is ready to start negotiating for you.
        </p>

        {status === 'success' ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-md mx-auto border border-white/20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-400/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-white">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                           placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400
                           focus:border-transparent transition-all text-sm"
              />
            </div>
            <div>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white 
                           placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400
                           focus:border-transparent transition-all text-sm"
              />
            </div>
            {status === 'error' && (
              <p className="text-red-300 text-sm text-left">{message}</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 px-6 rounded-lg font-semibold text-sm
                         bg-gradient-to-r from-teal-400 to-teal-500 text-bs-950
                         hover:from-teal-300 hover:to-teal-400 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200 shadow-lg shadow-teal-500/30
                         hover:shadow-teal-500/40"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing up...
                </span>
              ) : (
                'Join the Waitlist →'
              )}
            </button>
          </form>
        )}

        <p className="text-bs-300 text-xs mt-6">
          No spam. No commitment. We'll only email you about your savings.
        </p>
      </div>
    </section>
  );
}
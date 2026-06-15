export default function TrustSignals() {
  const guarantees = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Pay Only When You Save',
      desc: 'We take 30% of your first-year savings. If we don\'t save you money, you pay nothing — ever.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: '100% Satisfaction Guarantee',
      desc: 'Not happy with your savings? Cancel anytime, no questions asked. We mean it.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      title: 'Bank-Level Security',
      desc: 'Your data is encrypted end-to-end. We use bank-grade security to protect your information.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: 'Set It & Forget It',
      desc: 'Connect once. We monitor your bills year-round and keep negotiating. You just enjoy the savings.',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why BillShield?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We only win when you win. No jargon, no hidden fees, no fine print.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((g) => (
            <div key={g.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 
                                          hover:shadow-md hover:border-bs-100 transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-bs-50 text-bs-600 flex items-center justify-center mb-4">
                {g.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{g.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
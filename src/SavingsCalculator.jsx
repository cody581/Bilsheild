import { useState, useEffect } from 'react';

const BILL_CATEGORIES = [
  { name: 'Internet', icon: '📡', typical: 80 },
  { name: 'Phone', icon: '📱', typical: 90 },
  { name: 'Insurance', icon: '🛡️', typical: 180 },
  { name: 'Streaming', icon: '🎬', typical: 60 },
  { name: 'SaaS', icon: '💻', typical: 100 },
];

export default function SavingsCalculator() {
  const [bills, setBills] = useState(() =>
    BILL_CATEGORIES.map((cat) => cat.typical)
  );
  const [savingsRate, setSavingsRate] = useState(27);

  const totalMonthly = bills.reduce((a, b) => a + b, 0);
  const monthlySavings = totalMonthly * (savingsRate / 100);
  const annualSavings = monthlySavings * 12;

  const updateBill = (index, value) => {
    const next = [...bills];
    next[index] = Math.max(0, Number(value) || 0);
    setBills(next);
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-gradient-to-b from-bs-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See How Much You Could Save
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your estimated monthly bills below. We'll negotiate them down — you keep the savings.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          <div className="grid gap-4 md:gap-5">
            {BILL_CATEGORIES.map((cat, i) => (
              <div key={cat.name} className="flex items-center gap-3 md:gap-4">
                <span className="text-xl md:text-2xl w-8 text-center flex-shrink-0">{cat.icon}</span>
                <label className="text-sm font-medium text-gray-700 w-20 md:w-24 flex-shrink-0">
                  {cat.name}
                </label>
                <div className="flex items-center flex-1 gap-2">
                  <span className="text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    max="9999"
                    value={bills[i]}
                    onChange={(e) => updateBill(i, e.target.value)}
                    className="w-full max-w-[140px] px-3 py-2 border border-gray-200 rounded-lg text-sm 
                               focus:ring-2 focus:ring-bs-500 focus:border-bs-500 outline-none
                               transition-shadow"
                  />
                  <span className="text-gray-400 text-xs">/mo</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Estimated savings rate: <strong>{savingsRate}%</strong>
              </span>
              <span className="text-xs text-gray-400">Drag to adjust</span>
            </div>
            <input
              type="range"
              min="15"
              max="40"
              value={savingsRate}
              onChange={(e) => setSavingsRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                         accent-bs-500 [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                         [&::-webkit-slider-thumb]:bg-bs-500 [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:shadow-md"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>15%</span>
              <span>27%</span>
              <span>40%</span>
            </div>
          </div>

          <div className="mt-6 p-5 bg-gradient-to-r from-bs-500 to-teal-500 rounded-xl text-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm opacity-80 mb-1">Monthly Bills</p>
                <p className="text-2xl md:text-3xl font-bold">${totalMonthly.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80 mb-1">Monthly Savings</p>
                <p className="text-2xl md:text-3xl font-bold">${monthlySavings.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-sm opacity-80 mb-1">Annual Savings</p>
                <p className="text-2xl md:text-3xl font-bold">${annualSavings.toFixed(0)}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            * Estimates based on typical savings of 15–40%. Actual savings vary by bill type and provider.
          </p>
        </div>
      </div>
    </section>
  );
}

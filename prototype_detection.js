/**
 * prototype_detection.js
 * 
 * This script simulates the bill detection logic using mock Plaid data.
 */

const mockPlaidRecurringResponse = {
  outflow_streams: [
    {
      merchant_name: "Comcast",
      description: "COMCAST CABLE",
      average_amount: { amount: 120.00, currency: "USD" },
      frequency: "monthly",
      category: ["Service", "Cable"],
      last_date: "2026-06-01",
      status: "active"
    },
    {
      merchant_name: "Netflix",
      description: "NETFLIX.COM",
      average_amount: { amount: 15.99, currency: "USD" },
      frequency: "monthly",
      category: ["Service", "Entertainment", "Streaming"],
      last_date: "2026-05-15",
      status: "active"
    },
    {
      merchant_name: "Geico",
      description: "GEICO INSURANCE",
      average_amount: { amount: 85.50, currency: "USD" },
      frequency: "monthly",
      category: ["Service", "Insurance", "Auto"],
      last_date: "2026-05-28",
      status: "active"
    },
    {
      merchant_name: "Starbucks",
      description: "STARBUCKS COFFEE",
      average_amount: { amount: 5.45, currency: "USD" },
      frequency: "weekly",
      category: ["Food and Drink", "Coffee Shop"],
      last_date: "2026-06-10",
      status: "active"
    }
  ]
};

function detectNegotiableBills(streams) {
  const NEGOTIABLE_CATEGORIES = ['Cable', 'Insurance', 'Internet', 'Utilities', 'Phone'];
  const MIN_AMOUNT = 20.00;

  return streams.filter(stream => {
    // Check if category matches negotiable list
    const isNegotiableCategory = stream.category.some(cat => NEGOTIABLE_CATEGORIES.includes(cat));
    
    // Check if amount is worth negotiating
    const isHighEnoughAmount = stream.average_amount.amount >= MIN_AMOUNT;

    // We usually negotiate monthly or annual bills
    const isRecurringCorrectly = ['monthly', 'annually'].includes(stream.frequency);

    return (isNegotiableCategory || isHighEnoughAmount) && isRecurringCorrectly;
  });
}

const detectedBills = detectNegotiableBills(mockPlaidRecurringResponse.outflow_streams);

console.log("=== Detected Recurring Bills ===");
detectedBills.forEach(bill => {
  console.log(`Merchant: ${bill.merchant_name}`);
  console.log(`Amount:   $${bill.average_amount.amount} (${bill.frequency})`);
  console.log(`Category: ${bill.category.join(', ')}`);
  console.log('---');
});

console.log(`Total detected for negotiation: ${detectedBills.length}`);

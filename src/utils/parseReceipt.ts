export interface ParsedBill {
  items: { name: string; price: number; id: string }[];
  subtotal: number;
  tax: number;
  total: number;
}

export function parseReceipt(text: string): ParsedBill {
  const lines = text.split('\n');
  const items: { name: string; price: number; id: string }[] = [];
  let subtotal = 0;
  let tax = 0;
  let total = 0;

  const priceRegex = /\$?(\d+\.\d{2})/;

  const excludeKeywords = [
    'total', 'subtotal', 'sub total', 'tax', 'balance', 'due', 'amount', 'change', 'cash', 
    'visa', 'master', 'amex', 'credit', 'debit', 'payment', 'tip', 'gratuity',
    'rounded', 'discount', 'savings', 'items', 'count', 'guest', 'table', 'server', 'receipt'
  ];

  lines.forEach((line, index) => {
    const trimmedLine = line.trim().toLowerCase();
    const priceMatch = line.match(priceRegex);

    if (priceMatch) {
      const price = parseFloat(priceMatch[1]);
      const isSummary = excludeKeywords.some(keyword => trimmedLine.includes(keyword));
      
      if (trimmedLine.includes('subtotal') || trimmedLine.includes('sub total')) {
        subtotal = price;
      } else if (trimmedLine.includes('tax')) {
        tax = price;
      } else if (trimmedLine.includes('total') && !trimmedLine.includes('subtotal')) {
        total = Math.max(total, price); // Keep the highest total found
      }

      // If it's not a summary line, it's likely a line item
      if (!isSummary) {
        // Clean the description: remove the price from the line
        const description = line.replace(priceMatch[0], '').replace(/[^\w\s]/g, '').trim();
        if (description.length > 2) {
          items.push({
            id: `item-${Date.now()}-${index}`,
            name: description.charAt(0).toUpperCase() + description.slice(1),
            price: price
          });
        }
      }
    }
  });

  // If subtotal wasn't found, calculate it
  if (subtotal === 0 && items.length > 0) {
    subtotal = items.reduce((acc, item) => acc + item.price, 0);
  }

  // If total wasn't found, calculate it
  if (total === 0) {
    total = subtotal + tax;
  }

  return { items, subtotal, tax, total };
}

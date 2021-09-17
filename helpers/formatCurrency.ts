export default function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
  }).format(value);
}

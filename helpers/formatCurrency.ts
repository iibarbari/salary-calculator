export default function formatCurrency(value: number, currency: string) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
  }).format(value);
}

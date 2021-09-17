type Country = string;

type Currency = {
  taxRate: number,
  currency: string,
}

type Exchange = {
  rates: Record<string, number>
};

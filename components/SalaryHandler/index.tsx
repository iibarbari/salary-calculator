import React, { useState } from 'react';
import { SalaryContext, SalaryType } from '../../contexts';

type Props = {
  children: React.ReactNode,
};

export default function SalaryHandler({ children }: Props) {
  const [salary, setSalary] = useState<SalaryType>({
    amount: null,
    country: null,
    currency: 'usd',
    exchangeRate: null,
    time: 'Annual',
  });

  return (
    <SalaryContext.Provider value={{ salary, setSalary }}>
      {children}
    </SalaryContext.Provider>
  );
}

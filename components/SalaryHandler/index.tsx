import React, { useState } from 'react';
import { SalaryContext, SalaryType } from '../../contexts';

type Props = {
  children: React.ReactNode,
};

export default function SalaryHandler({ children }: Props) {
  const [salary, setSalary] = useState<SalaryType>({
    currency: 'usd',
    time: 'Annual',
    amount: null,
    country: null,
  });

  return (
    <SalaryContext.Provider value={{ salary, setSalary }}>
      {children}
    </SalaryContext.Provider>
  );
}

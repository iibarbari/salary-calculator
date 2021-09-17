import React, { createContext } from 'react';

export type Salary = {
  amount: number | null,
  country: string | null,
  currency: CurrencyType,
  time: TimeFrame,
}

type Value = {
  salary: Salary,
  setSalary: React.Dispatch<React.SetStateAction<Value['salary']>>
};

const SalaryContext = createContext({} as Value);

export default SalaryContext;

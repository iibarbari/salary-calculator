import { createContext } from 'react';

type Value = {
  rates: Record<Country, Currency>,
};

const RatesContext = createContext({} as Value);

export default RatesContext;

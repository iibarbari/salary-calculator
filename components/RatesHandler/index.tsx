import React from 'react';
import { RatesContext } from '../../contexts';
import data from '../../data';

type Props = {
  children: React.ReactNode,
};

export default function RatesHandler({ children }: Props) {
  return (
    <RatesContext.Provider value={{ rates: data }}>
      {children}
    </RatesContext.Provider>
  );
}

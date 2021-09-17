import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { RatesContext, SalaryContext } from '../../contexts';
import { formatCurrency } from '../../helpers';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['table']>;

type DatumKey = 'annualSummary' | 'localTaxes' | 'annualCost' | 'monthlyPayroll';

type Datum = Record<DatumKey, {
  usd: number,
  local: number,
  title: string,
}>;

const initialData: Datum = {
  annualSummary: {
    usd: 0,
    local: 0,
    title: 'Annual Summary',
  },
  localTaxes: {
    usd: 0,
    local: 0,
    title: 'Local Taxes',
  },
  annualCost: {
    usd: 0,
    local: 0,
    title: 'Annual Cost',
  },
  monthlyPayroll: {
    usd: 0,
    local: 0,
    title: 'Monthly Payroll',
  },
};

export default function SummaryTable({ className, ...props }: Props) {
  const { rates } = useContext(RatesContext);
  const { salary } = useContext(SalaryContext);
  const [output, setOutput] = useState<Datum>(initialData);

  useEffect(() => {
    if ([salary.amount, salary.country].includes(null)) return;

    const annualAmount = salary.time === 'Annual' ? salary.amount : salary.amount * 12;
    const localTaxes = annualAmount * rates[salary.country].taxRate;
    const annualCost = annualAmount + localTaxes;
    const monthlyPayroll = annualCost / 12;

    setOutput({
      ...output,
      annualSummary: {
        ...output.annualSummary,
        local: annualAmount,
        usd: annualAmount,
      },
      localTaxes: {
        ...output.localTaxes,
        local: localTaxes,
        usd: localTaxes,
      },
      annualCost: {
        ...output.annualCost,
        local: annualCost,
        usd: annualCost,
      },
      monthlyPayroll: {
        ...output.monthlyPayroll,
        local: monthlyPayroll,
        usd: monthlyPayroll,
      },
    });
  }, [salary]);

  return (
    <AnimatePresence exitBeforeEnter>
      {output.annualSummary.local > 0 && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          initial={{ opacity: 0, y: 50 }}
          key="table"
        >
          <Table
            {...props}
            bordered
            className={classNames('align-middle', className)}
            hover
            responsive
            striped
          >
            <thead className="table-dark">
              <tr>
                <th aria-label="table" scope="col" />

                <th scope="col">{rates[salary.country].currency}</th>

                <th scope="col">$</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(output).map((key) => (
                <tr key={key}>
                  <th scope="row">{output[key].title}</th>

                  <td>
                    {formatCurrency(output[key].local, rates[salary.country].currency)}
                  </td>

                  <td>
                    {formatCurrency(output[key].usd, 'USD')}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

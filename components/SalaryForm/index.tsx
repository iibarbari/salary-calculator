import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext } from 'react';
import { Col, Dropdown, DropdownButton, Form, InputGroup, Row } from 'react-bootstrap';
import { RatesContext, SalaryContext } from '../../contexts';
import styles from './SalaryForm.module.css';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['form']>;

export default function SalaryForm({ className, ...props }: Props) {
  const { rates } = useContext(RatesContext);
  const { salary, setSalary } = useContext(SalaryContext);

  return (
    <motion.div layout="position">
      <Form
        {...props}
        as={Row}
        className={classNames(styles.salaryForm, className)}
        onSubmit={(e) => e.preventDefault()}
      >
        <Form.Group as={Col} controlId="contr" sm={4} xl={{ offset: 2, span: 3 }}>
          <Form.Label>Country</Form.Label>
          <Form.Select
            as="select"
            className="px-3 p-sm-4"
            name="country"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSalary({
              ...salary,
              [e.target.name]: e.target.value,
            })}
            placeholder="Select Country"
            value={salary.country || ''}
          >
            {salary.country === null && (
              <option aria-label="country" disabled value="" />
            )}

            {Object.keys(rates).map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </Form.Select>

          <AnimatePresence exitBeforeEnter>
            {salary.country !== null && (
              <Form.Text className="text-muted" key="country-text">
                {`Annual tax rate: ${rates[salary.country].taxRate}`}
              </Form.Text>
            )}
          </AnimatePresence>

        </Form.Group>

        <Form.Group as={Col} controlId="annualSalary" lg={6} sm={8} xl={{ span: 5 }}>
          <Form.Label>Salary</Form.Label>

          <InputGroup className={classNames(styles.inputGroup)}>
            {salary.country === null ? (
              <InputGroup.Text className="px-2 p-sm-4">USD</InputGroup.Text>
            ) : (
              <DropdownButton
                className="px-2 p-sm-4"
                title={salary.currency === 'usd' ? 'USD' : rates[salary.country].currency}
                variant="outline-dark"
              >
                <Dropdown.Item
                  onClick={() => setSalary({ ...salary, currency: 'local' })}
                >
                  {rates[salary.country].currency}
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => setSalary({ ...salary, currency: 'usd' })}
                >
                  USD
                </Dropdown.Item>
              </DropdownButton>
            )}

            <Form.Control
              className="px-3 p-sm-4"
              name="amount"
              onChange={(e) => setSalary({
                ...salary,
                amount: Number(e.target.value),
              })}
              placeholder="Amount"
              type="number"
              value={salary.amount || ''}
            />

            <DropdownButton
              title={salary.time}
              variant="outline-dark"
            >
              <Dropdown.Item
                onClick={() => setSalary({ ...salary, time: 'Annual' })}
              >
                Annual
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => setSalary({ ...salary, time: 'Monthly' })}
              >
                Monthly
              </Dropdown.Item>
            </DropdownButton>
          </InputGroup>

          <AnimatePresence exitBeforeEnter>
            {salary.country !== null && (
              <Form.Text className="text-muted" key="currency-text">
                {salary.currency === 'local' ? `Exchange rate: ${1 / 0.1} ${rates[salary.country].currency} / USD`
                  : ` Exchange rate: ${0.1} USD/${rates[salary.country].currency}`}
              </Form.Text>
            )}
          </AnimatePresence>
        </Form.Group>
      </Form>
    </motion.div>
  );
}

import classNames from 'classnames';
import React, { useContext } from 'react';
import { Col, Dropdown, DropdownButton, Form, InputGroup, Row } from 'react-bootstrap';
import { RatesContext, SalaryContext } from '../../contexts';
import styles from './SalaryForm.module.css';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['form']>;

export default function SalaryForm({ className, ...props }: Props) {
  const { rates } = useContext(RatesContext);
  const { salary, setSalary } = useContext(SalaryContext);

  return (
    <Form {...props} as={Row} className={classNames(styles.salaryForm, className)} onSubmit={(e) => e.preventDefault()}>
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

        {salary.country === null ? null : (
          <Form.Text className="text-muted">
            {`Annual tax rate: ${rates[salary.country].taxRate}`}
          </Form.Text>
        )}
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

        {salary.country === null ? null : (
          <Form.Text className="text-muted">
            {salary.currency === 'local' ? `${rates[salary.country].currency} / USD : ${1 / 0.1}` : `USD/${rates[salary.country].currency} : ${0.1}`}
          </Form.Text>
        )}
      </Form.Group>
    </Form>
  );
}

import React, { useContext } from 'react';
import { Col, Dropdown, DropdownButton, Form, InputGroup, Row } from 'react-bootstrap';
import { RatesContext, SalaryContext } from '../../contexts';

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['form']>;

export default function SalaryForm({ className, ...props }: Props) {
  const { rates } = useContext(RatesContext);
  const { salary, setSalary } = useContext(SalaryContext);

  return (
    <Form {...props} className={className}>
      <fieldset>
        <Row>
          <Form.Group as={Col} controlId="contr" sm={4} xl={{ offset: 2, span: 3 }}>
            <Form.Label>Country</Form.Label>
            <Form.Select
              as="select"
              name="country"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSalary({
                ...salary,
                [e.target.name]: e.target.value,
              })}
              placeholder="Select Country"
              size="lg"
              value={salary.country || ''}
            >
              <option aria-label="initial country" />

              {Object.keys(rates).map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="annualSalary" lg={6} sm={8} xl={{ span: 5 }}>
            <Form.Label>Salary</Form.Label>

            <InputGroup className="mb-3">
              {salary.country === null ? (
                <InputGroup.Text>$</InputGroup.Text>
              ) : (
                <DropdownButton
                  title={salary.currency === 'usd' ? '$' : rates[salary.country].currency}
                >
                  <Dropdown.Item
                    onClick={() => setSalary({ ...salary, currency: 'local' })}
                  >
                    {rates[salary.country].currency}
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={() => setSalary({ ...salary, currency: 'usd' })}
                  >
                    $
                  </Dropdown.Item>
                </DropdownButton>
              )}

              <Form.Control
                name="amount"
                onChange={(e) => setSalary({
                  ...salary,
                  amount: Number(e.target.value),
                })}
                placeholder="Amount"
                size="lg"
                type="number"
                value={salary.amount || ''}
              />

              <DropdownButton
                title={salary.time}
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
          </Form.Group>
        </Row>
      </fieldset>
    </Form>
  );
}

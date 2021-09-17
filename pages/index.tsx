import React from 'react';
import { Col, Container } from 'react-bootstrap';
import { Layout, SalaryForm, SummaryTable } from '../components';

export default function Index() {
  return (
    <Layout>
      <Container>
        <SalaryForm className="mb-5" />
      </Container>

      <Container>
        <Col xl={{ span: 8, offset: 2 }}>
          <SummaryTable />
        </Col>
      </Container>
    </Layout>
  );
}

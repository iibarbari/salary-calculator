import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import Link from 'next/link';

export default function Header() {
  return (
    <Navbar bg="light">
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>salarie</Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  );
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>LinkedOut</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/posts/new">
              <Nav.Link>Create Post</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

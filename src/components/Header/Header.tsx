import React from "react";
import styles from './Header.module.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

interface NavLink {
  href: string;
  text: string;
  dropdown?: DropdownItem[];
}

interface DropdownItem {
  href: string;
  text: string;
  isZone?: boolean;
}

interface HeaderProps {
  title?: string;
  activeLink?: string;
}

const navLinks: NavLink[] = [
  {
    href: "/alerts/",
    text: "Alerts",
    dropdown: [
      { href: "/zone/1", text: "Zone 1", isZone: true },
      { href: "/zone/2", text: "Zone 2", isZone: true },
      { href: "/zone/3", text: "Zone 3", isZone: true },
      { href: "/zone/4", text: "Zone 4", isZone: true },
      { href: "/zone/5", text: "Zone 5", isZone: true }
    ]
  },
  { href: "/upload/", text: "Upload" },
  { href: "/status/", text: "Status" },
  { href: "/zones/", text: "Zones" },
  { href: "/map/", text: "Map" },
];

function Header({ title = "AI Dashboard", activeLink }: HeaderProps) {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand href="/" className={styles.brandContainer}>
          <img src="/images/logo.png" alt="logo" className={`d-inline-block align-top ${styles.logo}`} />
          {activeLink && <span className={styles.pageName}>{activeLink}</span>}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {navLinks.map((link, index) => (
              link.dropdown ? (
                <NavDropdown title={link.text} id={`nav-dropdown-${index}`} key={index}>
                  {link.dropdown.filter(item => item.isZone).map((item, idx) => (
                    <NavDropdown.Item href={item.href} key={idx} target="_blank" className={styles.redZone}>
                      {item.text}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link href={link.href} key={index} className={activeLink === link.text ? "active" : ""}>
                  {link.text}
                </Nav.Link>
              )
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

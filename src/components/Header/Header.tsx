import React from "react";
import styles from './Header.module.css';

interface NavLink {
  href: string;
  text: string;
}

interface HeaderProps {
  title?: string;
  activeLink?: string; 
}

const navLinks: NavLink[] = [
  { href: "/alerts/", text: "Alerts" },
  { href: "/data-io/", text: "I/O" },
  { href: "/status/", text: "Status" },
  { href: "/zones/", text: "Zones" },
  { href: "/map/", text: "Map" },
];

function Header({ title = "AI Dashboard", activeLink }: HeaderProps) {
    return (
        <div className="container-fluid p-0 bg-light sticky-top shadow-sm">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container d-flex flex-nowrap">

                    <div className="d-flex align-items-center">
                        <a href="/">
                            <div className={`flex-shrink-0 overflow-hidden ${styles.logo}`}>
                                <img className={`img-fluid ${styles.logo}`} src="/images/logo.png" alt="logo" />
                            </div>
                        </a>

                        <a className="navbar-brand flex-grow-1 ms-3 fs-4" href="/">{title}</a>
                    </div>

                    <div className="d-none d-md-flex align-items-center gap-4 fs-5">
                        <div className="navbar-nav d-flex align-items-center gap-4">
                            {navLinks.map((link, index) => (
                                <a key={index}
                                   className={`nav-link flex-grow-1 ${activeLink === link.text ? "active" : ""}`}
                                   href={link.href}>
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;

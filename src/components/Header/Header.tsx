import React from "react";
import styles from './Header.module.css';

function Header() {
    return (
        <div className="container-fluid p-0 bg-light sticky-top">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container d-flex flex-nowrap">

                    <div className="d-flex align-items-center">
                        <a href="/">
                            <div className={`flex-shrink-0 overflow-hidden ${styles.logo}`}>
                                <img className={`img-fluid ${styles.logo}`} src="/images/logo.png" alt="logo" />
                            </div>
                        </a>

                        <a className="navbar-brand flex-grow-1 ms-3 fs-4" href="/">AI Dashboard</a>
                    </div>

                    <div className="d-none d-md-flex align-items-center gap-4 fs-5">
                        <div className="d-flex align-items-center gap-4">
                            <a className="nav-link flex-grow-1" href="/alerts/">Alerts</a>
                            <a className="nav-link flex-grow-1" href="/data-io/">I/O</a>
                            <a className="nav-link flex-grow-1" href="/status/">Status</a>
                            <a className="nav-link flex-grow-1" href="/zones/">Zones</a>
                        </div>
                    </div>
                </div>

            </nav>
        </div>
    );
}

export default Header;

import React from "react";
import Logo from "../../../assets/logo.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import "./nav-bar.css";

function NavBar() {

  const Logoff = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('id')
    localStorage.removeItem('cat')
  }
 

  return (
    <>
      <Nav
        className="navbar navbar-expand-lg nav-bar navbar-dark bg-dark"
        aria-label="Offcanvas navbar large"
      >
        <Container className="container-fluid">
          <img
            src={Logo}
            alt="Logo"
            width="40"
            height="55"
            className="img-nav"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar2"
            aria-controls="offcanvasNavbar2"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            id="offcanvasNavbar2"
            aria-labelledby="offcanvasNavbar2Label"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbar2Label">
                Sis Escala
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Nav.Link
                    className="nav-link"
                    aria-current="page"
                    href="/principal"
                  >
                    <span>Inicio</span>
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link href="/servico" className="navbar-link">
                    <span>Serviço</span>
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link href="/militar" className="navbar-link">
                    <span>Militar</span>
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link href="/user" className="navbar-link">
                    <span>Usuario</span>
                  </Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link href="/" onClick={Logoff} className="navbar-link">
                    <span>Exit</span>
                  </Nav.Link>
                </li>
              </div>
            </div>
          </div>
        </Container>
      </Nav>
    </>
  );
}

export default NavBar;

import React, { Fragment } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Queues from "./Queues";

const NavbarComp = () => {
  return (
    <Fragment>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Qzilla
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/queues">
                Queues
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/queues" element={<Queues />} />
        <Route
          path="*"
          element={
            <h3 style={{ textAlign: "center", margin: "200px" }}>
              Error 404. No page found
            </h3>
          }
        />
      </Routes>
    </Fragment>
  );
};

export default NavbarComp;

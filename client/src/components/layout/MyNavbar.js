import React from "react";
import { Navbar, Container, Button, ButtonToolbar } from "react-bootstrap";
import logo from "../../logo.png";

const MyNavbar = props => {
  return (
    <>
      <Navbar bg="light" className="border border-black">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Twitter Logo"
            />
          </Navbar.Brand>
          <h3>React Twitter</h3>
          <ButtonToolbar>
            <Button variant="outline-primary" size="sm" className="mr-3 px-4">
              Log In
            </Button>
            <Button size="sm" className="px-4">
              Sign In
            </Button>
          </ButtonToolbar>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;

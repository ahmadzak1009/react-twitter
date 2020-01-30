import React, { useContext } from "react";
import { Navbar, Container, Button, ButtonToolbar, Badge } from "react-bootstrap";
import logo from "../../logo.png";
import { Context } from "../../Context";
import { Link } from "react-router-dom";

const MyNavbar = props => {
  const { user, setUser } = useContext(Context);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("idUser");
    setUser(null);
  };

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
            <h3 className="d-inline-block ml-2">React Twitter</h3>
          </Navbar.Brand>
          {user ? (
            <div>
              <h5 className="d-inline-block mr-1">Hello, {user.username}</h5>{" "}
              <Badge pill variant="primary" style={{ cursor: "pointer" }} onClick={onLogout}>
                logout
              </Badge>
            </div>
          ) : (
            <>
              <ButtonToolbar>
                <Link to="/login">
                  <Button variant="outline-primary" size="sm" className="mr-3 px-4">
                    Log In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button size="sm" className="px-4">
                    Sign up
                  </Button>
                </Link>
              </ButtonToolbar>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;

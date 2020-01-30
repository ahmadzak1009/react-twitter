import React, { useState, useEffect } from "react";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, ButtonToolbar } from "react-bootstrap";
import axios from "axios";

const SignUp = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("idUser");
    if (token && idUser) return props.history.push("/");
  });

  const onSignUp = async e => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/register", { username, password });
      const data = await response.data;

      window.alert("Sign up success!");
      console.log(data);
      props.history.push("/login");
    } catch (err) {
      console.log(err);
      window.alert("There's error on the Server");
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col md={6} className="m-auto">
            <Row>
              <Col className="d-flex justify-content-center align-items-center flex-column">
                <Link to="/">
                  <img
                    src={logo}
                    alt="React Twitter Logo"
                    width="50"
                    height="50"
                    className="my-3"
                  />
                </Link>
                <h4 className="mb-4">Log in to Twitter</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      onChange={e => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <ButtonToolbar>
                    <Button
                      disabled={!username || !password ? true : false}
                      type="submit"
                      className="rounded-pill mt-4"
                      block
                      onClick={onSignUp}
                    >
                      Sign up
                    </Button>
                  </ButtonToolbar>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-3">
                <Link to="/login">Login</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;

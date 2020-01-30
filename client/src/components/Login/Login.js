import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button, ButtonToolbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import axios from "axios";
import { Context } from "../../Context";

const Login = props => {
  const { setUser } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("idUser");
    if (token && idUser) return props.history.push("/");
  });

  const onLogin = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { username, password });
      const data = await response.data;
      if (!data.token) return window.alert(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("idUser", data.id);
      setUser(undefined);
      props.history.push("/");
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
                <h4 className="mb-4">Sign Up to Twitter</h4>
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
                      onClick={onLogin}
                    >
                      Log in
                    </Button>
                  </ButtonToolbar>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col className="text-center mt-3">
                <Link to="/sign-up">Sign Up For Twitter</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;

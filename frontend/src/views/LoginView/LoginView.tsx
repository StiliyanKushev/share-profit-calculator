import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { loginUser } from "../../api/authService";
import { AuthContext } from "../../contexts/Auth/provider";

const LoginView: React.FC = () => {
  const {
    state: { loading },
    dispatch: authDispatch,
  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // Email validation effect
  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setIsEmailValid(emailRegex.test(email) || email === "");
  }, [email]);

  // Password validation effect
  useEffect(() => {
    setIsPasswordValid(password.length >= 8 || password === "");
  }, [password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEmailValid && email && password) {
      authDispatch({
        type: "auth_loading",
      });
      const response = await loginUser({
        email,
        password,
      });
      if (response?.accessToken) {
        authDispatch({
          type: "auth_successful",
          payload: {
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
            email,
          },
        });
      } else {
        authDispatch({
          type: "auth_failed",
        });
      }
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={
                !isEmailValid && email.length > 0
                  ? {
                      content: "Please enter a valid email address",
                      pointing: "below",
                    }
                  : null
              }
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={
                !isPasswordValid
                  ? {
                      content: "Password must be at least 8 characters long",
                      pointing: "below",
                    }
                  : null
              }
            />
            <Button
              color="black"
              fluid
              size="large"
              loading={loading}
              disabled={
                !isEmailValid ||
                !isPasswordValid ||
                !email ||
                !password ||
                loading
              }
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New here? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginView;

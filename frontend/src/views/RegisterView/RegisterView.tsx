import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const RegisterView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // Validate password match on every password or repeatPassword change
  useEffect(() => {
    if (password && repeatPassword) {
      setPasswordsMatch(password === repeatPassword);
    } else {
      // Reset validation message if either field is cleared
      setPasswordsMatch(true);
    }
  }, [password, repeatPassword]);

  // Password validation effect
  useEffect(() => {
    setIsPasswordValid(password.length >= 8 || password === "");
  }, [password]);

  // Email validation effect
  useEffect(() => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordsMatch && isEmailValid && password && email) {
      // todo: proceed with registration logic
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          Register as a new user
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
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Repeat Password"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              error={
                !passwordsMatch
                  ? {
                      content: "Passwords do not match",
                      pointing: "below",
                    }
                  : null
              }
            />
            <Button
              color="black"
              fluid
              size="large"
              disabled={!passwordsMatch || !isEmailValid}
            >
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? <Link to="/login">Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default RegisterView;

import { useAppDispatch, useAppSelector } from "app/hooks";
import { useState } from "react";
import { Form, FormGroup, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { login, selectIsLoggedIn } from "./slice";

export function Login() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => dispatch(login({ username, password }));

  if (isLoggedIn) {
    navigate("/vampires");
  }

  return (
    <Container>
      <Form>
        <FormGroup className="mt-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormGroup>

        <FormGroup className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormGroup>

        <Button className="mt-3" onClick={onSubmit}>
          Log In
        </Button>
      </Form>
    </Container>
  );
}

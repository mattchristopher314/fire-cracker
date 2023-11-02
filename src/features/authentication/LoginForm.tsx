import { useState } from "react";
import Button from "../../ui/Button";
import { useLogin } from "./useLogin";
import MiniSpinner from "../../ui/MiniSpinner";
import Form from "../../ui/Form";
import styled from "styled-components";

const StyledDevOnlyButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;

  gap: 0.8rem;
  padding-top: 2.4rem;

  & button {
    flex: 1 1 0;
  }

  @media (max-width: 34em) {
    /* grid-template-columns: 1fr; */
    flex-direction: column;
    gap: 1.2rem;
  }
`;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, isLoggingIn } = useLogin();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit} type="basic">
      <Form.FullRow label="Email Address">
        <Form.Input
          type="email"
          id="email"
          autoComplete="username email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </Form.FullRow>

      <Form.FullRow label="Password">
        <Form.Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </Form.FullRow>

      <StyledDevOnlyButtonContainer>
        <Button $size="large">
          {!isLoggingIn ? "Log in" : <MiniSpinner size="12px" />}
        </Button>

        <Button
          $size="large"
          $variation="secondary"
          type="button"
          onClick={() => {
            setEmail("tester@firecracker.website");
            setPassword("password");
          }}
        >
          Test Account
        </Button>
      </StyledDevOnlyButtonContainer>
    </Form>
  );
};

export default LoginForm;

import { useState } from "react";
import Button from "../../ui/Button";
import FormFullRow from "../../ui/FormFullRow";
import FormInput from "../../ui/FormInput";
import { useLogin } from "./useLogin";
import MiniSpinner from "../../ui/MiniSpinner";
import Form from "../../ui/Form";
import styled from "styled-components";

const StyledDevOnlyButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;

  gap: 0.8rem;
  padding: 1.2rem 0;

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
    <Form onSubmit={handleSubmit}>
      <FormFullRow label="Email Address">
        <FormInput
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormFullRow>

      <FormFullRow label="Password">
        <FormInput
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoggingIn}
        />
      </FormFullRow>

      <StyledDevOnlyButtonContainer>
        <Button $size="large">
          {!isLoggingIn ? "Login" : <MiniSpinner size="12px" />}
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

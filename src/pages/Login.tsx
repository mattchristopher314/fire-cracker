import styled from "styled-components";
import Logo from "../ui/Logo";
import PageHeading from "../ui/PageHeading";
import LoginForm from "../features/authentication/LoginForm";

const StyledLogin = styled.div`
  width: 100%;
  min-height: 100dvh;
  background-color: var(--color-slate-50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;
  padding: 2.4rem;
`;

const FormContainer = styled.main`
  width: min(100%, 55rem);
`;

const Login: React.FC = () => {
  return (
    <StyledLogin>
      <Logo size="large" />
      <PageHeading>Log in to your account</PageHeading>

      <FormContainer>
        <LoginForm />
      </FormContainer>
    </StyledLogin>
  );
};

export default Login;

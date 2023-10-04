import styled from "styled-components";
import Logo from "../ui/Logo";
import PageHeading from "../ui/PageHeading";
import LoginForm from "../features/authentication/LoginForm";
import FullPageFormContainer from "../ui/FullPageFormContainer";

const StyledLogin = styled.div`
  background-color: var(--color-slate-50);
`;

const Login: React.FC = () => {
  return (
    <StyledLogin>
      <FullPageFormContainer>
        <Logo size="large" />
        <PageHeading>Log in to your account</PageHeading>

        <LoginForm />
      </FullPageFormContainer>
    </StyledLogin>
  );
};

export default Login;

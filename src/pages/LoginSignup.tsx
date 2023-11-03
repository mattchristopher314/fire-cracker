import styled from "styled-components";
import Logo from "../ui/Logo";
import PageHeading from "../ui/PageHeading";
import LoginForm from "../features/authentication/LoginForm";
import ViewSwitch from "../ui/ViewSwitch";
import SignupForm from "../features/authentication/SignupForm";

const StyledLoginSignup = styled.div`
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

const LoginSignup: React.FC = () => {
  return (
    <StyledLoginSignup>
      <Logo size="large" />

      <ViewSwitch selections={{ login: "Log in", signup: "Sign up" }}>
        <ViewSwitch.Outlet
          views={{
            login: (
              <div key="login">
                <PageHeading>Log in to your account</PageHeading>
                <FormContainer>
                  <LoginForm />
                </FormContainer>
              </div>
            ),
            signup: (
              <div key="signup">
                <PageHeading>Sign up</PageHeading>
                <FormContainer>
                  <SignupForm />
                </FormContainer>
              </div>
            ),
          }}
        />
      </ViewSwitch>
    </StyledLoginSignup>
  );
};

export default LoginSignup;

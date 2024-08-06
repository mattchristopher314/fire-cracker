import styled from "styled-components";
import Logo from "../ui/Logo";
import PageHeading from "../ui/PageHeading";
import LoginForm from "../features/authentication/LoginForm";
import ViewSwitch from "../ui/ViewSwitch";
import SignupForm from "../features/authentication/SignupForm";
import { useSearchParams } from "react-router-dom";
import DarkModeToggle from "../ui/DarkModeToggle";

const StyledLoginSignup = styled.div`
  width: 100%;
  min-height: 100dvh;
  background-color: var(--color-slate-100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.2rem;
  padding: 2.4rem;
`;

const StyledDarkModeToggle = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 1.2rem;
`;

const FormContainer = styled.main`
  width: min(100%, 55rem);
`;

const LoginSignup: React.FC = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  return (
    <StyledLoginSignup>
      <StyledDarkModeToggle>
        <DarkModeToggle size="3.2rem" $background="--color-slate-200" />
      </StyledDarkModeToggle>

      <Logo size="large" />

      <ViewSwitch
        forceView={success === "success" ? "signup" : undefined}
        selections={{ login: "Log in", signup: "Sign up" }}
      >
        <ViewSwitch.Outlet
          forceView={success === "success" ? "signup" : undefined}
          views={{
            login: (
              <div key="login">
                <PageHeading>Log in to your account</PageHeading>
                {success === "verified" && (
                  <p
                    style={{
                      fontSize: "1.4rem",
                      padding: "1.2rem 0",
                      fontWeight: "500",
                    }}
                  >
                    Email verified. You may now log in.
                  </p>
                )}
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

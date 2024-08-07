import Button from "../../ui/Button";
import { useLogin } from "./useLogin";
import MiniSpinner from "../../ui/MiniSpinner";
import Form from "../../ui/Form";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const StyledDevOnlyButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;

  gap: 0.8rem;
  padding-top: 2.4rem;

  & button {
    flex: 1 1 0;
  }

  @media (max-width: 34em) {
    flex-direction: column;
    gap: 1.2rem;
  }
`;

type FormValues = {
  email: string | undefined;
  password: string | undefined;
};

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState, setValue, reset } =
    useForm<FormValues>();
  const { errors } = formState;

  const { login, isLoggingIn } = useLogin();

  const onSubmit = ({ email, password }: FormValues): void => {
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="basic">
      <Form.FullRow label="Email Address" error={errors?.email?.message}>
        <Form.Input
          type="email"
          id="email"
          placeholder="Email"
          autoComplete="username email"
          disabled={isLoggingIn}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />
      </Form.FullRow>

      <Form.FullRow label="Password" error={errors?.password?.message}>
        <Form.Input
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="current-password"
          disabled={isLoggingIn}
          {...register("password", {
            required: "Password is required",
          })}
        />
      </Form.FullRow>

      <StyledDevOnlyButtonContainer>
        <Button $size="large">
          {!isLoggingIn ? "Log In" : <MiniSpinner size="18px" />}
        </Button>

        <Button
          $size="large"
          $variation="secondary"
          type="button"
          onClick={() => {
            setValue("email", "tester@firecracker.website");
            setValue("password", "password");
          }}
        >
          Use Test Account
        </Button>
      </StyledDevOnlyButtonContainer>
    </Form>
  );
};

export default LoginForm;

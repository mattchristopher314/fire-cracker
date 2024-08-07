import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { useSignup } from "./useSignup";
import styled from "styled-components";
import MiniSpinner from "../../ui/MiniSpinner";
import { useSearchParams } from "react-router-dom";

type FormValues = {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
};

const SuccessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.2rem;
  font-weight: 400;
  font-size: 1.8rem;
  text-align: center;
`;

const SignupForm: React.FC = () => {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<FormValues>();
  const { errors } = formState;

  const { signup, isSigningUp } = useSignup();

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");

  const onSubmit = ({
    email,
    firstName,
    lastName,
    password,
  }: FormValues): void => {
    if (!email || !firstName! || !lastName || !password) return;

    signup(
      { email, firstName, lastName, password },
      {
        onSuccess: () => {
          setSearchParams(
            (prev) => new URLSearchParams({ ...prev, success: "success" })
          );
          reset();
        },
      }
    );
  };

  return success ? (
    <SuccessContainer>
      Thanks! Check your inbox to verify your email.
    </SuccessContainer>
  ) : (
    <Form onSubmit={handleSubmit(onSubmit)} type="basic">
      <Form.FullRow
        label="Name"
        labelsId="first-name"
        error={errors?.firstName?.message || errors?.lastName?.message}
      >
        <Form.MultiFieldContainer columns={2}>
          <Form.Input
            type="text"
            id="first-name"
            placeholder="First name"
            autoComplete="given-name"
            disabled={isSigningUp}
            {...register("firstName", {
              required: "First name is required",
            })}
          />
          <Form.Input
            type="text"
            id="last-name"
            placeholder="Last name"
            autoComplete="family-name"
            disabled={isSigningUp}
            {...register("lastName", {
              required: "Last name is required",
            })}
          />
        </Form.MultiFieldContainer>
      </Form.FullRow>

      <Form.FullRow label="Email Address" error={errors?.email?.message}>
        <Form.Input
          type="text"
          id="email"
          placeholder="Email"
          autoComplete="username email"
          disabled={isSigningUp}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />
      </Form.FullRow>

      <Form.FullRow
        label="Password"
        labelsId="password"
        error={errors?.password?.message || errors?.confirmPassword?.message}
      >
        <Form.MultiFieldContainer columns={2}>
          <Form.Input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="new-password"
            disabled={isSigningUp}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password needs at least 8 characters",
              },
            })}
          />
          <Form.Input
            type="password"
            id="confirm-password"
            placeholder="Confirm"
            autoComplete="new-password"
            disabled={isSigningUp}
            {...register("confirmPassword", {
              required: "You need to confirm your password",
              validate: (value) =>
                getValues().password === value || "Passwords do not match",
            })}
          />
        </Form.MultiFieldContainer>
      </Form.FullRow>

      <Form.SubmissionRow $devPad>
        <Button $size="large">
          {!isSigningUp ? "Sign up" : <MiniSpinner size="16px" />}
        </Button>
      </Form.SubmissionRow>
    </Form>
  );
};

export default SignupForm;

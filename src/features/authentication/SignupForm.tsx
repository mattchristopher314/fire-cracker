import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import toast from "react-hot-toast";

type FormValues = {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
};

const SignupForm: React.FC = () => {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<FormValues>();
  const { errors } = formState;

  const onSubmit = ({
    email,
    firstName,
    lastName,
    password,
  }: FormValues): void => {
    toast("Coming soon!");
    toast(`${email} ${firstName} ${lastName} ${password}`);
    reset();
  };

  return (
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
            {...register("firstName", {
              required: "First name is required",
            })}
          />
          <Form.Input
            type="text"
            id="last-name"
            placeholder="Last name"
            autoComplete="family-name"
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
          autoComplete="username email"
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
            {...register("confirmPassword", {
              required: "You need to confirm your password",
              validate: (value) =>
                getValues().password === value || "Passwords do not match",
            })}
          />
        </Form.MultiFieldContainer>
      </Form.FullRow>

      <Form.SubmissionRow $devPad>
        <Button $size="large">Sign up</Button>
      </Form.SubmissionRow>
    </Form>
  );
};

export default SignupForm;

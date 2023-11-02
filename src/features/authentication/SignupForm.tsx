import Button from "../../ui/Button";
import Form from "../../ui/Form";
import toast from "react-hot-toast";

const SignupForm: React.FC = () => {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();
    toast("Coming soon!");
  };

  return (
    <Form onSubmit={handleSubmit} type="basic">
      <Form.FullRow label="Email Address">
        <Form.Input type="email" id="email" autoComplete="username email" />
      </Form.FullRow>

      <Form.FullRow label="Password">
        <Form.MultiFieldContainer columns={2}>
          <Form.Input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <Form.Input
            type="password"
            id="confirm-password"
            placeholder="Confirm"
            autoComplete="new-password"
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

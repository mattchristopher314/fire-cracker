import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Heading from "../../ui/Heading";
import styled from "styled-components";
import { useUserData } from "../../context/useUserData";
import Button from "../../ui/Button";
import { useDeleteAccount } from "./useDeleteAccount";
import toast from "react-hot-toast";

const StyledDeleteAccountContainer = styled.section`
  font-size: 1.4rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  & p:first-of-type {
    font-weight: 500;

    & span {
      font-weight: 700;
    }
  }

  & p:nth-of-type(2) span {
    font-family: monospace;
    font-weight: 600;
    letter-spacing: 0.5px;
    background-color: var(--color-slate-200);
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
  }
`;

type FormValues = {
  confirmAddress: string;
};

const DeleteAccountForm: React.FC<{ onCloseModal: () => void }> = ({
  onCloseModal,
}) => {
  const { user } = useUserData();

  const { register, handleSubmit, formState, reset } = useForm<FormValues>();
  const { errors } = formState;

  const deleteAccountMutation = useDeleteAccount();

  if (!user)
    return (
      <StyledDeleteAccountContainer>
        <p>Could not find a user to delete!</p>
      </StyledDeleteAccountContainer>
    );

  const onSubmit = ({ confirmAddress }: FormValues): void => {
    const deleteAccount = deleteAccountMutation.mutateAsync(confirmAddress, {
      onSettled: () => {
        reset();
        onCloseModal?.();
      },
    });

    toast.promise(deleteAccount, {
      loading: "Deleting account",
      success: "Successfully deleted account",
      error: (e: Error) => `Something went wrong: ${e.message}`,
    });
  };

  return (
    <StyledDeleteAccountContainer>
      <Heading as="h2">Delete your account</Heading>

      <p>
        Are you sure? This action <span>cannot</span> be undone.
      </p>

      <p>
        Type your email address <span>{user.email}</span> to confirm account
        deletion.
      </p>

      <Form
        type="modal"
        onSubmit={(event) => {
          event.stopPropagation();
          handleSubmit(onSubmit)(event);
        }}
      >
        <Form.Row label="Email address" error={errors?.confirmAddress?.message}>
          <Input
            id="confirm-address"
            type="text"
            autoComplete="off"
            disabled={deleteAccountMutation.isLoading}
            {...register("confirmAddress", {
              required: "Enter your email to delete account",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
              validate: (value) =>
                value === user.email || "Email does not match",
            })}
          />
        </Form.Row>

        <Form.SubmissionRow>
          <Button $variation="danger">Delete account</Button>
        </Form.SubmissionRow>
      </Form>
    </StyledDeleteAccountContainer>
  );
};

export default DeleteAccountForm;

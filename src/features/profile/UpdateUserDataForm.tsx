import Button from "../../ui/Button";
import FileUpload from "../../ui/FileUpload";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useUpdateProfile } from "./useUpdateProfile";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useProfileData } from "../../context/useProfileData";
import { useUserData } from "../../context/useUserData";
import Modal from "../../ui/Modal";
import DeleteAccountForm from "../authentication/DeleteAccountForm";

type FormValues = {
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  avatar: FileList | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
};

const UpdateUserDataForm: React.FC = () => {
  const { isLoading, profile } = useProfileData();
  const { user } = useUserData();

  const updateProfileMutation = useUpdateProfile();

  const { register, handleSubmit, formState, getValues, reset } =
    useForm<FormValues>();
  const { errors } = formState;

  const onSubmit = ({
    firstName,
    lastName,
    avatar,
    password,
  }: FormValues): void => {
    const file = avatar?.[0];
    const updateProfile = updateProfileMutation.mutateAsync(
      { firstName, lastName, avatar: file, password },
      {
        onSettled: () => {
          reset();
          history.replaceState(window.history.state, "");
        },
      }
    );

    toast.promise(updateProfile, {
      loading: "Updating profile",
      success: "Successfully updated profile",
      error: (e: Error) => e.message,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Row label="Email address">
        <Input
          value={(user && user.email) || ""}
          disabled
          {...register("email")}
          autoComplete="email username"
        />
      </Form.Row>

      <Form.Row
        label="Name"
        labelsId="first-name"
        error={errors?.firstName?.message || errors?.lastName?.message}
      >
        <Form.MultiFieldContainer columns={2}>
          <Input
            type="text"
            id="first-name"
            disabled={isLoading || updateProfileMutation.isLoading}
            placeholder={
              isLoading ? "Loading..." : profile?.first_name || "First name"
            }
            {...register("firstName")}
          />
          <Input
            type="text"
            id="last-name"
            disabled={isLoading || updateProfileMutation.isLoading}
            placeholder={
              isLoading ? "Loading..." : profile?.last_name || "Last name"
            }
            {...register("lastName")}
          />
        </Form.MultiFieldContainer>
      </Form.Row>

      <Form.Row label="Avatar image" error={errors?.avatar?.message}>
        <FileUpload
          accept="image/jpeg, image/png"
          id="avatar"
          disabled={updateProfileMutation.isLoading}
          {...register("avatar")}
        />
      </Form.Row>

      <Form.Row
        label="Change password"
        labelsId="password"
        error={errors?.password?.message || errors?.confirmPassword?.message}
      >
        <Form.MultiFieldContainer columns={2}>
          <Input
            type="password"
            id="password"
            placeholder="New password"
            autoComplete="new-password"
            disabled={updateProfileMutation.isLoading}
            {...register("password", {
              minLength: {
                value: 8,
                message: "Password needs at least 8 characters",
              },
            })}
          />
          <Input
            type="password"
            id="confirm-password"
            placeholder="Confirm new password"
            autoComplete="new-password"
            disabled={updateProfileMutation.isLoading}
            {...register("confirmPassword", {
              validate: (value) =>
                getValues().password === value || "Passwords do not match",
            })}
          />
        </Form.MultiFieldContainer>
      </Form.Row>

      <Form.SubmissionRow>
        <Button
          type="reset"
          $size="large"
          $variation="secondary"
          onClick={() => reset()}
          disabled={updateProfileMutation.isLoading}
        >
          Reset
        </Button>

        <Modal>
          <Modal.Opener opens="delete-account">
            <Button type="button" $size="large" $variation="danger">
              Delete account
            </Button>
          </Modal.Opener>

          <Modal.Window windowName="delete-account">
            <DeleteAccountForm onCloseModal={() => {}} />
          </Modal.Window>
        </Modal>

        <Button $size="large" disabled={updateProfileMutation.isLoading}>
          Update account
        </Button>
      </Form.SubmissionRow>
    </Form>
  );
};

export default UpdateUserDataForm;

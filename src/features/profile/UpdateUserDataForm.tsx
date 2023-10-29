import { FormEvent, useState } from "react";
import Button from "../../ui/Button";
import FileUpload from "../../ui/FileUpload";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useUser } from "../authentication/useUser";
import { useProfile } from "./useProfile";
import { useUpdateProfile } from "./useUpdateProfile";

const UpdateUserDataForm: React.FC = () => {
  const { isLoading, profile } = useProfile();
  const { user } = useUser();

  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const [avatar, setAvatar] = useState<File>();

  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  const { updateProfile, isUpdating } = useUpdateProfile();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateProfile(
      { firstName, lastName, avatar },
      {
        onSuccess: () => {
          setAvatar(undefined);
        },
      }
    );
  };

  const handleReset = () => {
    setFirstName(undefined);
    setLastName(undefined);

    setAvatar(undefined);

    setPassword(undefined);
    setConfirmPassword(undefined);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row label="Email address">
        <Input value={(user && user.email) || ""} disabled />
      </Form.Row>

      <Form.Row label="Name" labelsId="first-name">
        <Form.MultiFieldContainer columns={2}>
          <Input
            type="text"
            id="first-name"
            value={
              isLoading
                ? "Loading..."
                : firstName ?? (profile?.first_name || "")
            }
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading || isUpdating}
          />
          <Input
            type="text"
            id="last-name"
            value={
              isLoading ? "Loading..." : lastName ?? (profile?.last_name || "")
            }
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading || isUpdating}
          />
        </Form.MultiFieldContainer>
      </Form.Row>

      <Form.Row label="Avatar image">
        <FileUpload
          accept="image/jpeg, image/png"
          id="avatar"
          onChange={(e) => setAvatar(e.target.files?.[0])}
          disabled={isUpdating}
        />
      </Form.Row>

      <Form.Row label="Change password" labelsId="password">
        <Form.MultiFieldContainer columns={2}>
          <Input
            type="password"
            id="password"
            placeholder="New password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isUpdating}
          />
          <Input
            type="password"
            id="confirm-password"
            placeholder="Confirm new password"
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isUpdating}
          />
        </Form.MultiFieldContainer>
      </Form.Row>

      <Form.SubmissionRow>
        <Button
          type="reset"
          $size="large"
          $variation="secondary"
          onClick={handleReset}
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button $size="large" disabled={isUpdating}>
          Update account
        </Button>
      </Form.SubmissionRow>
    </Form>
  );
};

export default UpdateUserDataForm;

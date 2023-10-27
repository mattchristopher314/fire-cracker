import Button from "../../ui/Button";
import FileUpload from "../../ui/FileUpload";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useUser } from "../authentication/useUser";
import { useProfile } from "./useProfile";

const UpdateUserDataForm: React.FC = () => {
  const { isLoading, profile } = useProfile();
  const { user } = useUser();

  return (
    <Form>
      <Form.Row label="Email address">
        <Input value={(user && user.email) || ""} disabled />
      </Form.Row>

      <Form.Row label="Name">
        <Form.MultiFieldContainer columns={2}>
          <Input
            type="text"
            disabled={isLoading}
            value={isLoading ? "Loading..." : profile?.first_name || ""}
          />
          <Input
            type="text"
            disabled={isLoading}
            value={isLoading ? "Loading..." : profile?.last_name || ""}
          />
        </Form.MultiFieldContainer>
      </Form.Row>

      <Form.Row label="Avatar image">
        <FileUpload accept="image/*" />
      </Form.Row>

      <Form.SubmissionRow>
        <Button type="reset" $size="large" $variation="secondary">
          Cancel
        </Button>
        <Button $size="large">Update account</Button>
      </Form.SubmissionRow>
    </Form>
  );
};

export default UpdateUserDataForm;

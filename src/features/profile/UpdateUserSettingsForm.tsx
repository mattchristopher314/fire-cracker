import { useProfileData } from "../../context/useProfileData";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { getProfileSettings } from "./getProfileSettings";

const UpdateUserSettingsForm: React.FC = () => {
  const { isLoading, profile } = useProfileData();

  const { income } = getProfileSettings(profile);

  return (
    <Form>
      <Form.Row label="Income per annum (£)">
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          title="Please enter a valid income (numbers only)"
          placeholder={isLoading ? "Loading..." : income?.toString() || ""}
        />
      </Form.Row>
    </Form>
  );
};

export default UpdateUserSettingsForm;

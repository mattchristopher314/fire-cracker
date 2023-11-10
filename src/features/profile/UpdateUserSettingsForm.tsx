import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useProfileSettings } from "./useProfileSettings";

const UpdateUserSettingsForm: React.FC = () => {
  const { isLoading, settings } = useProfileSettings(["income"]);

  return (
    <Form>
      <Form.Row label="Income per annum (£)">
        <Input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          title="Please enter a valid income (numbers only)"
          placeholder={isLoading ? "Loading..." : settings?.["income"] || ""}
        />
      </Form.Row>
    </Form>
  );
};

export default UpdateUserSettingsForm;

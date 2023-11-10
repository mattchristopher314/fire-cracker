import Form from "../../ui/Form";
import Input from "../../ui/Input";

const UpdateUserSettingsForm: React.FC<{
  isLoading: boolean;
  settings: { [key: string]: string | undefined } | undefined;
}> = ({ isLoading, settings }) => {
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

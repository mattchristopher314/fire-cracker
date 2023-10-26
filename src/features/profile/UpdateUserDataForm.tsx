import Button from "../../ui/Button";
import FileUpload from "../../ui/FileUpload";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

const UpdateUserDataForm: React.FC = () => {
  return (
    <Form>
      <Form.Row error="test" label="Email address">
        <Input value={"hi@matthewlukechristopher.TEMP"} disabled />
      </Form.Row>

      <Form.Row error="test" label="Name">
        <Form.MultiFieldContainer columns={2}>
          <Input type="text" value={"Matthew"} />
          <Input type="text" value={"Christopher"} />
        </Form.MultiFieldContainer>
      </Form.Row>

      <Form.Row label="Avatar image">
        <FileUpload accept="image/*" />
      </Form.Row>

      <Form.SubmissionRow>
        <Button type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
      </Form.SubmissionRow>
    </Form>
  );
};

export default UpdateUserDataForm;

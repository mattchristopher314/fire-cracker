import UpdateUserSettingsForm from "../features/profile/UpdateUserSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const Settings: React.FC = () => {
  return (
    <>
      <Heading as="h1">Settings</Heading>

      <Row>
        <Heading as="h3">Info</Heading>
        <p>Tax band etc here.</p>
      </Row>

      <Row>
        <Heading as="h3">Update Settings</Heading>
        <UpdateUserSettingsForm />
      </Row>
    </>
  );
};

export default Settings;

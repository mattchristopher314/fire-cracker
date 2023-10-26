import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/profile/UpdateUserDataForm";
import UserStatsForm from "../features/profile/UserStatsForm";

const Account: React.FC = () => {
  return (
    <>
      <Heading as="h1">Your Account</Heading>

      <Row>
        <Heading as="h3">Update User Data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">User Stats</Heading>
        <UserStatsForm />
      </Row>
    </>
  );
};

export default Account;

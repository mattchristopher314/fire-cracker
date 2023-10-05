import styled from "styled-components";
import { useUser } from "./useUser";
import { breaks } from "../../styles/GlobalStyles";

const StyledUser = styled.div`
  margin-left: auto;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  @media ${breaks.AppMinNavPoint} {
    margin-left: initial;
  }

  @media ${breaks.AppCompactPoint} {
    & span {
      display: none;
    }
  }
`;

const UserAvatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  transition: outline 0.3s ease-in-out;
`;

const User: React.FC = () => {
  const { user } = useUser();
  const metadata = !user ? {} : user.user_metadata;

  const avatar = metadata.avatar || "/default-user.jpg";
  const name = metadata.fullName || "Unknown";

  return (
    <StyledUser>
      <UserAvatar src={avatar} alt={`Avatar of ${name}`} />
      <span>{name}</span>
    </StyledUser>
  );
};

export default User;

import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
  margin-left: auto;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
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
  console.log(metadata);

  const avatar = metadata.avatar || "/default-user.jpg";
  const name = metadata.fullName || "Unknown";

  return (
    <StyledUserAvatar>
      <Avatar src={avatar} alt={`Avatar of ${name}`} />
      <span>{name}</span>
    </StyledUserAvatar>
  );
};

export default User;

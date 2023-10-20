import styled from "styled-components";
import { breaks } from "../../styles/GlobalStyles";
import MiniSpinner from "../../ui/MiniSpinner";
import { useProfileData } from "../../context/useProfileData";
import { NavLink } from "react-router-dom";

const StyledUser = styled(NavLink)`
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

const StyledLoaderContainer = styled.div`
  color: var(--color-brand-lo);
`;

const User: React.FC = () => {
  const {
    isLoading,
    profile: { first_name, last_name, avatar },
  } = useProfileData();

  const fullName = `${first_name}${last_name && ` ${last_name}`}`;

  return (
    <StyledUser to="/account">
      {isLoading ? (
        <StyledLoaderContainer>
          <MiniSpinner />
        </StyledLoaderContainer>
      ) : (
        <>
          <UserAvatar
            src={avatar || "/default-user.jpg"}
            alt={`${fullName}'s avatar`}
          />
          <span>{fullName}</span>
        </>
      )}
    </StyledUser>
  );
};

export default User;

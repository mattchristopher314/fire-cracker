import styled from "styled-components";
import { breaks } from "../../styles/GlobalStyles";
import MiniSpinner from "../../ui/MiniSpinner";
import { useProfileData } from "../../context/useProfileData";
import { NavLink } from "react-router-dom";

const UserAvatar = styled.img`
  display: block;
  width: 2.6rem;
  height: 2.6rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
  transition: outline 0.3s ease-in-out;
  z-index: 2;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledUser = styled(NavLink)`
  margin-left: auto;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  &::before,
  &::after {
    content: "";
    background: var(--color-brand-lo);
    position: absolute;
    border-radius: 50%;

    transition: transform 0.4s cubic-bezier(0.6, -0.7, 0.4, 1.7);
    display: none;
  }

  &::before {
    width: 3rem;
    height: 3rem;
    z-index: 1;
    opacity: 0.65;
    transform: translateX(-0.2rem) scale(0.78);
  }

  &::after {
    width: 3.3rem;
    height: 3.3rem;
    z-index: 0;
    opacity: 0.35;
    transform: translateX(-0.35rem) scale(0.78);
  }

  & ${UserAvatar} {
    transition: box-shadow 0.3s ease-in-out;
  }

  &.active ${UserAvatar}, &:hover ${UserAvatar} {
    box-shadow: none;
  }

  &.active::before,
  &:hover::before {
    display: block;
    transform: translateX(-0.2rem);
  }

  &.active::after,
  &:hover::after {
    display: block;
    transform: translateX(-0.35rem);
  }

  @keyframes pulseInner {
    from {
      transform: translateX(-0.2rem) scale(0);
    }

    to {
      transform: translateX(-0.2rem);
    }
  }

  @keyframes pulseOuter {
    from {
      transform: translateX(-0.35rem) scale(0);
    }

    to {
      transform: translateX(-0.35rem);
    }
  }

  @media ${breaks.AppMinNavPoint} {
    margin-left: initial;
  }

  @media ${breaks.AppCompactPoint} {
    & span {
      display: none;
    }
  }
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

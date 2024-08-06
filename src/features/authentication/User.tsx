import styled from "styled-components";

import MiniSpinner from "../../ui/MiniSpinner";
import { useProfileData } from "../../context/useProfileData";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { supabaseUrl } from "../../services/supabase";
import { breaks } from "../../utils/constants";

const UserAvatar = styled.img`
  .unloaded & {
    visibility: hidden;
    box-shadow: none;
  }

  display: block;
  width: 2.6rem;
  height: 2.6rem;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  z-index: 1;
  box-shadow: var(--shadow-avatar);
  transition: none !important;

  &.should-transition-bg {
    transition: box-shadow 0.2s ease-in-out !important;
  }
`;

const StyledUser = styled(NavLink)`
  margin-left: auto;
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-slate-600);

  &.active ${UserAvatar}, &:hover ${UserAvatar} {
    box-shadow: none;
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
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 1.2rem;

  color: var(--color-brand-lo);
`;

const StyledLoadedUserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  position: relative;

  &.unloaded::before,
  &.unloaded::after {
    visibility: hidden;
  }

  &::before,
  &::after {
    content: "";
    background: var(--color-brand-lo);
    position: absolute;
    top: 50%;
    border-radius: 50%;

    transition: transform 0.4s cubic-bezier(0.6, -0.7, 0.4, 1.7);
  }

  &::before {
    width: 3rem;
    height: 3rem;
    z-index: 1;
    opacity: 0.65;
    transform: translate(-0.2rem, -50%) scale(0.75);
  }

  &::after {
    width: 3.3rem;
    height: 3.3rem;
    z-index: 0;
    opacity: 0.35;
    transform: translate(-0.35rem, -50%) scale(0.75);
  }

  .active &::before,
  &:hover::before {
    transform: translate(-0.2rem, -50%);
  }

  .active &::after,
  &:hover::after {
    transform: translate(-0.35rem, -50%);
  }
`;

const StyledNameContainer = styled.span`
  vertical-align: middle;
  line-height: 1.6rem;
`;

const User: React.FC = () => {
  const {
    isLoading,
    profile: { first_name, last_name, avatar },
  } = useProfileData();

  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(true);
  const [shouldTransitionBg, setShouldTransitionBg] = useState<boolean>(false);
  const fullName = `${first_name || ""}${last_name ? ` ${last_name}` : ""}`;

  return (
    <StyledUser to="/account">
      {isLoading ? (
        <StyledLoaderContainer>
          <MiniSpinner />
        </StyledLoaderContainer>
      ) : (
        <StyledLoadedUserContainer
          className={isLoadingAvatar ? "unloaded" : ""}
        >
          <UserAvatar
            src={
              avatar
                ? `${supabaseUrl}/storage/v1/object/public/avatars${avatar}`
                : "/default-user.jpg"
            }
            className={shouldTransitionBg ? "should-transition-bg" : ""}
            alt={`${fullName}'s avatar`}
            onLoad={() => {
              setIsLoadingAvatar(false);

              setTimeout(() => setShouldTransitionBg(true), 200);
            }}
          />
          <StyledNameContainer>{fullName}</StyledNameContainer>
        </StyledLoadedUserContainer>
      )}
    </StyledUser>
  );
};

export default User;

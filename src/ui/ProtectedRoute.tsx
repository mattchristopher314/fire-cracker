import { styled } from "styled-components";
import { To, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Spinner from "./Spinner";
import { useUserData } from "../context/useUserData";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute: React.FC<{
  redirectUrl?: To;
  noAuth?: boolean;
  children: React.ReactNode;
}> = ({ redirectUrl = "/", noAuth = false, children }) => {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUserData();

  useEffect(
    function () {
      if (noAuth !== !isAuthenticated && !isLoading) {
        navigate(redirectUrl || "/", { replace: true });

        return;
      }
    },
    [isAuthenticated, isLoading, navigate, redirectUrl, noAuth]
  );

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (noAuth !== isAuthenticated) return children;

  return;
};

export default ProtectedRoute;

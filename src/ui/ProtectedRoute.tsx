import { styled } from "styled-components";
import { To, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

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
}> = ({ redirectUrl, noAuth, children }) => {
  const navigate = useNavigate();

  const { isLoading, isAuthenticated } = useUser();

  useEffect(
    function () {
      if (noAuth !== !isAuthenticated && !isLoading) {
        navigate(
          redirectUrl || ProtectedRoute.defaultProps?.redirectUrl || "/",
          { replace: true }
        );

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

ProtectedRoute.defaultProps = {
  noAuth: false,
  redirectUrl: "/",
};

export default ProtectedRoute;

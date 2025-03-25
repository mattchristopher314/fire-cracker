import { useNavigate } from "react-router";

export const useMoveBack = (): (() => void) => {
  const navigate = useNavigate();
  return () => navigate(-1);
};

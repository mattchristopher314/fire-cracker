import styled from "styled-components";

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

import { useMoveBack } from "../hooks/useMoveBack";

import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { useEffect } from "react";

const StyledPageNotFound = styled.main`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-slate-50);
  border: 1px solid var(--color-error-super-soft);
  border-radius: var(--border-radius-lg);

  padding: 4.8rem;
  flex: 0 1 128rem;
  text-align: center;

  @media (max-width: 41em) {
    padding: 1.6rem;
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;

  margin-bottom: 3.2rem;

  & svg {
    flex-shrink: 0;
    width: 3.9rem;
    height: 3.9rem;
  }

  @media (max-width: 41em) {
    flex-direction: column;
  }
`;

const PageNotFound: React.FC<{ titleError: string }> = ({ titleError }) => {
  const moveBack = useMoveBack();

  useEffect(() => {
    document.title = titleError;
  }, [titleError]);

  return (
    <StyledPageNotFound>
      <Box>
        <ErrorContainer>
          <ExclamationCircleIcon color="var(--color-error-harsh)" />

          <Heading as="h1" color="var(--color-slate-800)">
            Something went wrong
          </Heading>
        </ErrorContainer>

        <Heading
          as="h2"
          color="var(--color-slate-800)"
          style={{ marginBottom: "2.4rem" }}
        >
          The page you are looking for could not be found
        </Heading>

        <Button $variation="primary" onClick={moveBack}>
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  );
};

export default PageNotFound;

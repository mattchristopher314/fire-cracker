import styled from "styled-components";
import Heading from "./Heading";

const StyledMajorStatContainer = styled.div`
  width: 100%;
  background-color: var(--color-slate-0);
  border: 1px solid var(--color-slate-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  box-shadow: var(--shadow-sm);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const MajorStatContainer: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <StyledMajorStatContainer>
      <Heading as="h3">{title}</Heading>
      {children}
    </StyledMajorStatContainer>
  );
};

export default MajorStatContainer;

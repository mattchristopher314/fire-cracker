import { MdOutlineConstruction } from "react-icons/md";
import styled from "styled-components";
import Heading from "./Heading";

const StyledComingSoon = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.4rem;
  padding: 3.2rem 0;

  & svg {
    color: var(--color-slate-400);
    width: 4.8rem;
    height: 4.8rem;

    transition: color 0.4s ease-in-out, transform 0.4s ease-in-out;
  }

  &:hover svg {
    color: var(--color-slate-400-hover);
    transform: scale(1.05);
  }
`;

const ComingSoon: React.FC = () => {
  return (
    <StyledComingSoon>
      <MdOutlineConstruction />

      <Heading as="h2" color="var(--color-slate-600)">
        Coming soon!
      </Heading>
    </StyledComingSoon>
  );
};

export default ComingSoon;

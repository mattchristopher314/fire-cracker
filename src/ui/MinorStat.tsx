import styled from "styled-components";

const StyledStat = styled.div`
  width: 100%;
  background-color: var(--color-slate-0);
  border: 1px solid var(--color-slate-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;

  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: repeat(2, auto);
  gap: 0.8rem 1.6rem;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: var(--color-${(props) => props.color}-100);

  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  color: var(--color-slate-500);
`;

export const Payload = styled.span`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;

const MinorStat: React.FC<{
  icon: React.ReactElement;
  title: string;
  color: string;
  children: React.ReactNode;
}> = ({ icon, title, color, children }) => {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Payload>{children}</Payload>
    </StyledStat>
  );
};

export default MinorStat;

import styled from "styled-components";

const StyledFormFullRow = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.label`
  font-size: 1.4rem;
  color: var(--color-error-harsh);
`;

const FormFullRow: React.FC<{
  label?: string;
  error?: string;
  children: React.ReactNode;
}> = ({ label, error, children }) => {
  return (
    <StyledFormFullRow>
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormFullRow>
  );
};

export default FormFullRow;

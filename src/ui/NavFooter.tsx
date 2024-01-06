import styled from "styled-components";

const StyledFooter = styled.footer`
  border-top: 1px solid var(--color-slate-200);
  font-size: 1.2rem;
  padding-top: 2rem;
  color: var(--color-slate-600);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.8rem;
  margin-top: auto;

  & p {
    line-height: 1.2;
  }
`;

const NavFooter: React.FC = () => {
  return (
    <StyledFooter>
      <p>
        Information provided is believed to be correct but is not and must not
        be considered financial advice. FIRECracker is not regulated by the
        Financial Conduct Authority (FCA), nor are its authors qualified
        financial advisors.
      </p>

      <p>
        Copyright &copy; Matthew Christopher {new Date().getFullYear()}. All
        rights reserved.
      </p>
    </StyledFooter>
  );
};

export default NavFooter;

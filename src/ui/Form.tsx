import styled, { css } from "styled-components";

const Form = styled.form<{ type?: string }>`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4.8rem;

      background-color: var(--color-slate-0);
      border: 1px solid var(--color-slate-100);
      border-radius: var(--border-radius-md);
    `}

  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;

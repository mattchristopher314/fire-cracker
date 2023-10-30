import { styled } from "styled-components";

const InlineInput = styled.input`
  padding: 0 !important;
  border: none;
  border-bottom: 1px solid var(--color-slate-400);
  padding: 0.8rem 1.2rem;

  &:focus-visible {
    outline: none;
    border-bottom: 1px solid var(--color-brand-lo);
  }

  &::before {
    content: "£";
  }
`;

export default InlineInput;

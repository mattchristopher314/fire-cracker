import { styled } from "styled-components";

const InlineInput = styled.input`
  padding: 0 !important;
  outline: none !important;
  max-width: 100%;
  border-radius: 0;
  border: none;
  position: relative;
  background-color: inherit;

  border-bottom: 1px solid var(--color-slate-400);
  padding: 0.8rem 1.2rem;

  &:focus-visible {
    border-bottom: 1px solid var(--color-brand-lo);
  }

  &::before {
    content: "£";
  }
`;

export default InlineInput;

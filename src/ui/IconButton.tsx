import styled from "styled-components";

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: var(--color-slate-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-brand-lo);
  }
`;

export default IconButton;

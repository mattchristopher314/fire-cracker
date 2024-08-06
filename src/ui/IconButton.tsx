import styled, { css } from "styled-components";

const IconButton = styled.button<{ size?: string; $background?: string }>`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: background-color 0.3s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${(props) => css`
      background-color: var(${props.$background});
    `};
  }

  & svg {
    ${(props) => css`
      width: ${props.size};
      height: ${props.size};
    `}
    color: var(--color-brand-lo);
  }
`;

IconButton.defaultProps = {
  size: "2.4rem",
  $background: "--color-slate-100",
};

export default IconButton;

import { css, styled } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.4rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: var(--color-cyan-50);
    background-color: var(--color-brand-lo);

    .dark-mode & {
      color: var(--color-cyan-950);
    }

    &:hover {
      background-color: var(--color-brand-lo-hover);
    }
  `,
  secondary: css`
    color: var(--color-slate-600);
    background: var(--color-slate-0);
    border: 1px solid var(--color-slate-200);

    &:hover {
      background-color: var(--color-slate-50);
    }
  `,
  danger: css`
    color: var(--color-slate-50);
    background-color: var(--color-error-harsh);

    &:hover {
      background-color: var(--color-error-harsh-hover);
    }
  `,
};

const Button = styled.button<{
  $size?: keyof typeof sizes;
  $variation?: keyof typeof variations;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  transition: background-color 0.2s ease-in-out;
  ${(props) => sizes[props.$size as keyof typeof sizes] + ";"}
  ${(props) => variations[props.$variation as keyof typeof variations] + ";"};

  &:disabled {
    cursor: not-allowed;
  }
`;

Button.defaultProps = {
  $variation: "primary",
  $size: "medium",
};

export default Button;

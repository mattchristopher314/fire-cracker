import React from "react";
import styled, { css } from "styled-components";

const Row = styled.section<{
  type?: string;
  $background?: boolean;
  children: React.ReactNode;
}>`
  display: flex;

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.$background &&
    css`
      padding: 2.4rem 3.2rem;

      /* Box */
      background-color: var(--color-slate-0);
      border: 1px solid var(--color-slate-100);
      border-radius: var(--border-radius-md);
    `}
`;

Row.defaultProps = { type: "vertical", $background: false };

export default Row;

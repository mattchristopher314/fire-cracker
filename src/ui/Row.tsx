import React from "react";
import styled, { css } from "styled-components";

const Row = styled.div<{ type?: string; children: React.ReactNode }>`
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
`;

Row.defaultProps = { type: "vertical" };

export default Row;

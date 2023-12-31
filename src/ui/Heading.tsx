import styled, { css } from "styled-components";

const Heading = styled.h1`
  color: ${(props) => props.color};
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3.1rem;
      font-weight: 700;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.8rem;
      font-weight: 500;
    `}

  line-height: 1.2;
`;

Heading.defaultProps = {
  color: "inherit",
  as: "h1",
};

export default Heading;

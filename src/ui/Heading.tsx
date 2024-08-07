import styled, { css } from "styled-components";
import { breaks } from "../utils/constants";

const Heading = styled.h1<{ $shouldHideOnLargeScreens: boolean }>`
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

  ${(props) =>
    props.$shouldHideOnLargeScreens &&
    css`
      display: none;

      @media ${breaks.AppMinNavPoint} {
        display: block;
      }
    `}
`;

Heading.defaultProps = {
  color: "inherit",
  as: "h1",
  $shouldHideOnLargeScreens: false,
};

export default Heading;

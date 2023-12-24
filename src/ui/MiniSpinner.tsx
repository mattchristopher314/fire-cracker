import styled, { css, keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const MiniSpinner = styled(BiLoaderAlt)<{ size: string }>`
  ${(props) =>
    css`
      width: ${props.size};
      height: ${props.size};
    `}

  color: inherit;
  animation: ${rotate} 1.5s infinite linear;
`;

MiniSpinner.defaultProps = {
  size: "24px",
};

export default MiniSpinner;

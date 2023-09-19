import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const Spinner = styled.div`
  margin: 4.8rem auto;
  width: 6.4rem;
  aspect-ratio: 1;
  background: red;
  border-radius: 50%;
  background: -o-radial-gradient(
        farthest-side,
        var(--color-brand-lo) 94%,
        #0000
      )
      top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-lo));
  background: radial-gradient(farthest-side, var(--color-brand-lo) 94%, #0000)
      top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--color-brand-lo));
  mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  -webkit-animation: spin 0.7s infinite linear;
  animation: ${spin} 0.7s infinite linear;
`;

export default Spinner;

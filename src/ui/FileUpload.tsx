import styled from "styled-components";

const FileUpload = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;

    padding: 0.8rem 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;

    color: var(--color-slate-50);
    background-color: var(--color-brand-lo);
    cursor: pointer;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;

    &:hover {
      background-color: var(--color-brand-lo-hover);
    }
  }
`;

export default FileUpload;

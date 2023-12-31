import React from "react";
import styled, { css } from "styled-components";

import StandardInput from "./Input";
import Button from "./Button";
import FileUpload from "./FileUpload";
import { breaks } from "../utils/constants";

type FormParent<T> = T & {
  Row: React.FC<{
    type?: string;
    label: string;
    labelsId?: string;
    error?: string;
    children: React.ReactElement;
  }>;
  FullRow: React.FC<{
    label?: string;
    labelsId?: string;
    error?: string;
    children: React.ReactElement;
  }>;
  Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
  MultiFieldContainer: React.FC<{
    columns: number;
    children: React.ReactNode;
  }>;
  SubmissionRow: React.FC<{ $devPad?: boolean; children: React.ReactNode }>;
};

const StyledForm = styled.form<{ type?: string }>`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 3.2rem;

      /* Box */
      background-color: var(--color-slate-0);
      border: 1px solid var(--color-slate-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      max-width: 80rem;

      ${StyledRow} {
        border-bottom: none !important;
      }
    `}
    
  font-size: 1.4rem;
`;

const Form: FormParent<
  React.FC<
    React.FormHTMLAttributes<HTMLFormElement> & {
      type?: string;
      children: React.ReactNode;
    }
  >
> = ({ type, children, ...intrinsic }) => {
  return (
    <StyledForm type={type} {...intrinsic}>
      {children}
    </StyledForm>
  );
};

Form.defaultProps = {
  type: "regular",
};

const StyledRow = styled.div<{
  type?: string;
  $disallowStack?: boolean;
  $devPad?: boolean;
}>`
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:last-child {
    padding-top: 2.4rem;
  }

  ${(props) =>
    props.type === "regular" &&
    css`
      display: grid;
      align-items: center;
      grid-template-columns: minmax(auto, 15rem) 7.2fr 2.8fr;

      & ${StandardInput}, & ${FileUpload} {
        width: 100%;
      }

      &:first-child {
        padding-top: 0;
      }

      &:last-child {
        padding-bottom: 0;
      }

      &:not(:last-child) {
        border-bottom: 1px solid var(--color-slate-100);
      }

      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
    `}

  ${(props) =>
    props.type === "stacked" &&
    css`
      display: flex;
      flex-direction: column;
    `}

  ${(props) =>
    !props.$disallowStack &&
    css`
      @media ${breaks.AppWideStackPoint} {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding-right: 28%;
      }

      @media ${breaks.AppFullWidthNavPoint} {
        padding-right: 0;
        width: 100%;
      }
    `}

  ${(props) =>
    props.$disallowStack &&
    css`
      flex-wrap: wrap;

      & ${Button} {
        flex-shrink: 0;
      }

      @media ${breaks.AppMinNavPoint} {
        & ${Button} {
          flex: 1 1 auto;
        }
      }
    `}

    ${(props) =>
    props.$devPad &&
    css`
      margin: 1px;

      @media ${breaks.AppMinNavPoint} {
        margin: initial;
      }
    `}
`;

StyledRow.defaultProps = {
  $disallowStack: false,
};

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-error-harsh);
`;

const Row: React.FC<{
  type?: string;
  label: string;
  labelsId?: string;
  error?: string;
  children: React.ReactElement;
}> = ({ type, label, labelsId, error, children }) => {
  return (
    <StyledRow type={type}>
      {label && <Label htmlFor={labelsId || children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledRow>
  );
};

Row.defaultProps = {
  type: "regular",
};

const StyledFullRow = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const FullRow: React.FC<{
  label?: string;
  labelsId?: string;
  error?: string;
  children: React.ReactElement;
}> = ({ label, labelsId, error, children }) => {
  return (
    <StyledFullRow>
      {label && <Label htmlFor={labelsId || children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFullRow>
  );
};

const StyledMultiField = styled.div<{ $columns: number }>`
  display: grid;
  width: 100%;
  column-gap: 1.2rem;

  ${(props) =>
    props.$columns &&
    css`
      grid-template-columns: repeat(${props.$columns}, minmax(0, auto));
    `}

  @media ${breaks.AppFullWidthNavPoint} {
    width: 100%;
    grid-template-columns: 1fr;
    row-gap: 1.2rem;
  }
`;

const Input = styled.input`
  border: 1px solid var(--color-slate-300);
  background-color: var(--color-slate-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 1.2rem 1.6rem;
`;

const MultiFieldContainer: React.FC<{
  columns: number;
  children: React.ReactNode;
}> = ({ columns, children }) => {
  return <StyledMultiField $columns={columns}>{children}</StyledMultiField>;
};

MultiFieldContainer.defaultProps = {
  columns: 1,
};

const SubmissionRow: React.FC<{
  $devPad?: boolean;
  children: React.ReactNode;
}> = ({ $devPad, children }) => {
  return (
    <StyledRow type="regular" $disallowStack $devPad={$devPad}>
      {children}
    </StyledRow>
  );
};

SubmissionRow.defaultProps = {
  $devPad: false,
};

Form.Row = Row;
Form.FullRow = FullRow;
Form.Input = Input;
Form.MultiFieldContainer = MultiFieldContainer;
Form.SubmissionRow = SubmissionRow;

export default Form;

import React from "react";
import styled, { css } from "styled-components";

type FormParent<T> = T & {
  Row: React.FC<{
    type?: string;
    label: string;
    error?: string;
    children: React.ReactElement;
  }>;
  MultiFieldContainer: React.FC<{
    columns: number;
    children: React.ReactNode;
  }>;
  SubmissionRow: React.FC<{ children: React.ReactNode }>;
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
      width: 80rem;
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

const StyledRow = styled.div<{ type?: string }>`
  gap: 2.4rem;
  padding: 1.2rem 0;

  ${(props) =>
    props.type === "regular" &&
    css`
      display: grid;
      align-items: center;
      grid-template-columns: 15rem minmax(auto, 1fr) 1fr;

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
`;

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
  error?: string;
  children: React.ReactElement;
}> = ({ type, label, error, children }) => {
  return (
    <StyledRow type={type}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledRow>
  );
};

Row.defaultProps = {
  type: "regular",
};

const StyledMultiField = styled.div<{ columns: number }>`
  display: grid;
  column-gap: 1.2rem;

  ${(props) =>
    props.columns &&
    css`
      grid-template-columns: repeat(${props.columns}, minmax(0, auto));
    `}
`;

const MultiFieldContainer: React.FC<{
  columns: number;
  children: React.ReactNode;
}> = ({ columns, children }) => {
  return <StyledMultiField columns={columns}>{children}</StyledMultiField>;
};

MultiFieldContainer.defaultProps = {
  columns: 1,
};

const SubmissionRow: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <StyledRow type="regular">{children}</StyledRow>;
};

Form.Row = Row;
Form.MultiFieldContainer = MultiFieldContainer;
Form.SubmissionRow = SubmissionRow;

export default Form;

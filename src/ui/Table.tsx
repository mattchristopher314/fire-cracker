import React, { createContext, useContext } from "react";
import styled from "styled-components";

type BodyProps<T> = { data: T[]; render: (datum: T) => React.ReactNode };

type Table<T> = T & {
  Header: React.FC<{ children: React.ReactNode }>;
  Body: <T>({ data, render }: BodyProps<T>) => React.ReactElement;
  Row: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children?: React.ReactNode }>;
  Attribution: React.FC<{ url: string; source_updated: string }>;
};

const StyledTable = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  margin-top: 3.2rem;
  font-size: 1.4rem;
`;

const CommonRow = styled.div<{ $columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  border: 1px solid var(--color-slate-200);
  border-bottom: 1px solid var(--color-slate-100);
  background-color: var(--color-slate-50);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  color: var(--color-slate-600);
  border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
`;

const StyledBody = styled.section`
  border: 1px solid var(--color-slate-200);
  border-top: none;

  background-color: var(--color-slate-0);
  border-radius: 0 0 var(--border-radius-md) var(--border-radius-md);
  overflow: hidden;
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;
  position: relative;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-slate-100);
  }

  &:hover::after {
    content: "";
    background-color: var(--color-slate-900);
    opacity: 0.01;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Empty = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  color: var(--color-slate-600);
`;

const Table: Table<
  React.FC<{ $columns: string; children: React.ReactNode }>
> = ({ $columns, children }) => {
  return (
    <TableContext.Provider value={{ $columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { $columns } = useContext(TableContext);

  return (
    <StyledHeader role="row" $columns={$columns} as="header">
      {children}
    </StyledHeader>
  );
};

const Body = <T,>({ data, render }: BodyProps<T>): React.ReactElement => {
  if (!data || !data.length)
    return <Empty>No data to show at the moment</Empty>;

  return <StyledBody>{data.map(render)}</StyledBody>;
};

const Row: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { $columns } = useContext(TableContext);

  return (
    <StyledRow role="row" $columns={$columns}>
      {children}
    </StyledRow>
  );
};

const Footer = styled.footer`
  background-color: var(--color-slate-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  &:empty {
    display: none;
  }
`;

const StyledAttribution = styled.aside`
  display: flex;
  justify-content: flex-end;
  font-style: italic;
  padding: 0.8rem;
  font-size: 1.2rem;
  color: var(--color-slate-400);
`;

const StyledSourceDecorator = styled.span`
  white-space: pre;
`;

const StyledSourceLink = styled.a`
  transition: color 0.1s ease-in-out;

  &:link,
  &:visited {
    text-decoration: underline;
  }

  &:hover,
  &:active {
    color: var(--color-slate-500);
  }
`;

const Attribution: React.FC<{ url: string; source_updated: string }> = ({
  url,
  source_updated,
}) => {
  return (
    <StyledAttribution>
      <StyledSourceDecorator>Source: </StyledSourceDecorator>
      <StyledSourceLink href={url}>{new URL(url).hostname}</StyledSourceLink>
      <StyledSourceDecorator>
        {" "}
        (last updated {source_updated})
      </StyledSourceDecorator>
    </StyledAttribution>
  );
};

Table.defaultProps = {
  $columns: "1fr",
};

const TableContext = createContext<{ $columns: string }>({
  $columns: Table?.defaultProps["$columns"] || "",
});

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
Table.Attribution = Attribution;

export default Table;

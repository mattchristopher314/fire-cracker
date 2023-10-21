import React, { createContext, useContext } from "react";
import styled from "styled-components";

type BodyProps<T> = { data: T[]; render: (datum: T) => React.ReactNode };

interface Table
  extends React.FC<{ $columns: string; children: React.ReactNode }> {
  Header: React.FC<{ children: React.ReactNode }>;
  Body: <T>({ data, render }: BodyProps<T>) => React.ReactElement;
  Row: React.FC<{ children: React.ReactNode }>;
}

const StyledTable = styled.div`
  border: 1px solid var(--color-slate-200);

  font-size: 1.4rem;
  background-color: var(--color-slate-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div<{ $columns: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns};
  column-gap: 2.4rem;
  align-items: center;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-slate-50);
  border-bottom: 1px solid var(--color-slate-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-slate-600);
`;

const StyledBody = styled.section``;

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
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const Table: Table = ({ $columns, children }) => {
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

Table.defaultProps = {
  $columns: "1fr",
};

const TableContext = createContext<{ $columns: string }>({
  $columns: Table?.defaultProps["$columns"] || "",
});

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;

export default Table;

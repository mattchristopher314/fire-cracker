import styled from "styled-components";
import { PBJSONData } from "../../services/supabase";
import Table from "../../ui/Table";

const Cabin = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-slate-600);
`;

const PremiumBondsAllocationTableRow: React.FC<{
  allocation: PBJSONData["prizeAllocations"][number];
}> = ({ allocation }) => {
  return (
    <Table.Row>
      <Cabin>{allocation.value}</Cabin>
      <Cabin>{allocation.number}</Cabin>
    </Table.Row>
  );
};

export default PremiumBondsAllocationTableRow;

import { PBJSONData } from "../../services/supabase";
import Table from "../../ui/Table";
import PremiumBondsAllocationTableRow from "./PremiumBondsAllocationTableRow";

const PremiumBondsAllocationTable: React.FC<{
  data: PBJSONData["prizeAllocations"];
  source: string;
  source_updated: string;
}> = ({ data, source, source_updated }) => {
  return (
    <Table $columns="repeat(2, 1fr)">
      <Table.Header>
        <div>Prize Amount</div>
        <div>Number of Prizes</div>
      </Table.Header>

      <Table.Body<(typeof data)[number]>
        data={data}
        render={(allocation) => (
          <PremiumBondsAllocationTableRow
            key={allocation.value}
            allocation={allocation}
          />
        )}
      />

      <Table.Footer></Table.Footer>

      {!!source && (
        <Table.Attribution
          url={source}
          source_updated={source_updated}
        ></Table.Attribution>
      )}
    </Table>
  );
};

export default PremiumBondsAllocationTable;

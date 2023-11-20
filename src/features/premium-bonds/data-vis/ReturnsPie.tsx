import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import styled from "styled-components";
import { PBJSONData } from "../../../services/supabase";
import {
  EstimateReturns,
  EstimatedReturn,
} from "../calculatePremiumBondsStats";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const StyledPieContainer = styled.div`
  width: 100%;
  height: 300px;
`;

const StyledPieTooltip = styled.div`
  background-color: var(--color-slate-0);
  border: 1px solid var(--color-slate-100);
  box-shadow: var(--shadow-sm);
  padding: 1.2rem;
  border-radius: var(--border-radius-sm);

  & p {
    font-size: 1.2rem;
  }
`;

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <StyledPieTooltip>
        <p>{`${payload[0].name === "Other" ? "" : "£"}${
          payload[0].name
        }: ${Number(payload[0].value).toPrecision(3)}`}</p>
        <p>
          You'll win this prize about once every{" "}
          {Math.round(1 / Number(payload[0].value))} months.
        </p>
      </StyledPieTooltip>
    );
  }

  return null;
};

const ReturnsPie: React.FC<{ data: PBJSONData }> = ({ data }) => {
  const MINANGLE_OTHER_DEGREES = 4;

  const predictedReturns: Array<EstimatedReturn> = EstimateReturns(data, [
    "blue",
    "green",
    "yellow",
    "cyan",
    "lime",
  ]);

  const totalFrequency = predictedReturns.reduce(
    (cur, obj) => cur + obj.probability,
    0
  );
  const otherThreshold = (totalFrequency * MINANGLE_OTHER_DEGREES) / 360;

  const filteredReturns = [
    ...predictedReturns.filter((ret) => ret.probability >= otherThreshold),
    {
      value: "Other",
      probability: predictedReturns
        .filter((ret) => ret.probability < otherThreshold)
        .reduce((cur, obj) => cur + obj.probability, 0),
      color: "red",
    } as EstimatedReturn,
  ];

  return (
    <StyledPieContainer>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            nameKey="value"
            dataKey="probability"
            data={filteredReturns}
            innerRadius={60}
            outerRadius={100}
            isAnimationActive={false}
          >
            <Label
              position="center"
              value="Winnings/Month"
              style={{
                fontSize: "130%",
                fill: "var(--color-slate-700)",
                textAnchor: "middle",
              }}
            />

            {filteredReturns.map((entry) => (
              <Cell
                key={entry.value}
                fill={`var(--color-${entry.color}-400)`}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </StyledPieContainer>
  );
};

export default ReturnsPie;

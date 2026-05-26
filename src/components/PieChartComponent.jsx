

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TwoLevelPieChart({
  totalBrands = 0,
  totalEmployees = 0,
}) {
  const outerData = [
    { name: "Brands", value: totalBrands },
    { name: "Employees", value: totalEmployees },
  ];

  const innerData = [
    { name: "Total brands", value: totalBrands},
    { name: "Employees Share", value: totalEmployees },
  ];

  const OUTER_COLORS = ["#6366f1", "#22c55e"];
  const INNER_COLORS = ["#f59e0b", "#ef4444"];

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>

        {/* OUTER PIE */}
        <Pie
          data={outerData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {outerData.map((_, index) => (
            <Cell key={`outer-${index}`} fill={OUTER_COLORS[index]} />
          ))}
        </Pie>

        {/* INNER PIE */}
        <Pie
          data={innerData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          label
        >
          {innerData.map((_, index) => (
            <Cell key={`inner-${index}`} fill={INNER_COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
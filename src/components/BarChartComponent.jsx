import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function BarChartComponent({ totalBrands, totalShops, totalEmployees }) {
  const data = [
    { name: " Brands", value: totalBrands },
    { name: "Shops", value: totalShops },
    { name: "Employees", value: totalEmployees },
  ];

  return (
    <main className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </main>
  );
}

export default BarChartComponent;
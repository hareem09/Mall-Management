import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { useSelector } from "react-redux";

export  function TaskChart() {
  const tasks =
    useSelector((state) => state.tasks.taskDetails) || [];

  const completed = tasks.filter(t => t.status === "Completed").length;
  const pending = tasks.filter(t => t.status === "Pending").length;
  const inProgress = tasks.filter(t => t.status === "InProgress").length;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "InProgress", value: inProgress },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
export function AttendanceChart() {
  const attendance =
    useSelector((state) => state.attendance.attendanceDetails) || [];

  const present = attendance.filter(a => a.status === "Present").length;
  const absent = attendance.filter(a => a.status === "Absent").length;

  const data = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
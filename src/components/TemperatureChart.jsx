"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TemperatureChart({ data }) {
  return (
    <div className="rounded-xl border border-slate-300 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-900">

      <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
        Temperature Trend
      </h2>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="time" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="temperature"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
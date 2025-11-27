"use client";

import { Select } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useUserChartQuery } from "@/redux/api/dashboard.api";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => {
  const year = currentYear - i;
  return { value: year.toString(), label: year.toString() };
});

const UserOverviewChart = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const query = {JoinYear : selectedYear}

  const { data, isSuccess } = useUserChartQuery(query);

  const handleChange = (value: any) => {
    setSelectedYear(value);
  };


  return (
    <div className="bg-white rounded-lg p-5 border border-stroke">
      <div className="flex lg:flex-wrap xl:flex-nowrap justify-between items-center mb-10 gap-2">
        <h1 className="text-xl font-medium text-black">Users Join Overview</h1>

        <div className="space-x-3">
          <Select
            value={selectedYear}
            style={{ width: 120 }}
            onChange={handleChange}
            options={years}
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={(isSuccess && data) ? data?.data?.map(i=>{
            return {month : i.month?.substring(0, 3), userCount : i?.userCount}
          }) : []}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} />

          <Tooltip
            formatter={(value) => [`Joined User: ${value}`]}
            contentStyle={{
              color: "#ffffff",
              background: "var(--color-main)",
              fontWeight: "500",
              borderRadius: "5px",
              border: "0",
            }}
            itemStyle={{ color: "white" }}
          />

          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="#080E0E"
            strokeDasharray="3 3"
          />

          <Bar
            barSize={40}
            radius={2}
            background={false}
            dataKey="userCount"
            fill="var(--color-main)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserOverviewChart;
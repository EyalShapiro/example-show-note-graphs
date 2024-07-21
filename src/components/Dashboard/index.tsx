import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import _ from "lodash";
import Select from "react-select";

import { defaultTasks } from "../Kanban/data";
import { stringToColor } from "./function/stringToColor";
import { TimeOption } from "./types/DashboardType";
import { filterTasksByTime } from "./function/filterTasksByTime";
import { timeOptions } from "./function/timeOptions";

const Dashboard: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<TimeOption>(timeOptions[0]);

  const filteredTasks = filterTasksByTime(defaultTasks, selectedTime.value);
  const groupedTasks = _.groupBy(filteredTasks, "columnId");
  const data = Object.keys(groupedTasks).map((key) => ({
    name: key,
    value: groupedTasks[key].length,
    fill: stringToColor(key),
  }));

  return (
    <div>
      <Select
        options={timeOptions}
        value={selectedTime}
        onChange={(option) => setSelectedTime(option as TimeOption)}
        className="mb-4"
      />
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 1 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="darkblue" />
      </BarChart>
    </div>
  );
};

export default Dashboard;

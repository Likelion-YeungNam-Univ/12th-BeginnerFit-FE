import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  YAxis,
} from "recharts";

// 포인트에 마우스 올렸을 때 표시할 컴포넌트
const CustomTooltip = ({ active = false, payload = [], label = "" }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "20px",
        }}
      >
        <p
          className="label"
          style={{ marginBottom: "0px" }}
        >{`${payload[0].payload.name}`}</p>
        <p className="intro">{payload[0].value}kg</p>
      </div>
    );
  }
  return null;
};

// 라벨 커스텀 컴포넌트
const CustomLabel = (props) => {
  const { x, y, value } = props;
  return (
    <text
      x={x}
      y={y + 15}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {value}
    </text>
  );
};

// 점 커스텀 컴포넌트
const CustomDot = (props) => {
  const { cx, cy } = props;
  return (
    <svg x={cx - 10} y={cy - 10} width={20} height={20} viewBox="0 0 20 20">
      <circle cx={10} cy={10} r={10} fill="rgba(255, 255, 255, 0.5)" />
      <circle cx={10} cy={10} r={5} fill="#fff" />
    </svg>
  );
};

export default function WeightChart({ data, isLoading }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={300}
        height={300}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 20,
          bottom: 15,
        }}
      >
        <YAxis domain={["dataMin - 1", "dataMax + 1"]} hide="true" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="vertical"
          dataKey="weight"
          stroke="#fff"
          activeDot={{ r: 8 }}
          dot={<CustomDot />}
        >
          <LabelList dataKey="weight" content={<CustomLabel />} />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
}

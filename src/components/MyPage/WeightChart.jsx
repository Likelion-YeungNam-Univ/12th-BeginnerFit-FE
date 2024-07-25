import React from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  YAxis,
} from "recharts";

const data = [
  {
    name: "2024년 1월 10일",
    몸무게: 56.1,
  },
  {
    name: "2024년 2월 28일",
    몸무게: 53.5,
  },
  {
    name: "2024년 3월 10일",
    몸무게: 54.7,
  },
  {
    name: "2024년 5월 20일",
    몸무게: 57.0,
  },
  {
    name: "2024년 6월 1일",
    몸무게: 53.0,
  },
];

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
      y={y + 20}
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

export default function WeightChart() {
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
          bottom: 5,
        }}
      >
        <YAxis domain={["dataMin - 1", "dataMax + 1"]} hide="true" />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="vertical"
          dataKey="몸무게"
          stroke="#fff"
          activeDot={{ r: 8 }}
          dot={<CustomDot />}
        >
          <LabelList dataKey="몸무게" content={<CustomLabel />} />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
import React from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import styled from "styled-components";

const data = [
  {
    uv: 100,
    fill: "black",
  },
  {
    uv: 70, // 원하는 퍼센트 값으로 설정
    fill: "#7D7AFF",
  },
];

export default function CircleChart() {
  return (
    <CircleWrap>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="0%" // 안쪽 원 숨기기
          outerRadius="100%" // 바깥쪽 원의 크기 설정
          startAngle={180} // 시작 각도를 90도로 설정 (오른쪽)
          endAngle={0} // 끝 각도를 450도로 설정 (시계 방향)
          barSize={50} // 바의 두께 설정
          data={data}
        >
          <RadialBar
            clockWise
            background={{ fill: "#686868" }} // 배경 색상을 설정
            dataKey="uv"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </CircleWrap>
  );
}

const CircleWrap = styled.div`
  flex: 1;
  position: absolute;
  width: 350px;
  height: 350px;
  top: -48%;
  right: -12%;
`;

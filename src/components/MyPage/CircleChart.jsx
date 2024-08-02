import React, { useEffect, useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import styled from "styled-components";

export default function CircleChart({ rate }) {
  // 도넛 모양 차트에 표현하기 위한 기본적인 데이터로 초기화
  const [data, setData] = useState([{ uv: 100, fill: "black" }]);

  // 부모 컴포넌트에서 받은 rate를 이용하여 차트에 표시하기
  useEffect(() => {
    if (rate) {
      let arr = [...data];
      arr[1] = { uv: rate, fill: "#7D7AFF" };
      setData(arr);
    }
  }, [rate]);

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

import styled from "styled-components";
import { RowContainer } from "../../styles/GlobalStyle";
import CircleChart from "./CircleChart";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";
export default function Circle() {
  const month = new Date().getMonth() + 1;

  const [rate, setRate] = useState(0);

  // 한 달 동안 몇일 출석했는 지 데이터 받아오기
  const { data, isLoading } = useFetchData("/attendance/monthly-count");

  useEffect(() => {
    if (data) {
      // 해당 달의 총 일수 구하기
      let totalDay = new Date().getDate();
      // 비율 구하기 (소수점 버림)
      setRate(Math.floor((data[0].count / totalDay) * 100));
    }
  }, [data]);

  return (
    <RowContainer
      style={{
        padding: "10px 20px",
        backgroundColor: "black",
        borderRadius: "31px",
        gap: "10px",
        position: "relative",
        marginTop: "10px",
        overflow: "hidden",
      }}
    >
      <H2>
        {month}월 한달 중<br />
        {rate}% 출석했어요!
      </H2>
      <CircleChart rate={rate} />
    </RowContainer>
  );
}

const H2 = styled.h2`
  color: white;
  flex: 1;
`;

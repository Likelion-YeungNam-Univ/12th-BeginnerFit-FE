import { useState, useEffect } from "react";
import styled from "styled-components";
import WeightChart from "./WeightChart";
import useFetchData from "../../hooks/useFetchData";

export default function Weight() {
  // 몸무게 데이터 저장할 state
  const [data, setData] = useState([]);

  // 목표까지 얼마 남았는지 저장할 state
  const [target, setTarget] = useState(0);

  // 서버로 부터 최근 몸무게 5개 가져오기
  const { data: weightData, isLoading } = useFetchData(
    "/users/recent-weight-records"
  );

  useEffect(() => {
    if (weightData) {
      let arr = weightData?.map((item, idx) => {
        // 목표까지 얼마 남았는지 저장하는 코드
        // 마지막 데이터가 가장 최근 몸무게이므로 목표 몸무게에서 마지막 요소의 몸무게를 빼서 설정
        if (idx === weightData.length - 1) {
          setTarget(
            (Number(item.targetWeight) - Number(item.weight)).toFixed(1)
          );
        }

        return {
          name: new Date(item.createdAt).toLocaleDateString(),
          weight: item.weight,
        };
      });
      setData(arr);
    }
  }, [weightData]);

  if (isLoading) return "Loading...";

  return (
    <Container>
      <ChartWrap>
        <WeightChart {...{ isLoading, data }}></WeightChart>
      </ChartWrap>
      {/* 목표 무게를 달성했을 때 문구 변경 */}
      {target > 0 ? (
        <H2>
          목표달성!
          <br />
          새로운 목표를 설정하세요!
        </H2>
      ) : (
        <H2>
          목표까지
          <br />
          {target}kg
        </H2>
      )}
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  padding: 0px 30px 0px 30px;
  width: 100%;
  height: 180px;
  background-color: ${({ theme }) => theme.colors.purple};
  border-radius: 31px;
  display: flex;
  justify-content: space-between;
`;

const ChartWrap = styled.div`
  width: 75%;

  height: 180px;
`;
const H2 = styled.h2`
  color: white;
  display: flex;
  align-items: center;
  text-align: right;
`;

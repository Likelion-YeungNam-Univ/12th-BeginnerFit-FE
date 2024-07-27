import styled from "styled-components";
import WeightChart from "./WeightChart";
export default function Weight() {
  return (
    <Container>
      <ChartWrap>
        <WeightChart></WeightChart>
      </ChartWrap>
      <H2>
        목표까지
        <br />
        -3kg
      </H2>
    </Container>
  );
}

const Container = styled.div`
  box-sizing: border-box;
  padding: 0px 30px 0px 30px;
  width: 100%;
  height: 150px;
  background-color: ${({ theme }) => theme.colors.purple};
  border-radius: 31px;
  display: flex;
  justify-content: space-between;
`;

const ChartWrap = styled.div`
  width: 75%;

  height: 150px;
`;
const H2 = styled.h2`
  color: white;
  display: flex;
  align-items: center;
  text-align: right;
`;

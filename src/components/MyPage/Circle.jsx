import styled from "styled-components";
import { RowContainer } from "../../styles/GlobalStyle";
import CircleChart from "./CircleChart";

export default function Circle() {
  const month = new Date().getMonth() + 1;

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
        N% 출석했어요!
      </H2>

      <CircleChart />
    </RowContainer>
  );
}

const H2 = styled.h2`
  color: white;
  flex: 1;
`;

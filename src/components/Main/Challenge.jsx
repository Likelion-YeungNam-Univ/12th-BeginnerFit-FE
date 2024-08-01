import styled, { keyframes, css } from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";
import checkButton from "../../images/checkButton.png";
import checkFillButton from "../../images/checkFillButton.png";

export default function Challenge({
  id,
  content,
  complete,
  index,
  handleCheck,
  allComplete,
}) {
  return (
    <Container $allComplete={allComplete}>
      <P onClick={() => handleCheck(index, id)}>{content}</P>
      <div>
        <Image
          src={complete ? checkFillButton : checkButton}
          onClick={() => handleCheck(index, id)}
        />
      </div>
    </Container>
  );
}

// 보라색이 왼쪽에서 부터 오른쪽으로 차오르도록 구현
const moveBackground = keyframes`
   from{
    transform: translateX(-100%);
   }
   to{
    transform: translateX(0%);
   }
`;

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 15px 20px;
  border-radius: ${responsiveSize("31")};
  color: ${({ $allComplete }) => ($allComplete ? "white" : "black")};
  justify-content: space-between;
  margin-bottom: 10px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  /* before를 통해 배경 요소 추가 */
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 모두 완료했을 때 색깔 변경 */
    background-color: ${({ theme, $allComplete }) =>
      $allComplete ? theme.colors.purple : theme.colors.gray01};
    z-index: -1;
    ${({ $allComplete }) =>
      $allComplete &&
      css`
        animation: ${moveBackground} 0.5s ease-in-out forwards;
      `}
  }
`;

const P = styled.div`
  margin: 0px;
  cursor: pointer;
  z-index: 2;
`;

const Image = styled.img`
  cursor: pointer;
  width: ${responsiveSize(25)};
  z-index: 2;
`;

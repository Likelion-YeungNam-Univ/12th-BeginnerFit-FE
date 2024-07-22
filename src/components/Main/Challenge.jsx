import styled from "styled-components";
import { responsiveSize } from "../../utils/Mediaquery";
import checkButton from "../../images/checkButton.png";
import checkFillButton from "../../images/checkFillButton.png";
export default function Challenge({ content, complete, index, handleCheck }) {
  return (
    <Container>
      <P onClick={() => handleCheck(index)}>{content}</P>
      <div>
        <Image
          src={complete ? checkFillButton : checkButton}
          onClick={() => handleCheck(index)}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 20px 20px 15px 20px;
  border-radius: ${responsiveSize("31")};
  background-color: ${({ theme }) => theme.colors.gray01};
  justify-content: space-between;
  margin-bottom: 10px;
`;

const P = styled.div`
  margin: 0px;
  cursor: pointer;
`;

const Image = styled.img`
  cursor: pointer;
  width: ${responsiveSize(25)};
`;

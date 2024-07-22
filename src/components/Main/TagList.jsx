import styled from "styled-components";
import Tag from "../Tag";
import playButton from "../../images/play button.png";

const tagList = [
  { title: "잔잔한" },
  { title: "신나는" },
  { title: "기쁜" },
  { title: "즐거운" },
];

export default function TagList() {
  return (
    <Container>
      {tagList.map((item) => (
        <Tag title={item.title} key={item.title}></Tag>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

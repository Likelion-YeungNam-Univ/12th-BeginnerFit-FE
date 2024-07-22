import { RowContainer, TimeText, TitleText } from "../../styles/GlobalStyle";
import styled from "styled-components";
import { IoPersonAddOutline } from "react-icons/io5";
import profile from "../../images/profile.png";
import { responsiveSize } from "../../utils/Mediaquery";
import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function WriteBoardMain() {
  return (
    <RowContainer style={{ marginTop: `${responsiveSize("50")}` }}>
      <ProfileImg src={profile} alt="Profile"></ProfileImg>
      <NickNameContainer>
        <TitleText>Nick</TitleText>
        <TimeText>Time</TimeText>
      </NickNameContainer>
      <IoPersonAddOutline
        style={{
          width: `${responsiveSize("20")}`,
          height: "auto",
          cursor: "pointer",
        }}
      />
      
      {/* 하트 체크박스 */}
      {/* <Checkbox
        style={{ color: "red", border: "black" }}
        {...label}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
      /> */}
    </RowContainer>
  );
}
const ProfileImg = styled.img`
  width: ${responsiveSize("60")};
  height: ${responsiveSize("60")};
`;
const NickNameContainer = styled.div`
  position: absolute;
  flex-direction: column;
  justify-content: center;
  margin-left: ${responsiveSize("70")};
`;
const RowLine = styled.hr`
  width: ${responsiveSize("18")};
  width: 100%;
`;

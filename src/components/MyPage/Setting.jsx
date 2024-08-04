import { useNavigate } from "react-router-dom";
import call from "../../images/call.png";
import logout from "../../images/logout.png";
import secession from "../../images/secession.png";
import { SettingItem } from "./SettingItem";

export default function Setting() {
  const nav = useNavigate();

  const images = [
    { img: call, text: "문의하기" },
    { img: logout, text: "로그아웃하기", onClick: logoutHandler },
    { img: secession, text: "회원탈퇴하기" },
  ];

  // 로그아웃 하기
  function logoutHandler() {
    localStorage.clear();
    nav("/");
  }

  return (
    <div>
      {images.map((item) => (
        <SettingItem
          img={item.img}
          text={item.text}
          key={item.img}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}

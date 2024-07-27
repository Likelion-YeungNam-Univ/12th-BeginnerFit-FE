import call from "../../images/call.png";
import logout from "../../images/logout.png";
import secession from "../../images/secession.png";
import { SettingItem } from "./SettingItem";

const images = [
  { img: call, text: "문의하기" },
  { img: logout, text: "로그아웃하기" },
  { img: secession, text: "회원탈퇴하기" },
];

export default function Setting() {
  return (
    <div>
      {images.map((item) => (
        <SettingItem img={item.img} text={item.text} key={item.img} />
      ))}
    </div>
  );
}

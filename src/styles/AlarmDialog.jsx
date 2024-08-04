import Swal from "sweetalert2";
const AlarmDialog = async({
  isOptions = false,
  inputOptions = {},
  title = "",
  content = "",
  type,
  showCancel = false,
}) => {
  //옵션이 없는 경우
  //아이콘
  //성공-success
  //경고-warning
  //에러-error
  //인포-info
  //물음표-question
  const swalOptions = {
    title: title,
    content: content,
    //아이콘
    icon: type,
    showCloseButton: true,
    //취소 버튼
    showCancelButton: showCancel,
    //취소 텍스트
    confirmButtonText: "확인",
    //확인 텍스트
    denyButtonText: "취소",
    showClass: {
      popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `,
    },
    hideClass: {
      popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `,
    },
  };
  //옵션있을 경우
  if (isOptions) {
    swalOptions.inputPlaceholder = "신고 사유";
    //전달받은 옵션값들
    swalOptions.inputOptions = inputOptions;
    swalOptions.input = "select";
  }

  const result= await Swal.fire(swalOptions);
  //사용자가 선택한 옵션 리턴
  if(result.isConfirmed){
    return isOptions ? result.value :true;
  }else if(result.isDismissed){
    return false;
  }
  return null;
};
export default AlarmDialog;
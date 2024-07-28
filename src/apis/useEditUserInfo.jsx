import api from "./axios";

export const useEditUserInfo = async (form) => {
  //이메일 회원정보에서 가져오기
  const email = "";

  const categoryName = ["exerciseIntensity", "exerciseGoals", "concernedAreas"];

  //기존 한글로 된 키값을 API명세서에 맞게 키값 변경.
  const setCategory = Object.keys(form.categories).map((item, idx) => {
    return {
      [categoryName[idx]]: form.categories[item],
    };
  });

  //폼 가공하기
  const initialForm = {
    email: email,
    height: parseFloat(form.height),
    weight: parseFloat(form.weight),
    targetWeight: parseFloat(form.targetWeight),
    date: form.date,
    targetDate: form.targetDate,
    exerciseTime: parseInt(form.exerciseTime),
    exerciseIntensity: setCategory[categoryName[0]],
    exerciseGoals: setCategory[categoryName[1]],
    concernedAreas: setCategory[categoryName[2]],
  };

  try {
    await api.put("/users/health-info", initialForm);
    alert("회원님의 건강정보가 수정되었습니다.");
  } catch (error) {
    console.log("건강정보 수정 실패", error);
  }
};

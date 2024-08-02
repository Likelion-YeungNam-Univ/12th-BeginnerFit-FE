const categories = {
  "운동 강도": [""],
  "운동 목표": ["", "2", "2", "14"],
  "고민 부위": ["2"],
};

let isValuesValid = (value) => {
  //빈문자열 판단.
  if (value === "") return false;
  return true;
};
// 카테고리 유효성 (각 카테고리별 1개 이상은 선택)
let t = Object.values(categories).every(
  (arr) => arr.length > 0 && arr.some((value) => isValuesValid(value))
);
console.log(t);

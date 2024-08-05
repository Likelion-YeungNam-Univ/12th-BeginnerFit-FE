import styled from "styled-components";
import Header2 from "../components/Community/Header2";
import { responsiveSize } from "../utils/Mediaquery";
import { RowContainer, Wrapper } from "../styles/GlobalStyle";
import SetCategory from "../components/MyPage/SetCategory";
import { useEffect, useState } from "react";
import { SubmitButton } from "../styles/GlobalStyle";
import { useUserInfo } from "../store/useUserInfo.js";
import { updateEditUserInfo } from "../apis/updateEditUserInfo";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import api from "../apis/axios.jsx";
import AlarmDialog from "../styles/AlarmDialog.jsx";
export default function EditUserInfo() {
  const user = useUserInfo((state) => state.user);
  const navigate = useNavigate();

  // 폼 상태 관리
  const [form, setForm] = useState({
    height: "",
    weight: "",
    targetWeight: "",
    date: "",
    targetDate: "",
    exerciseTime: "",
    categories: {
      "운동 강도": [],
      "운동 목표": [],
      "고민 부위": [],
    },
  });

  //입력창 모두 입력하면 버튼 활성화
  //폼 유효성검사
  const [isFormValid, setIsFormValid] = useState(false);

  //음수값 자릿수 제한
  const onInput = (e) => {
    if (Number(e.target.value) > 24) {
      e.target.value = 0;
      AlarmDialog({
        title: "하루 이내의 시간만 입력 가능합니다.",
        type: "warning",
      });
    } else if (e.target.value < 0) {
      e.target.value = 0;
      AlarmDialog({
        title: "음수값은 입력할 수 없습니다.",
        type: "info",
      });
    }
  };

  const {
    data: userInfo,
    isLoading: myInfoLoading,
    isError: myInfoError,
  } = useQuery({
    queryKey: ["myinfo"],
    //회원 건강정보 불러오기
    queryFn: async () => {
      const response = await api.get("/users/me");
      return response.data[0];
    },
    //회원정보 불러오기 성공 시
    onSuccess: (data) => {
      setForm({
        height: data.height,
        weight: data.weight,
        targetWeight: data.targetWeight,
        date: data.date,
        targetDate: data.targetDate,
        exerciseTime: data.exerciseTime,
        categories: {
          "운동 강도": data.exerciseIntensity,
          "운동 목표": data.exerciseGoals,
          "고민 부위": data.concernedAreas,
        },
      });
    },
  });

  const { mutate, error } = useMutation({
    mutationFn: (form) => updateEditUserInfo(form, user.email),
    onError: () => {
      AlarmDialog({
        title: "게시물 오류",
        text: "게시물을 불러오는데 오류가 발생했습니다.",
        type: "error",
      });
    },
    onSuccess: () => {
      navigate("/mypage");
    },
  });

  //입력값 관리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //setCategiry 컴포넌트에서 선택된 카테고리가져오기
  const handleCategorySubmit = (selectedCategories) => {
    setForm((prev) => ({ ...prev, categories: selectedCategories }));
  };

  // 폼 유효성 검사
  useEffect(() => {
    const {
      height,
      weight,
      targetWeight,
      date,
      targetDate,
      exerciseTime,
      categories,
    } = form;

    // 카테고리 유효성 (각 카테고리별 1개 이상은 선택)
    let isValuesValid = (value) => {
      //빈문자열 판단.
      return value !== "" && value !== null;
    };
    // 카테고리 유효성 (각 카테고리별 1개 이상은 선택)
    let isCategoriesValid = Object.values(categories).every((arr) => {
      let isValid = arr.length > 0 && arr.some((value) => isValuesValid(value));
      return isValid;
    });

    // 전체 유효성
    const isValid =
      height > 0 &&
      weight > 0 &&
      targetWeight > 0 &&
      date &&
      targetDate &&
      exerciseTime &&
      isCategoriesValid;

    setIsFormValid(isValid);
  }, [form]);

  //폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);

  };
  //내 정보불러오기 오류
  if (myInfoError) {
    return <h1>Error...다시 시도</h1>;
  }
  //내 정보 불러오기 로딩
  if (myInfoLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Header2 isDrop={false} />
        <RootContainer style={{ padding: "20px" }}>
          <H1>
            사용자 정보를
            <br />
            입력하세요
          </H1>
          <TextInputContainer>
            <P>키</P>
            <SubContainer>
              <Input
                type="number"
                onInput={onInput}
                name="height"
                value={form.height}
                onChange={handleInputChange}
              ></Input>
              <P>cm</P>
            </SubContainer>
          </TextInputContainer>
          <RowContainer>
            <TextInputContainer>
              <P>몸무게</P>
              <SubContainer>
                <Input
                  type="number"
                  onInput={onInput}
                  name="weight"
                  value={form.weight}
                  onChange={handleInputChange}
                ></Input>
                <P>kg</P>
              </SubContainer>
            </TextInputContainer>
            <TextInputContainer>
              <P>목표 몸무게</P>
              <SubContainer>
                <Input
                  type="number"
                  onInput={onInput}
                  name="targetWeight"
                  value={form.targetWeight}
                  onChange={handleInputChange}
                ></Input>
                <P>kg</P>
              </SubContainer>
            </TextInputContainer>
          </RowContainer>
          <RowContainer>
            <TextInputContainer>
              <P>기간</P>
              <SubContainer>
                <Input
                  style={{ fontSize: "12px" }}
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleInputChange}
                ></Input>
              </SubContainer>
            </TextInputContainer>
            <TextInputContainer>
              <P hiddenText>x</P>
              <SubContainer>
                <Input
                  style={{ fontSize: "12px" }}
                  type="date"
                  name="targetDate"
                  value={form.targetDate}
                  onChange={handleInputChange}
                ></Input>
              </SubContainer>
            </TextInputContainer>
          </RowContainer>
          <TextInputContainer>
            <P>운동시간</P>
            <SubContainer>
              <Input
                type="number"
                onInput={onInput}
                name="exerciseTime"
                value={form.exerciseTime}
                onChange={handleInputChange}
              ></Input>
              <P>시간</P>
            </SubContainer>
          </TextInputContainer>
          <SetCategory
            initialCategories={form.categories}
            onSubmit={handleCategorySubmit}
            isSignUp={false}
          ></SetCategory>
        </RootContainer>
        <Div>
          <SubmitButton
            $isFormValid={isFormValid}
            disabled={!isFormValid}
            type="submit"
          >
            수정하기
          </SubmitButton>
        </Div>
      </form>
    </Wrapper>
  );
}

//=============================================
const H1 = styled.h1`
  @media (max-width: 480px) {
    font-size: ${responsiveSize("24")};
  }
`;
const P = styled.p`
  padding-left: 10px;
  font-size: ${responsiveSize("20")};
  margin-bottom: ${responsiveSize(10)};

  //글씨 채우기용(화면 상에서는 안보이도록 )
  color: ${({ hiddenText }) => (hiddenText ? "transparent" : "black")};
  @media (max-width: 480px) {
    font-size: ${responsiveSize("15")};
  }
`;
const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-right: ${responsiveSize(30)};
  @media (max-width: 480px) {
    margin-right: ${responsiveSize(16)};
  }
`;
const Input = styled.input`
  width: ${responsiveSize(120)};
  height: ${responsiveSize(40)};
  padding: ${responsiveSize("10")};
  font-size: ${responsiveSize("20")};
  border: none;
  font-weight: 400;
  border-radius: ${responsiveSize("12")};
  background-color: ${({ theme }) => theme.colors.gray01};
  @media (max-width: 480px) {
    width: ${responsiveSize(90)};
    height: ${responsiveSize(30)};
    font-size: ${responsiveSize(15)};
  }
`;
const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const RootContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
`;
const Div = styled.div`
  display: flex;
  justify-content: center;
`;

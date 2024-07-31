import {
  StyledCalendarWrapper,
  StyledCalendar,
  StyledToday,
  StyledDot,
} from "../../styles/CalendarStyle";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import useFetchData from "../../hooks/useFetchData";

export default function Challender() {
  const today = new Date();
  const [date, setDate] = useState(today);

  // 출석한 날짜 저장할 state
  const [attendDay, setAttendDay] = useState([]);

  // 출석한 날짜 데이터 가져오기
  const { data, isLoading } = useFetchData("/attendance/dates");

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // 출석한 날짜 저장
  useEffect(() => {
    if (data) {
      setAttendDay(data.map((item) => item.presentDate));
    }
  }, [data]);

  if (isLoading) return "Loading...";

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={handleDateChange}
        formatDay={(locale, date) => dayjs(date).format("D")} // 일 제거 숫자만 보이게
        formatYear={(locale, date) => dayjs(date).format("YYYY")} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(locale, date) => dayjs(date).format("YYYY년 MM월")} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
        // tileDisabled={() => true} // 모든 날짜 비활성화
        tileContent={({ date, view }) => {
          let html = [];
          const dt = dayjs(date);
          const todayDt = dayjs();

          if (view === "month" && dt.isSame(todayDt, "day")) {
            html.push(<StyledToday key={"today"}>오늘</StyledToday>);
          }
          if (attendDay.includes(dt.format("YYYY-MM-DD"))) {
            html.push(<StyledDot key={dt.format("YYYY-MM-DD")} />);
          }
          return <>{html}</>;
        }}
      />
    </StyledCalendarWrapper>
  );
}

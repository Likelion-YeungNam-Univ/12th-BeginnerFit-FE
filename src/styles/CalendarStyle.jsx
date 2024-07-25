import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 2rem;
    padding: 3% 5%;
    background-color: ${({ theme }) => theme.colors.gray01};
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: black;
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: ${({ theme }) => theme.colors.gray01};
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: ${({ theme }) => theme.colors.gray01};
    color: black;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background-color: inherit;
    abbr {
      color: black;
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: lightgray;
    padding: 0;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: ${({ theme }) => theme.colors.purple};
    abbr {
      color: white;
    }
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 5px 0px 18px;
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 10px 6.6667px;
    font-size: 0.9rem;
    font-weight: 500;
    color: black;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: rgb(193, 193, 193);
    border-radius: 1rem;
  }
`;

export const StyledCalendar = styled(Calendar)``;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
  font-size: x-small;
  color: ${({ theme }) => theme.colors.gray03};
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

/* 출석한 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
  background-color: rgba(101, 62, 225, 0.7);
  border-radius: 50%;
  width: 1.7rem;
  height: 1.7rem;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translateX(-50%);
`;

export const TimeCalculator = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const timeDiff = now - postDate;

  // 시간대 차이를 고려한 계산
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years}년 전`;
  } else if (months > 0) {
    return `${months}달 전`;
  } else if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else if (seconds > 10) {
    return `${seconds}초 전`;
  } else {
    return "방금 전";
  }
};

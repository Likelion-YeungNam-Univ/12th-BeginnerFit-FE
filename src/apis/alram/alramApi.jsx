import api from "../axios";

// 알림창에서 친구 요청 수락 거절
export const handleFriendRequest = async (type, id) => {
  let url = type === "sure" ? `/friends/accept/${id}` : `/friends/${id}`;

  // type이 sure이면 친구 추가, 아니면 거절
  if (type === "sure") {
    const res = await api.put(url);
  } else {
    const res = await api.delete(url);
  }
};

// 알림 읽음을 보내는 api
export const handleAlarmClick = async (alarmId) => {
  let url = `/alarm/${alarmId}/check`;

  const res = await api.put(url);
  console.log(res);
};

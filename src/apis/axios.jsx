import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//응답 인터셉터
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.data.error === "INVALID_TOKEN") {
      try {
        // 새로 발급받은 access token으로 재요청
        const newAccessToken = await refreshToken();
        localStorage.setItem("accessToken", newAccessToken);
        // 새로 발급받은 토큰을 원래 요청의 헤더에 추가
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.");

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const data = await api.post("/refresh-token", { token: refreshToken });
    return data.accessToken;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default api;

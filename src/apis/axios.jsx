import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
    

});

// 요청 인터셉터
api.interceptors.request.use(config => {
    config.headers["authorization"] = localStorage.getItem("accessToken");
    config.headers["refresh-token"] = localStorage.getItem("refreshToken");
    return config;
  }, error => {
    return Promise.reject(error);
  });
  
  // 응답 인터셉터
  api.interceptors.response.use(res => {
    // 응답 헤더에 토큰이 있으면 true
    if (res.headers["authorization"]){
        // 만료된 access 토큰 삭제
        localStorage.removeItem("accessToken");
        // 새로운 access 토큰 저장
        localStorage.setItem("accessToken", res.headers["authorization"]);
    }else if(res.data.error === "INVALID_TOKEN"){
        // refresh 토큰이 만료되었다면
        // access 토큰 삭제
        localStorage.removeItem("accessToken");
        // refresh 토큰 삭제
        localStorage.removeItem("accessToken");
        alert("토큰이 만료되었습니다. 다시 로그인해주세요.")
        
    }
    return res;
  }
  );

export default api;
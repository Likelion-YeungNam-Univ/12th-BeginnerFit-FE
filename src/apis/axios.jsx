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
    // 요청 전처리 (예: 인증 토큰 추가)
    return config;
  }, error => {
    return Promise.reject(error);
  });
  
  // 응답 인터셉터
  api.interceptors.response.use(res => {
    return res;
  }, error => {
    // CORS 문제와 관련된 에러 처리
    if (error.res && error.res.status === 401) {
      console.error('Unauthorized request');
    }
    return Promise.reject(error);
  });

export default api;

import api from "./axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const sendAuthCode = async (email) => {

    try {
        console.log('Sending auth code to email:', email);
        const response = await api.post(`${SERVER_URL}/auth/email-send`,null, {params: { email }});
        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // 서버에서 응답이 있을 경우
            const { status, statusText, data } = error.response;
            console.error(`인증 코드를 보내는 데 실패되었습니다: ${status} ${statusText}`);
            console.error('에러 세부정보:', data);
            throw new Error(`인증 코드를 보내는 데 실패되었습니다: ${data.error || statusText}`);
        } else if (error.request) {
            // 요청이 서버로 전송되었으나 응답이 없을 경우
            console.error('서버로부터 응답을 받지 못했습니다:', error.request);
            throw new Error('서버로부터 응답을 받지 못했습니다.');
        } else {
            // 요청을 설정하는 중 발생한 에러
            console.error('에러 발생:', error.message);
            throw new Error('에러 발생: ' + error.message);
        }
    }
};

export const verifyAuthCode = async (email, code) => {

    try {
        const response = await api.post(`${SERVER_URL}/auth/email-verify`, { email, code });
        return response.data;
    } catch (error) {
        if (error.response) {
            // 서버에서 응답이 있을 경우
            console.error(`인증 코드를 검증하는 데 실패되었습니다: ${error.response.status} ${error.response.statusText}`);
            console.error('에러 세부정보:', error.response.data);
        } else if (error.request) {
            // 요청이 서버로 전송되었으나 응답이 없을 경우
            console.error('서버로부터 응답을 받지 못했습니다:', error.request);
        } else {
            // 요청을 설정하는 중 발생한 에러
            console.error('에러 발생:', error.message);
        }
        throw new Error(`Failed to verify auth code: ${error.response ? error.response.data : error.message}`);
    }
};

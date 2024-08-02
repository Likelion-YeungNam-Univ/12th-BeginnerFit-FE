import React, { useEffect, useState } from "react";
import { responsiveSize } from "../../utils/Mediaquery";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { findId } from '../../apis/findID';

export default function ForgetIdP2() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const storedName = localStorage.getItem('findName');

    // const email = 'example@example.com'; //test

    useEffect(()=>{
        async function fetchEmail() {
            if (storedName) {
                try {
                    const data = await findId(storedName);
                    setEmail(data.email);
                } catch (error) {
                    console.error('Error fetching email:', error);
                    setError('서버 오류');
                } finally {
                    setLoading(false);
                }
            } else {
                setError('닉네임이 저장되어 있지 않습니다.');
                setLoading(false);
            }
        }
        fetchEmail();
    },[storedName])

    return(
        <Wrapper>
            <Box>
                <Container>
                    <H1>
                        해당 닉네임으로 가입한 
                        <br/>
                        아이디 정보입니다
                    </H1>
                    {loading ? (
                        <UserEmail>Loading...</UserEmail>
                    ) : error ? (
                        <UserEmail>{error}</UserEmail>
                    ) : (
                        <UserEmail>{email}</UserEmail>
                    )}
                </Container>
                <ConfirmButton
                    type="button"
                    onClick={() => {(navigate('/'))
                    }} 
                >
                    확인하기
                </ConfirmButton>
            </Box>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
    border: solid 1px ${({ theme }) => theme.colors.gray04};
`

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width: 500px;
    height: 100%;
    margin: 0px auto;
`
const Container = styled.div`
    
`

const H1 = styled.h1`
  margin-top: 80px;
  @media (max-width: 480px) {
    font-size: ${responsiveSize("24")};
  }
`;

const UserEmail = styled.div`
    margin-top: 100px;
    font-size: ${responsiveSize("18")};
`

const ConfirmButton = styled.button`
    width: 100%;
    height: ${responsiveSize(60)};
    background-color: #171717;
    color: white;
    font-size: ${responsiveSize("20")};
    
    padding: 15px;
    margin-bottom: 50px;
    border-radius: 10px;
    border: none;
    box-sizing: border-box;
    cursor: pointer;
`
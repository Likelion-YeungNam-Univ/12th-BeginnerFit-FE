import React from "react";
import styled from 'styled-components';
import Page1 from "../components/SignUp/Page1";

export default function SignUp() {
    
    return(
        <Wrapper>
            {/* <div>sign up page</div> */}
            <Page1></Page1>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    height: 100vh;
    background-color: ${({ theme }) => theme.colors.white};
    border: solid 1px ${({ theme }) => theme.colors.gray04};
`
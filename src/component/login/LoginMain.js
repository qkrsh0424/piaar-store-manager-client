import { useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { userDataConnect } from '../../data_connect/userDataConnect';

const Container = styled.div`
`;

const FormGroupContainer = styled.div`
    height: 100%;
`;

const FormGroupWrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%,-50%);
    width: 80%;
`;

const FormElContainer = styled.div`
    padding: 10px;
`;

const LabelEl = styled.label`
    color:#7d7ada;
    font-weight: 600;
`;

const InputEl = styled.input`
    width: 100%;
    padding: 8px;
    border: 2px solid #7d7ada;
    border-radius: 5px;

`;

const ButtonEl = styled.button`
    width:100%;
    padding:8px;
    background: #7d7ada;
    border:1px solid #7d7ada;
    border-radius: 5px;
    color:white;
    font-weight: 600;
`;
const LoginMain = ({ history }) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const __handleDataConnect = () => {
        return {
            postLogin: async function () {

                await userDataConnect().postLogin(loginData)
                    .then(res => {
                        if (res.status == 200 && res.data && res.data.message == 'success') {
                            history.replace('/')
                        }
                    })
                    .catch(err => {
                        alert('아이디 혹은 패스워드 불일치');
                        console.log(err);
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            loginDataChange: function () {
                return {
                    input: function (e) {
                        setLoginData({ ...loginData, [e.target.name]: e.target.value })
                    }
                }
            },
            loginSubmit: async function (e) {
                e.preventDefault();
                await __handleDataConnect().postLogin();
            }
        }
    }

    return (
        <>
            <Container>
                <form onSubmit={(e) => __handleEventControl().loginSubmit(e)}>
                    <FormGroupContainer>
                        <FormGroupWrapper>
                            <FormElContainer>
                                <LabelEl>아이디</LabelEl>
                                <InputEl type='text' name='username' value={loginData.username} onChange={(e) => __handleEventControl().loginDataChange().input(e)}></InputEl>
                            </FormElContainer>
                            <FormElContainer>
                                <LabelEl>패스워드</LabelEl>
                                <InputEl type='password' name='password' value={loginData.password} onChange={(e) => __handleEventControl().loginDataChange().input(e)}></InputEl>
                            </FormElContainer>
                            <FormElContainer>
                                <ButtonEl type='submit'>로그인</ButtonEl>
                            </FormElContainer>
                        </FormGroupWrapper>
                    </FormGroupContainer>
                </form>

            </Container>
        </>
    );
}

export default withRouter(LoginMain);
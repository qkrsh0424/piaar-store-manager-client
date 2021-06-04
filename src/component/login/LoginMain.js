import { useState } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { userDataConnect } from '../../data_connect/userDataConnect';

const Container = styled.div`

`;

const LoginMain = ({history}) => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })

    const __handleDataConnect = () => {
        return{
            postLogin: async function(){
                
                await userDataConnect().postLogin(loginData)
                    .then(res=>{
                        if(res.status == 200 && res.data && res.data.message=='success'){
                            history.replace('/')
                        }
                    })
                    .catch(err=>{
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
            loginSubmit: async function(e){
                e.preventDefault();
                await __handleDataConnect().postLogin();
            }
        }
    }

    return (
        <>
            <Container>
                <form onSubmit={(e)=>__handleEventControl().loginSubmit(e)}>
                    <div>
                        <label>아이디</label>
                        <input type='text' name='username' value={loginData.username} onChange={(e) => __handleEventControl().loginDataChange().input(e)}></input>
                    </div>
                    <div>
                        <label>패스워드</label>
                        <input type='password' name='password' value={loginData.password} onChange={(e) => __handleEventControl().loginDataChange().input(e)}></input>
                    </div>
                    <div>
                        <button type='submit'>로그인</button>
                    </div>
                </form>

            </Container>
        </>
    );
}

export default withRouter(LoginMain);
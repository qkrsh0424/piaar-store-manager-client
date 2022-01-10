import moment from "moment";
import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getCommuteRecordTodayStrict, setCommuteRecordWorkEnd, setCommuteRecordWorkStart } from "../../data_connect/commuteRecordDataConnect";
import { dateToYYYYMMDDhhmmss, diffTimeToHHmmss } from "../../utils/dateFormatUtils";
import DrawerNavbarMain from "../nav/DrawerNavbarMain";
import CommuteRecordBody from "./CommuteRecordBody";
import CurrentTimeBoard from "./CurrentTimeBoard";
import HeaderComponent from "./HeaderComponent";

const Container = styled.div`
    background: #000000; 
    padding-bottom:150px;
    min-height: 100vh;
    animation: 20s backgroundAni infinite ;
    @keyframes backgroundAni {
        0% {
            background: #000000;
        }
        10% {
            background: #001233;
        }
        20%{
            background: #003c62;
        }
        30%{
            background: #25537b;
        }
        40%{
            background: #316b95;
        }
        50% {
            background: #5c84af;
        }
        60%{
            background: #316b95;
        }
        70%{
            background: #25537b;
        }
        80%{
            background: #003c62;
        }
        90% {
            background: #001233;
        }
        100% {
            background: #000000;
        }
    }
`;


const initialCommuteRecordState = null;

const commuteRecordStateReducer = (state, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            return action.payload;
        case 'GO_TO_WORK':
            return {
                ...state,
                workStartDate: action.payload
            };
        case 'LEAVE_WORK':
            return {
                ...state,
                workEndDate: action.payload
            }
        default: return { ...state };
    }
}

const CommuteRecordMain = () => {

    const [commuteRecordState, dispatchCommuteRecordState] = useReducer(commuteRecordStateReducer, initialCommuteRecordState);

    useEffect(() => {
        async function fetchInit() {
            __handleDataConnect().getCommuteRecord();
        }
        fetchInit();
    }, [])


    const __handleDataConnect = () => {
        return {
            getCommuteRecord: async function () {
                await getCommuteRecordTodayStrict()
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchCommuteRecordState({
                                type: 'INIT_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        console.log(res.data.memo);
                    })
            },
            setWorkStart: async function () {
                let params = {
                    id: commuteRecordState.id
                }
                await setCommuteRecordWorkStart(params)
                    .then(res => {
                        // console.log(res);
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    })
            },
            setWorkEnd: async function () {
                let params = {
                    id: commuteRecordState.id
                }
                await setCommuteRecordWorkEnd(params)
                    .then(res => {
                        // console.log(res);
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error');
                        }
                        alert(res.data.memo);
                    })
            }
        }
    }

    const onGoToWork = async () => {
        await __handleDataConnect().setWorkStart();
        await __handleDataConnect().getCommuteRecord();

    }

    const onLeaveWork = async () => {
        await __handleDataConnect().setWorkEnd();
        await __handleDataConnect().getCommuteRecord();
    }

    return (
        <>
            <DrawerNavbarMain></DrawerNavbarMain>
            <Container>
                <HeaderComponent></HeaderComponent>
                <CurrentTimeBoard></CurrentTimeBoard>
                <CommuteRecordBody
                    workStartDate={commuteRecordState?.workStartDate}
                    workEndDate={commuteRecordState?.workEndDate}

                    onGoToWork={() => onGoToWork()}
                    onLeaveWork={() => onLeaveWork()}
                ></CommuteRecordBody>
            </Container>
        </>
    );
}

export default CommuteRecordMain;
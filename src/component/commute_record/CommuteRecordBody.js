import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { dateToYYYYMMDDhhmmss, diffTimeToHHmmss } from "../../utils/dateFormatUtils";

const Container = styled.div`
    padding-top: 20px;
    text-align: center;
`;

const ContentBox = styled.div`
    margin-top: 50px;
    display: inline-block;
    width: 80%;
    background: #00000040;
    border:2px solid #888;
    border-radius: 5px;
    padding:20px;
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    text-shadow: 
        0 0 5px #fff, 
        0 0 10px #fff, 
        0 0 7px #fff, 
        0 0 20px #88dfff, 
        0 0 35px #68ffc8, 
        0 0 40px #68ffc8, 
        0 0 50px #68ffc8, 
        0 0 75px #68ffc8;
    background: 
        /* On "top" */
        repeating-linear-gradient(
            45deg,
            transparent,
            transparent 4px,
            #171717 4px,
            black 8px
        ),
        /* on "bottom" */
        linear-gradient(
            to bottom,
            #171717,
            black
        );
    background-repeat: no-repeat;
    background-attachment: fixed;
    box-shadow: 
        0 0 5px #fff, 
        0 0 10px #fff, 
        0 0 7px #fff, 
        0 0 20px #88dfff, 
        0 0 35px #68ffc8, 
        0 0 40px #68ffc8, 
        0 0 20px #68ffc8, 
        0 0 25px #68ffc8;
    ;
`;

const WorkBtn = styled.button`
    border: 1px solid orange;
    border-radius: 10px;
    background:#ff700b;
    color:white;
    font-weight: 800;
    padding:10px 20px;

    box-shadow: 
        0 0 5px #fff, 
        0 0 10px #fff, 
        0 0 7px #fff, 
        0 0 20px #88dfff, 
        0 0 35px #68ffc8, 
        0 0 40px #68ffc8, 
        0 0 20px #68ffc8, 
        0 0 25px #68ffc8;
    ;

    transition: all .5s;
    &:hover{
        box-shadow: 
            0 0 5px #fff, 
            0 0 10px #fff, 
            0 0 7px #fff, 
            0 0 20px #88dfff, 
            0 0 35px #68ffc8, 
            0 0 40px #68ffc8, 
            0 0 50px #68ffc8, 
            0 0 75px #68ffc8;
        ;   
    }
`;

const CommuteRecordBody = (props) => {
    const workingHoursTickInterval = useRef(null);

    const [workingTime, setWorkingTime] = useState(null);

    useEffect(() => {
        if (props.workStartDate && props.workEndDate) {
            let workStartDate = props.workStartDate || new Date();

            setWorkingTime(diffTimeToHHmmss(workStartDate, props.workEndDate));
            return;
        }

        if (!props.workStartDate || props.workEndDate) {
            return;
        }

        workingHoursTickInterval.current = setInterval(() => {

            let workStartDate = props.workStartDate || new Date();

            setWorkingTime(diffTimeToHHmmss(workStartDate, new Date()));
        }, 1000)

        return () => {
            clearInterval(workingHoursTickInterval.current);
        }
    }, [props.workStartDate, props.workEndDate]);

    return (
        <>
            <Container>
                <ContentBox>
                    <div>
                        <div>업무 시작 시간</div>
                        <div>{props.workStartDate ? dateToYYYYMMDDhhmmss(props.workStartDate || new Date()) : ''}</div>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        <div>업무 종료 시간</div>
                        <div>{props.workEndDate ? dateToYYYYMMDDhhmmss(props.workEndDate || new Date()) : ''}</div>
                    </div>
                </ContentBox>
                <ContentBox>
                    <div>
                        <div>금일 근로 시간</div>
                        <div>{workingTime || '00 : 00 : 00'}</div>
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        {!props.workStartDate &&
                            <WorkBtn type='button' onClick={() => props.onGoToWork()}>일하기</WorkBtn>
                        }
                        {(props.workStartDate && !props.workEndDate) &&
                            <WorkBtn type='button' onClick={() => props.onLeaveWork()}>일 그만하기</WorkBtn>
                        }
                        {(props.workEndDate) &&
                            <WorkBtn type='button'>오늘 하루도 고생링했슴</WorkBtn>
                        }
                    </div>
                </ContentBox>
            </Container>
        </>
    );
}

export default CommuteRecordBody;
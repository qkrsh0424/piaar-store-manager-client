import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { dateToYYYYMMDDhhmmss } from "../../utils/dateFormatUtils";

const Container = styled.div`
    padding-top: 40px;
    text-align: center;
`;

const ContentBox = styled.div`
    display: inline-block;
    width: 80%;
    background: #00000040;
    border:2px solid #888;
    border-radius: 5px;
    padding:20px;
    font-size: 20px;
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

const CurrentTimeBoard = () => {
    const currentTimeTickInterval = useRef(null);

    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        function currentTimeTick() {
            setCurrentTime(dateToYYYYMMDDhhmmss(new Date()));
            currentTimeTickInterval.current = setInterval(() => {
                setCurrentTime(dateToYYYYMMDDhhmmss(new Date()));
            }, 1000);
        }

        currentTimeTick();

        return () => {
            clearInterval(currentTimeTickInterval.current);
        };
    }, []);

    return (
        <>
            <Container>
                <ContentBox>
                    <div>현재 시간</div>
                    <div>{currentTime}</div>
                </ContentBox>
            </Container>
        </>
    );
}

export default CurrentTimeBoard;
import styled, { css } from 'styled-components';

const Container = styled.div`
    padding: 0 10px;;
    display: flex;
`;

const SelectorWrapper = styled.div`
    
    select {
        padding: 3px;
        margin: 10px;
        /* border: 1px solid #e1e1e1; */
        border: 1px solid rgb(122, 123, 218);
        color: rgb(77 77 116);
        text-align: center;
        display: inline-block;
        transition: 0.25s;
        /* width: 20%; */
        width: 200px;
        
        &:focus{
            outline: none;
        }
    
        @media only screen and (max-width:768px){
            font-size: 10px;
        }
    }
`;


export {
    Container,
    SelectorWrapper
}
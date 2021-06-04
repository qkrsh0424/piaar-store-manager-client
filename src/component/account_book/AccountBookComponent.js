import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Container = styled.div`

`;

const CommonLinkGroupContainer = styled.div`
    position:fixed;
    bottom:0;
    width:100%;
    overflow: hidden;
`;

const CommonLinkGroupWrapper = styled.div`
    padding:20px;
    text-align: center;
`;

const CommonLinkEl = styled(Link)`
    display: inline-block;
    padding:1rem;
    border-radius: 5px;
    text-align: center;
    background: ${props=>props.color ? props.color : 'skyblue'};
    width:100%;
    font-size: 1.5rem;
    font-weight: 700;
    color:white;

    &:hover{
        color:#f1f1f1;
        text-decoration: none;
    }
`;
const IncomeComponent = () => {
    return (
        <>
            <Container>
                <CommonLinkGroupContainer>
                    <CommonLinkGroupWrapper className='row'>
                        <div className='col-6 mb-2'>
                            <CommonLinkEl
                                to={'/account-book/income'}
                                color={'#4682B4'}
                            >수입작성</CommonLinkEl>
                        </div>
                        <div className='col-6 mb-2'>
                            <CommonLinkEl
                                to={'/account-book/expenditure'}
                                color={'#FF6347'}
                            >지출작성</CommonLinkEl>
                        </div>
                    </CommonLinkGroupWrapper>
                </CommonLinkGroupContainer>
            </Container>
        </>
    );
}

export default IncomeComponent;
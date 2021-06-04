import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';

const ContentContainer = styled.div`
    padding:50px;
`;

const LinkContainer = styled.div`
    padding:10px;
`;

const LinkEl = styled(Link)`
    font-size:20px;
`;
const DrawerNavbarSiderComponent = (props) => {
    return (
        <>
            <Drawer
                anchor={'left'}
                open={props.open}
                onClose={() => props.__handleEventControl().drawer().close()}
            >
                <ContentContainer
                    onClick={() => props.__handleEventControl().drawer().close()}
                    onKeyDown={() => props.__handleEventControl().drawer().close()}
                >
                    <LinkContainer>
                        <LinkEl to='/'>메인페이지</LinkEl>
                    </LinkContainer>
                    <LinkContainer>
                        <LinkEl to='/account-book'>입지출관리</LinkEl>
                    </LinkContainer>
                    <LinkContainer>
                        <LinkEl to='/order-confirm'>발주확인건</LinkEl>
                    </LinkContainer>
                    <LinkContainer>
                        <LinkEl to='/waybill'>중복운송장취합</LinkEl>
                    </LinkContainer>
                    <LinkContainer>
                        <form onSubmit={(e)=>props.__handleEventControl().logoutSubmit(e)}>
                            <button type='submit' className='btn btn-sm btn-outline-danger btn-block'>로그아웃</button>
                        </form>
                    </LinkContainer>
                </ContentContainer>
            </Drawer>
        </>
    );
}

export default DrawerNavbarSiderComponent;
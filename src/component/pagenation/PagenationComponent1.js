import React from 'react';
import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled.div`
    margin-top: 2rem;
    & .MuiPagination-ul{
        justify-content: center;
    }
`;

const PagenationComponent1 = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    let pathname = location.pathname;
    let query = queryString.parse(location.search);

    const handleChange = (event, value) => {
        navigate(`${pathname}?${queryString.stringify({ ...query, currPage: value })}`)
    };

    return (
        <Container>
            <div>
                <Pagination count={props.pagenation.pageSize} page={props.pagenation.currPage} color="primary" onChange={(e, val) => handleChange(e, val)} />
            </div>
        </Container>
    );
}

export default PagenationComponent1;
import React from 'react';
import styled from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';
import { withRouter } from 'react-router';
import queryString from 'query-string';

const Container = styled.div`
    margin-top: 2rem;
    & .MuiPagination-ul{
        justify-content: center;
    }
`;

const PagenationComponent1 = (props) => {
    let pathname = window.location.pathname;
    let query = queryString.parse(window.location.search);

    const handleChange = (event, value) => {
        // console.log(value);
        props.history.push(`${pathname}?${queryString.stringify({ ...query, currPage: value })}`)
    };

    return (
        <Container>
            <div>
                <Pagination count={props.pagenation.pageSize} page={props.pagenation.currPage} color="primary" onChange={(e, val) => handleChange(e, val)} />
            </div>
        </Container>
    );
}

export default withRouter(PagenationComponent1);
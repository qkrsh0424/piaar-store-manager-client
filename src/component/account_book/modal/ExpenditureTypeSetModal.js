import { useState } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@mui/material/Tooltip';

const Container = styled.div`
`;

const ItemGroup = styled.div`
    display: grid;
    grid-template-columns: 32% 32% 32%;
    padding:3px 8px;
    grid-gap: 2px;
    border-bottom: 1px solid #f1f1f1;
`;

const ItemBtn = styled.button`
    display: inline-block;
    border:1px solid #1199dc;
    border-radius: 5px;
    margin:5px 2px;
    padding:5px;
    background: none;
    color: #1199dc;
    font-weight: 600;
    @media only screen and (max-width:992px){
        font-size: 0.7rem;
    }

`;
const ExpenditureTypeSetModal = (props) => {
    const query = queryString.parse(window.location.search);

    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('sm');
    return (
        <>
            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={props.open}
                onClose={() => props.__handleEventControl().expenditureType().settingModalClose()}
            >
                <Container>
                    <ItemGroup>
                        {props.expenditureTypeList && props.expenditureTypeList.map(r => {
                            return (
                                <Tooltip key={r.expenditureTypeId} title={r.expenditureTypeDesc} arrow>
                                    <ItemBtn type='button' onClick={()=>props.__handleEventControl().expenditureType().setType(r.expenditureTypeId)}>{r.expenditureType}</ItemBtn>
                                </Tooltip>
                            );
                        })}
                    </ItemGroup>
                </Container>

            </Dialog>
        </>
    );
}

export default ExpenditureTypeSetModal;
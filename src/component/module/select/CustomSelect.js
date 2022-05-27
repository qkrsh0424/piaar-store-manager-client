import styled from 'styled-components';

const Container = styled.div`
    
`;

const Select = styled.select`
    width: ${props => props.width};
    height: 43px;
    padding:0 38px 0 10px;
    margin: 0 10px;
    border: 1px solid #e1e1e1;
    border-radius: 0;
    font-size: 14px;
    -webkit-appearance: none;
    -moz-appearance: none; 
    appearance: none;
    background:url('/assets/icon/drop_down_arrow_icon.svg') no-repeat 97% 50%/25px auto;

    &:focus{
        outline: none;
    }

    &::-ms-expand{
        display: none;
    }

    @media all and (max-width:992px) {
        margin: 10px 0 0 0;
        width: 100%;
    }
`;
export default function CustomSelect({
    children,
    width,
    height,
    ...props
}) {
    return (
        <Select
            width={width || '100%'}
            height={height || '43px'}
            {...props}
        >
            {children}
        </Select>
    );
}
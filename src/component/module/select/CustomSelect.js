import styled from 'styled-components';

const Select = styled.select`
    width: ${props => props.width};
    height: ${props => props.height};
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

    &:disabled{
        opacity: 0.7;
        background: none;
    }
    
    @media all and (max-width:992px) {
        margin: 10px 0 0 0;
        width: 100%;
    }
`;
/**
 * 
 * @param {object} props
 * @param {string} props.width
 * @param {string} props.height
 * @returns 
 */
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
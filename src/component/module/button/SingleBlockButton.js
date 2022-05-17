import styled from 'styled-components';
import Ripple from './Ripple';

const Button = styled.button`
    user-select: none;
    position: relative;
    overflow: hidden;
    display: block;
    line-height: 1;
    width: 100%;
    background: white;
    border:1px solid #e0e0e0;
    padding: 10px 0;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
    color:#323232;
    cursor: pointer;

    &:hover{
        color:${props => props.hoverColor || 'inherit'};
        background:${props => props.hoverBackground || '#e0e0e060'};
    }

    &:disabled{
        cursor: not-allowed;
    }
`;

export default function SingleBlockButton({
    children,
    hoverBackground,
    hoverColor,
    rippleColor,
    rippleDuration,
    ...props
}) {
    return (
        <Button
            hoverBackground={hoverBackground}
            hoverColor={hoverColor}
            {...props}
        >
            {children}
            <Ripple color={rippleColor || '#e0e0e0'} duration={rippleDuration || 1000} />
        </Button>
    );
}
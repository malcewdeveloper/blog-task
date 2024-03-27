import React, { ButtonHTMLAttributes } from "react";
import styled, { css } from "styled-components";


interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode
    variant?: 'text' | 'outlined';
}

const StyledButton = styled.button<{variant?: 'text' | 'outlined'}>`
    ${(props) => {
        switch(props.variant) {
            case 'text':
                return css`
                    display: inline-flex;
                    align-items: center;
                    border: none;
                    background-color: transparent;
                    color: #4F4F4F;
                    cursor: pointer;
                    line-height: 18.75px;
                `
            case 'outlined':
                return css`
                    display: flex;
                    align-items: center;
                    border: 2px solid #0A0A0A;
                    border-radius: 60px;
                    background-color: transparent;
                    color: #0A0A0A;
                    cursor: pointer;
                    line-height: 18.75px;
                    padding: 14px 24px 12px;
                    max-height: 45px;
                `
        }
    }} 
`

const StyledStartIcon = styled.span`
    margin-right: 8px;
`

const StyledEndIcon = styled.span`
    margin-left: 8px;
`

const Button: React.FC<IButtonProps> = (props) => {
    const {
        children,
        color,
        startIcon,
        endIcon,
        variant='outlined',
        ...other
    } = props;

    return (
        <StyledButton
        color={ color }
        variant={ variant }
        {...other}>
            { startIcon && <StyledStartIcon>{ startIcon }</StyledStartIcon> }
            { children }
            { endIcon && <StyledEndIcon>{ endIcon }</StyledEndIcon> }
        </StyledButton>
    )
}

export default Button;
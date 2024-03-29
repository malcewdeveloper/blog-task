import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";


interface IInputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    startIcon?: React.ReactNode;
}

const StyledRootInputSearch = styled.div`
    position: relative;
`; 

const StyledInputSearch = styled.input`
    height: 48px;
    width: 100%;
    border: 1px solid #919EAB52;
    border-radius: 6px;
    box-sizing: border-box;
    padding-left: 45px;
    &::-webkit-input-placeholder {
        color: #333333;
    };
    &:-moz-placeholder {
        color: #333333;
    };
    &::-moz-placeholder {
        color: #333333;
    };
    &:-ms-input-placeholder {
        color: #333333;
    }
`;

const StyledInputSearchIcon = styled.span`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
`

const InputSearch: React.FC<IInputSearchProps> = (props) => {
    const {
        type,
        placeholder,
        startIcon,
        id,
        name,
        value,
        onChange,
        ...other
    } = props;

    return (
        <StyledRootInputSearch { ...other }>
            { startIcon && <StyledInputSearchIcon>{ startIcon }</StyledInputSearchIcon> }
            <StyledInputSearch type={ type } value={ value } placeholder={ placeholder } id={ id } name={ name } onChange={ onChange } />
        </StyledRootInputSearch>
    )
}

export default InputSearch;
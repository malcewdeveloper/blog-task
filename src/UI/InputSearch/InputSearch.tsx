import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";


interface IInputSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    startIcon?: React.ReactNode;
}

const StyledRootInputSearch = styled.div`
    position: relative;
    border: 1px solid #919EAB52;
    width: 100%;
`; 

const StyledInputSearch = styled.input`
    width: 100%;
    height: 48px;
    border: none;
    padding: 0 12px;
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
    margin-top: 12px;
    margin-left: 14px;
    z-index: 1;
`

const InputSearch: React.FC<IInputSearchProps> = (props) => {
    const {
        type,
        placeholder,
        startIcon,
        id,
        name,
        onChange,
        ...other
    } = props;

    return (
        <StyledRootInputSearch { ...other }>
            { startIcon && <StyledInputSearchIcon>{ startIcon }</StyledInputSearchIcon> }
            <StyledInputSearch type={ type } placeholder={ placeholder } id={ id } name={ name } onChange={ onChange } />
        </StyledRootInputSearch>
    )
}

export default InputSearch;
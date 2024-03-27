import React, { HTMLAttributes } from "react";
import { Button } from "../../UI";
import styled from "styled-components";


interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    header?: React.ReactNode;
    actions?: React.ReactNode;
    description?: string;
    fullwidth?: boolean;
}

const StyledCard = styled.article<{fullwidth?: boolean}>`
    background-color: #F4F4F4;
    border-radius: 12px;
    max-width: ${props => props.fullwidth ? '100%' : '558px'};
    width: 100%;
    overflow: hidden;
    box-shadow: 0px 10px 20px 0px #0000000A;
`

const StyledImageWrapper = styled.div`
    position: relative;
    width: 100%;
    padding-bottom: 50%;
`

const StyledImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
`

const StyledContentWrapper = styled.div`
    padding: 24px 16px 32px;
`

const StyledTitle = styled.h3`
    font-size: 28px;
    margin: 0 0 24px;
`

const StyledDescription = styled.p`
    font-size: 24px;
    margin-top: 32px;
`

const StyledActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Card: React.FC<ICardProps> = (props) => {
    const { 
        header,
        actions,
        description,
        fullwidth
    } = props;

    return (
        <StyledCard fullwidth={ fullwidth }>
            <StyledImageWrapper>
                <StyledImage src="https://placehold.co/1200x600" />
            </StyledImageWrapper>
            <StyledContentWrapper>
                {header && <StyledTitle>{ header }</StyledTitle>}
                {description && <StyledDescription>{ description }</StyledDescription>}
                <StyledActions>
                    {actions && actions}
                    <Button style={{ marginLeft: 'auto' }} variant='outlined'>Читать далее</Button>
                </StyledActions>
            </StyledContentWrapper>
        </StyledCard>
    )
}

export default Card;
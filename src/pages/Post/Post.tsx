import React from "react";
import { Button } from "../../UI";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiLike, BiDislike } from "react-icons/bi";
import styled from "styled-components";


const Container = styled.section`
    max-width: 1200px;
    padding: 0 30px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 48px;
    margin-bottom: 32px;
`
const Title = styled.h1`
    text-align: center;
    font-size: 40px;
    margin: 0;
    margin-bottom: 48px;
`

const ContentWrapper = styled.div`
    max-width: 848px;
`

const Image = styled.img`
    width: 100%;
    margin-bottom: 48px;
`

const Typography = styled.p`
    font-size: 18px;
    line-height: 26px;
    margin: 0;
`


export default function Post() {
    return (
        <Container>
            <Wrapper>
                <Button style={{ fontSize: '24px' }} startIcon={ <FaArrowLeftLong size={ 18 } /> } variant='text'>Вернуться к статьям</Button>
                <div>
                    <Button variant='text' startIcon={<BiLike size={ 24 } />}>100</Button>
                    <Button variant='text' startIcon={ <BiDislike size={ 24 } /> }>100</Button>
                </div>
            </Wrapper>
            <Wrapper style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Title>Что нужно знать об эффективной интернет-рекламе?</Title>
                <ContentWrapper style={{ maxWidth: '848px' }}>
                    <Image src="https://placehold.co/1200x600" />
                    <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta earum velit, molestiae sunt facilis quam placeat eius repudiandae ab ipsam repellat, consequatur asperiores error officiis, sit quis itaque quia dicta!</Typography>
                </ContentWrapper>
            </Wrapper>
        </Container>
    )
}
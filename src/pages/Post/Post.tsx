import React from "react";
import { Button } from "../../UI";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { fetchPostById } from "../../redux/slices/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { like, dislike } from "../../redux/slices/posts/postsSlice";
import { useParams } from "react-router-dom";
import styled from "styled-components";


const Container = styled.section`
    max-width: 1200px;
    padding: 0 30px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
`

const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 48px;
    margin-bottom: 32px;

`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { entities, loading } = useAppSelector(store => store.posts);

    if(!id) return <h1>404 Not Found</h1>

    React.useEffect(() => {
        dispatch(fetchPostById(id))
    }, []);

    return (
        <Container>
            <HeaderWrapper>
                <Button style={{ fontSize: '24px' }} startIcon={ <FaArrowLeftLong size={ 18 } /> } variant='text'>Вернуться к статьям</Button>
                <div>
                    {loading === 'pending' ? 'Загрузка' : <Button onClick={() => dispatch(like(entities[0]?.id))} variant='text' startIcon={entities[0]?.liked ? <BiSolidLike color="#219653" size={ 24 } /> : <BiSolidLike color="#3A35418A" size={ 24 } />}>{entities[0]?.likes}</Button>}
                    {loading === 'pending' ? 'Загрузка' : <Button onClick={() => dispatch(dislike(entities[0]?.id))} variant='text' startIcon={entities[0]?.disliked ? <BiSolidDislike size={ 24 } color="#EB5757" /> : <BiSolidDislike size={ 24 } color="#3A35418A" /> }>{entities[0]?.dislikes}</Button>}
                </div>
            </HeaderWrapper>
            <Wrapper>
                {loading === 'pending' ? 'Загрузка' : <Title>{ entities[0]?.title }</Title>}
                <ContentWrapper>
                    <Image src="https://placehold.co/1200x600" />
                    {loading === 'pending' ? 'Загрузка' : <Typography>{ entities[0]?.body }</Typography>}
                </ContentWrapper>
            </Wrapper>
        </Container>
    )
}
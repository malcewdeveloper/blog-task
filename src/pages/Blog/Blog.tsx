import React from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { Card } from "../../components";
import { Button, InputSearch } from "../../UI";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPosts } from "../../redux/slices/posts/postsSlice";
import { like, dislike } from "../../redux/slices/posts/postsSlice";


const Container = styled.section`
    max-width: 1200px;
    padding: 0 30px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
`

const Title = styled.h1`
    font-size: 60px;
    text-align: center;
    margin-bottom: 24px;
    margin-top: 64px;
`
const Typography = styled.p`
    font-size: 24px;
    line-height: 32px;
`

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(48%, 1fr));
    gap: 24px;
    margin-top: 24px;
    margin-bottom: 64px;
`


export default function Blog() {
    const dispatch = useAppDispatch();
    const { entities, loading } = useAppSelector(state => state.posts);
    const [searchParams, setSearchParams] = useSearchParams();
    const [seatchValue, setSearchValue] = React.useState(searchParams.get('title') || '');   
    const [searchTimer, setSearchTimer] = React.useState<NodeJS.Timeout | null>(null); 

    React.useEffect(() => {
        const titleParams = searchParams.get('title');

        if(titleParams) { dispatch(fetchPosts(`_limit=5&title=${titleParams}`)) }
        else dispatch(fetchPosts('_limit=5'))

        return () => searchTimer ? clearTimeout(searchTimer) : undefined
    }, [searchParams])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);

        searchTimer && clearTimeout(searchTimer);
        
        const timer = setTimeout(() => {
            e.target.value === '' ? setSearchParams() : setSearchParams({title: e.target.value})
        }, 500);
        setSearchTimer(timer)
    }   

    return (
        <Container>
            <Title>Блог</Title>
            <Typography>Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а также переводим зарубежные статьи</Typography>
            <InputSearch onChange={(e) => handleSearch(e) } value={ seatchValue } startIcon={ <IoSearch size={ 24 } /> } id="search" name="search" placeholder="Поиск по названию статьи" style={{ marginBottom: '32px' }} />
            {loading === 'idle' ? 
            entities.slice(0, 1).map(post => 
            <Card 
            key={ post.id }
            fullwidth
            description={ post.body }
            header={
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                    <h3 style={{ fontSize: '28px' }}>{ post.title }</h3>
                    <div>
                        <Button onClick={() => dispatch(like(post.id))} variant='text' startIcon={post.liked ? <BiSolidLike color="#219653" size={ 24 } /> : <BiSolidLike color="#3A35418A" size={ 24 } />}>{ post.likes }</Button>
                        <Button onClick={() => dispatch(dislike(post.id))} variant='text' startIcon={post.disliked ? <BiSolidDislike size={ 24 } color="#EB5757" /> : <BiSolidDislike size={ 24 } color="#3A35418A" /> }>{ post.dislikes }</Button>
                    </div>
                </div>
            } />) :
            'Loading...'}
            <Wrapper>
                {loading === 'idle' ? 
                entities.slice(1).map(post => 
                <Card 
                key={ post.id }
                header={ post.title }
                actions={
                    <div>
                        <Button onClick={() => dispatch(like(post.id))} variant='text' startIcon={post.liked ? <BiSolidLike color="#219653" size={ 24 } /> : <BiSolidLike color="#3A35418A" size={ 24 } />}>{ post.likes }</Button>
                        <Button onClick={() => dispatch(dislike(post.id))} variant='text' startIcon={post.disliked ? <BiSolidDislike size={ 24 } color="#EB5757" /> : <BiSolidDislike size={ 24 } color="#3A35418A" /> }>{ post.dislikes }</Button>
                    </div>
                }/>) :
                'Loading...'}
            </Wrapper>
        </Container>
    )
}
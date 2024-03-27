import React from "react";
import styled from "styled-components";
import { Card } from "../../components";
import { Button, InputSearch } from "../../UI";
import { BiLike, BiDislike } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import { IPost } from "../../interfaces";


const Container = styled.section`
    max-width: 1200px;
    padding: 0 30px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
`

export default function Blog() {
    const [posts, setPosts] = React.useState<IPost[] | null>(null);

    React.useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
            const posts = await response.json();
            setPosts(posts)
        }

        fetchPosts()
    }, []);

    return (
        <main>
            <Container>
                <h1 style={{ fontSize: '60px', textAlign: 'center', marginBottom: '24px', marginTop: '64px' }}>Блог</h1>
                <p style={{ fontSize: '24px', lineHeight: '32px' }}>Здесь мы делимся интересными кейсами из наших проектов, пишем про IT, а также переводим зарубежные статьи</p>
                <InputSearch startIcon={ <IoSearch size={ 24 } /> } id="search" name="search" placeholder="Поиск по названию статьи" style={{ marginBottom: '32px' }} />
                {posts ? 
                posts.slice(0, 1).map(post => 
                <Card 
                key={ post.id }
                fullwidth
                description={ post.body }
                header={
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: '28px' }}>{ post.title }</h3>
                        <div>
                            <Button variant='text' startIcon={<BiLike size={ 24 } />}>100</Button>
                            <Button variant='text' startIcon={ <BiDislike size={ 24 } /> }>100</Button>
                        </div>
                    </div>
                } />) :
                'Loading...'}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))', gap: '24px', marginTop: '24px', marginBottom: '64px'}}>
                    {posts ? 
                    posts.slice(1).map(post => 
                    <Card 
                    key={ post.id }
                    header={ post.title }
                    actions={
                        <div>
                            <Button variant='text' startIcon={<BiLike size={ 24 } />}>100</Button>
                            <Button variant='text' startIcon={ <BiDislike size={ 24 } /> }>100</Button>
                        </div>
                    }/>) :
                    'Loading...'}
                </div>

            </Container>
        </main>
    )
}
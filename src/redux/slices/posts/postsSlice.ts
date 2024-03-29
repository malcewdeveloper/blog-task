import { IPost } from "../../../interfaces";
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit'

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

interface PostsState {
    entities: IPost[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
    entities: [],
    loading:'idle'
} satisfies PostsState as PostsState;

export const postsSlice = createAppSlice({
    name: 'posts',
    initialState,
    reducers: (create) => ({
        like: create.reducer<number>((state, actions) => {
            state.entities = state.entities.map(entity => (
              entity.id === actions.payload ? 
              {
                ...entity,
                likes: !entity.liked ? ++entity.likes : entity.likes,
                liked: true,
                dislikes: entity.disliked ? --entity.dislikes : entity.dislikes,
                disliked: entity.disliked ? !entity.disliked : entity.disliked
              } : 
              { ...entity }
            ))
        }),
        dislike: create.reducer<number>((state, actions) => {
            state.entities = state.entities.map(entity => (
              entity.id === actions.payload ? {
                ...entity,
                dislikes: !entity.disliked ? ++entity.dislikes : entity.dislikes,
                disliked: true,
                likes: entity.liked ? --entity.likes : entity.likes,
                liked: entity.liked ? !entity.liked : entity.liked
              } :
              { ...entity }
            ))
        }),
        fetchPosts: create.asyncThunk(
            async (params?: string) => {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${params}`);
                const posts = await response.json() as IPost[];
                return posts.reduce((acc, post) => [...acc, {...post, liked: false, disliked: false, likes: Math.floor(Math.random() * 50), dislikes: Math.floor(Math.random() * 50)}], [] as IPost[]);
            },
            {
              pending: (state) => {
                state.loading = 'pending'
              },
              rejected: (state, action) => {
                state.loading = 'failed'
              },
              fulfilled: (state, action) => {
                state.loading = 'idle'
                state.entities = action.payload.map(post => {
                  const findPost = state.entities.find(entity => entity.id === post.id);
                  return findPost ? { ...post, ...findPost } : post
                })
              },
            }
        ),
        fetchPostById: create.asyncThunk(
            async (id: string) => {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${id}`);
                const posts = await response.json() as IPost[];
                return { ...posts[0], liked: false, disliked: false, likes: Math.floor(Math.random() * 50), dislikes: Math.floor(Math.random() * 50) };
            },
            {
                pending: (state) => {
                  state.loading = 'pending'
                },
                rejected: (state, action) => {
                  state.loading = 'failed'
                },
                fulfilled: (state, action) => {
                  state.loading = 'idle'
                  state.entities.length > 0 ? state.entities.filter(entity => entity.id === action.payload.id) : state.entities.push(action.payload);
                },
            }
        )
    })
});

export const { like, dislike, fetchPosts, fetchPostById } = postsSlice.actions;
export default postsSlice.reducer;


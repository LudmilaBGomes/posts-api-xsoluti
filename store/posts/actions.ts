import { PostsActionTypes } from './types';
import { Post } from './types';

export const fetchPostsRequest = () => ({
  type: PostsActionTypes.FETCH_POSTS_REQUEST,
});

export const fetchPostByIdRequest = (id: number) => ({
  type: PostsActionTypes.FETCH_POST_BY_ID_REQUEST,
  payload: id,
});

export const createPostRequest = (post: Omit<Post, 'id'>) => ({
  type: PostsActionTypes.CREATE_POST_REQUEST,
  payload: post,
});

export const updatePostRequest = (id: number, post: Omit<Post, 'id'>) => ({
  type: PostsActionTypes.UPDATE_POST_REQUEST,
  payload: { id, post },
});

export const deletePostRequest = (id: number) => ({
  type: PostsActionTypes.DELETE_POST_REQUEST,
  payload: id,
});

import { call, put, takeLatest } from 'redux-saga/effects';
import { getPosts, getPostsById, createPost, updatePost, deletePost } from '@/services/postsApi';
import { PostsActionTypes } from './types';

function* fetchPostsSaga(): Generator {
  try {
    const posts = yield call(getPosts);
    yield put({ type: PostsActionTypes.FETCH_POSTS_SUCCESS, payload: posts });

  } catch (error: any) {

    yield put({type: PostsActionTypes.FETCH_POSTS_FAILURE, payload: error.message});
  }
}

function* fetchPostByIdSaga(action: any): Generator {
  try {
    const post = yield call(getPostsById, action.payload);
    yield put({type: PostsActionTypes.FETCH_POST_BY_ID_SUCCESS, payload: post});

  } catch (error: any) {

    yield put({type: PostsActionTypes.FETCH_POST_BY_ID_FAILURE, payload: error.message});
  }
}

function* createPostSaga(action: any): Generator {
  try {
    const post = yield call(createPost, action.payload);
    yield put({type: PostsActionTypes.CREATE_POST_SUCCESS, payload: post});

  } catch (error: any) {

    yield put({type: PostsActionTypes.CREATE_POST_FAILURE, payload: error.message});
  }
}

function* updatePostSaga(action: any): Generator {
  try {
    const post = yield call(updatePost, action.payload.id, action.payload.post);
    yield put({type: PostsActionTypes.UPDATE_POST_SUCCESS, payload: post });
    
  } catch (error: any) {
    yield put({type: PostsActionTypes.UPDATE_POST_FAILURE, payload: error.message});
  }
}

function* deletePostSaga(action: any) {
  try {
    yield call(deletePost, action.payload);
    yield put({type: PostsActionTypes.DELETE_POST_SUCCESS, payload: action.payload});
    
  } catch (error: any) {
    yield put({type: PostsActionTypes.DELETE_POST_FAILURE, payload: error.message});

  }
}

export function* postsSaga() {
  yield takeLatest(PostsActionTypes.FETCH_POSTS_REQUEST, fetchPostsSaga);
  yield takeLatest(PostsActionTypes.FETCH_POST_BY_ID_REQUEST, fetchPostByIdSaga);
  yield takeLatest(PostsActionTypes.CREATE_POST_REQUEST, createPostSaga);
  yield takeLatest(PostsActionTypes.UPDATE_POST_REQUEST, updatePostSaga);
  yield takeLatest(PostsActionTypes.DELETE_POST_REQUEST, deletePostSaga);
}

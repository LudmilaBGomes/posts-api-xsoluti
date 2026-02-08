import { PostsState, PostsActionTypes } from './types';

const initialState: PostsState = {
  list: [],
  currentPost: null,
  loading: false,
  error: null,
};

export function postsReducer(state = initialState, action: any): PostsState {
    
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS_REQUEST:
    case PostsActionTypes.FETCH_POST_BY_ID_REQUEST:
    case PostsActionTypes.CREATE_POST_REQUEST:
    case PostsActionTypes.UPDATE_POST_REQUEST:
    case PostsActionTypes.DELETE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case PostsActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };

    case PostsActionTypes.FETCH_POST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentPost: action.payload,
      };

    case PostsActionTypes.CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: [...state.list, action.payload],
      };

    case PostsActionTypes.UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.map(post =>
          post.id === action.payload.id ? action.payload : post
        ),
        currentPost: action.payload,
      };

    case PostsActionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        list: state.list.filter(post => post.id !== action.payload),
      };

    case PostsActionTypes.FETCH_POSTS_FAILURE:
    case PostsActionTypes.FETCH_POST_BY_ID_FAILURE:
    case PostsActionTypes.CREATE_POST_FAILURE:
    case PostsActionTypes.UPDATE_POST_FAILURE:
    case PostsActionTypes.DELETE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

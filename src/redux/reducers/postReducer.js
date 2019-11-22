import { FETCH_POSTS, NEW_POST, FETCH_POSTS_ERROR, FETCH_POSTS_ERROR_RESET } from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            }
        case NEW_POST:
            return {
                ...state,
                // item: action.payload
                items: [action.payload,...state.items]
            }
        case FETCH_POSTS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case FETCH_POSTS_ERROR_RESET:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
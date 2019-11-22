import { FETCH_POSTS, NEW_POST,FETCH_POSTS_ERROR, FETCH_POSTS_ERROR_RESET } from './types';
import axios from 'axios';

export const fetchPosts = () => dispatch => {
    console.log('fetching');
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.data)
        .then(posts => dispatch({
            type: FETCH_POSTS,
            payload: posts
        }))
        .catch((error) => {
          console.log('catch',error);
          const err = {
            title: error.message,
            msg: "Unable to get Post"
          }
          return dispatch({
            type: FETCH_POSTS_ERROR,
            payload: err
          })
        });
}

export const createPost = (postData) => dispatch => {

    axios.post('https://jsonplaceholder.typicode.com/posts', 
        postData
      ).then((post)=>dispatch({
        type: NEW_POST,
        payload: post.data
    })).catch((error) => {
      console.log('catch',error);
      const err = {
        title: error.message,
        msg: "Unable to add post"
      }
      return dispatch({
        type: FETCH_POSTS_ERROR,
        payload: err
      })
    });
 
}

export const resetError = () => dispatch => {
  return dispatch({
    type: FETCH_POSTS_ERROR_RESET
  })
}
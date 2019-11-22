import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, resetError } from '../../redux/actions/postActions';
import PropTypes from 'prop-types';

class Posts extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  componentWillUnmount() {
    this.props.resetError();
  }

  checkError() {
    if(this.props.error) {
      this.props.onError(this.props.error.title,this.props.error.msg);
    }
  }

  componentDidUpdate() {
    this.checkError();
  }

  render() {
    
    const postItems = this.props.posts.map((post)=>(
      <div key={ post.id }>
      <h3>{ post.title }</h3>
      <p>{ post.body }</p></div>
    ))
    return (
      <div className="container">
        <h1>Posts</h1>
        {postItems}
      </div>
    )
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  error: PropTypes.object
}

const mapStateToProps = state => {
  return {
  posts: state.posts.items,
  error: state.posts.error
}};

export default connect(mapStateToProps, { fetchPosts, resetError })(Posts);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase';

class ChatPage extends Component {
  INITIAL_STATE = {
    message: '',
  }

  state = {
    ...this.INITIAL_STATE
  };

  initialize = () => {
    this.setState(...this.INITIAL_STATE);
  }

  handleChange = event => {
    this.setState({ message: event.target.value });
  }

  handleClick() {
    db.clearPosts();
  }

  componentDidMount() {
    const { onSetPosts } = this.props;
    db.onceGetPosts().then(snapshot =>
      onSetPosts(snapshot.val())
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const id = Date.now();
    const name = this.props.authUser.displayName;
    const message = this.state.message;
    this.setState({ message: '' });
    db.MessagePost(id, name, message);
  }

  render() {
    const { authUser, posts } = this.props;
    const { message } = this.state;

    return (
      <div>
      <h1>Chat</h1>
      <h2>Account: {authUser.displayName}</h2>
      <p>The Chat Page.</p>

      <button onClick={() => this.handleClick()}>clear posts</button>

      <PostList posts={posts} />

      <form onSubmit={this.handleSubmit}>
      <input 
      type='text'
      onChange={event => this.handleChange(event)}
      placeholder='message...'
      />
      <button type='submit'>Submit</button>
      </form>
      </div>
    );
  }
}

const PostList = ({ posts }) => (
  <div>
  <h2>List of Posts</h2>
  
  {Object.keys(posts).map(key =>
    <div key={key}>{posts[key].name}: {posts[key].message}</div>
  )}
  </div>
)

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  posts: state.chatState.posts,
});

const mapDispatchToProps = (dispatch) => ({
  onSetPosts: (posts) => dispatch({ type: 'POSTS_SET', posts }),
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)
)(ChatPage);

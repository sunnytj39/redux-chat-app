import React, { Component } from 'react';
import { connect } from 'react-redux';

import { db } from '../../firebase';

class ChatPage extends Component {
  componentDidMount() {
    const { onSetPosts } = this.props;

    //db.onceGetPosts().then(snapshot =>
    //  onSetPosts(snapshot.val())
    //);
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <h1>Chat</h1>
        <p>The Chat Page.</p>

        <PostList posts={posts} />
      </div>
    );
  }
}

const PostList = ({ posts }) =>
  <div>
    <h2>List of Posts</h2>

    {Object.keys(posts).map(key =>
      <div key={key}>{posts[key].name}: {posts[key].message}</div>
    )}
  </div>

const mapStateToProps = (state) => ({
  posts: state.chatState.posts,
});

const mapDispatchToProps = (dispatch) => ({
  onSetPosts: (posts) => dispatch({ type: 'POSTS_SET', posts }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);

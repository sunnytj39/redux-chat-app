const initialState = {
  posts: {},
};

const applySetPosts = (state, action) => ({
  ...state,
  posts:  action.posts
});

const updateList = (state, action) => ({
  ...state,
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case "POSTS_SET": {
      return applySetPosts(state, action);
    }
    case "UPDATE": {
      return updateList(state, action);
    }
    default:
      return state;
  }
}

export default chatReducer;

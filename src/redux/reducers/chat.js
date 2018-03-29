const initialState = {
  posts: [{ name:'Miko', message:'hello', id:0 },
          { name:'Ken',  message:'hi',    id:1 }]
};

const applySetPosts = (state, action) => ({
  ...state,
  posts: action.posts
});

function chatReducer(state = initialState, action) {
  switch (action.type) {
    case "POSTS_SET": {
      return applySetPosts(state, action);
    }
    default:
      return state;
  }
}

export default chatReducer;

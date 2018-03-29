const initialState = {
  users: {}
};

const applySetUsers = (state, action) => ({
  ...state,
  users: action.users
});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "USERS_SET": {
      return applySetUsers(state, action);
    }
    default:
      return state;
  }
}

export default userReducer;

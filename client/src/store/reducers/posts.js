const initialState = {
  posts: [],
  total: null,
  isLoading: false,
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case "SET_POSTS": {
      return {
        ...state,
        posts: action.payload,
      };
    }

    case "SET_TOTAL": {
      return {
        ...state,
        total: action.payload,
      };
    }

    case "SET_POSTS_IS_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default:
      return state;
  }
}

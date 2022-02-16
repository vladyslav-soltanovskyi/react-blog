const initialState = {
  comments: [],
  isLoading: false,
  total: null,
};

export default function comments(state = initialState, action) {
  switch (action.type) {
    case "SET_COMMENTS": {
      return {
        ...state,
        comments: action.payload,
      };
    }

    case "CLEAR_COMMENTS": {
      return {
        ...state,
        comments: [],
      };
    }

    case "ADD_COMMENT": {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    }

    case "DELETE_COMMENT": {
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    }

    case "EDIT_COMMENT": {
      const { id, text } = action.payload;
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment._id === id ? { ...comment, text } : comment
        ),
      };
    }

    case "SET_TOTAL": {
      return {
        ...state,
        total: action.payload,
      };
    }

    case "SET_COMMENTS_IS_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default:
      return state;
  }
}

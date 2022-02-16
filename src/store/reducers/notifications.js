const initialState = [];

export default function notifications(state = initialState, action) {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      return [...state, action.payload];
    }

    case "REMOVE_NOTIFICATION": {
      return state.filter(
        (notification) => notification.key !== action.payload
      );
    }

    default:
      return state;
  }
}

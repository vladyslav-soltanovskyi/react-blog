import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import notifications from "./reducers/notifications";
import posts from "./reducers/posts";
import comments from "./reducers/comments";

const rootRedcuer = combineReducers({
  notifications,
  posts,
  comments,
});

const store = createStore(
  rootRedcuer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;

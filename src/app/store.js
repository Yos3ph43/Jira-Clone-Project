import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import loginReducer from "features/Login/redux/loginSlice";
import projectReducer from "features/ProjectManage/redux/projectManageSlice";

const reducer = combineReducers({
  user: loginReducer,
  project: projectReducer,
  // task: taskReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

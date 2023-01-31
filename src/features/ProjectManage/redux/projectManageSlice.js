import produce from "immer";
import actions from "./type";

const initialState = {
  allProject: null,
  projectDetail: null,
  taskDetail: null,
  searchUser: [],
  // userByProject: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actions.SET_ALL_PROJECT:
        draft.allProject = payload;
        break;
      case actions.SET_PROJECT_DETAIL:
        draft.projectDetail = payload;
        break;
      case actions.SET_TASK_DETAIL:
        draft.taskDetail = payload;
        break;
      case actions.SET_SEARCH_USER:
        draft.searchUser = payload;
        break;
      // case actions.SET_USER_BY_PROJECT:
      //   draft.userByProject = payload;
      //   break;

      default:
        break;
    }
  });

export default reducer;

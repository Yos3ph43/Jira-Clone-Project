import produce from "immer";
import actions from "./type";

const initialState = {
  allProject: null,
  projectDetail: null,
  taskDetail: null,
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

      default:
        break;
    }
  });

export default reducer;

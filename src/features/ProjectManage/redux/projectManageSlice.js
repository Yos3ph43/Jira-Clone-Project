import produce from "immer";
import actions from "./type";

const initialState = {
  allProject: [],
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actions.SET_ALL_PROJECT:
        draft.allProject = payload;
        break;

      default:
        break;
    }
  });

export default reducer;

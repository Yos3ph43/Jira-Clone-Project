import produce from "immer";
import actions from "./type";

const initialState = {
  allProject: null,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actions.SET_ALL_PROJECT:
        draft.profile = payload;
        break;

      default:
        break;
    }
  });

export default reducer;

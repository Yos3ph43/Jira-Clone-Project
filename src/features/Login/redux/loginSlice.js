import produce from "immer";
import actions from "./type";

let user = {};
if (localStorage.getItem("user"))
  user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  profile: user,
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case actions.SET_PROFILE:
        draft.profile = payload;
        break;

      default:
        break;
    }
  });

export default reducer;

import requestor from "app/api";
import { apiPath } from "app/apiPath";
import actions from "./type";
import actionsLogin from "features/Login/redux/type";

export const fetchAllProject = async (next) => {
  try {
    const res = await requestor({ method: "GET", url: apiPath.ALL_PROJECT });
    console.log(res);
    next({ type: actions.SET_ALL_PROJECT, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserProfileAction = (data) => async (next) => {
  try {
    const res = await requestor({
      method: "PUT",
      url: apiPath.UPDATE_USER,
      data,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    if (error.response) alert(error.response.data.message);

    throw error;
  }
};

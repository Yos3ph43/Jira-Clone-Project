import requestor from "app/api";
import { apiPath } from "app/apiPath";
import actions from "./type";
export const fetchAllProject = async (next) => {
  try {
    const res = await requestor({ method: "GET", url: apiPath.ALL_PROJECT });
    console.log(res);
    next({ type: actions.SET_ALL_PROJECT, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

import requestor from "app/api";
import { apiPath } from "app/apiPath";
import actions from "./type";

export const fetchAllProject = () => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      url: apiPath.ALL_PROJECT,
    });
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

export const fetchProjectDetail = (id) => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      url: apiPath.PROJECT_DETAIL,
      params: { id },
    });
    console.log(res);
    next({ type: actions.SET_PROJECT_DETAIL, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};

export const updateProjectDetail = (projectId, data) => async () => {
  try {
    await requestor({
      method: "PUT",
      url: apiPath.UPDATE_PROJECT,
      data,
      params: { projectId },
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteProject = (projectId) => async () => {
  try {
    const res = await requestor({
      method: "DELETE",
      url: apiPath.DELETE_PROJECT,
      params: { projectId },
    });
    alert("Xóa project thành công");
    console.log(res);
  } catch (error) {
    throw alert(error.response.data.content);
  }
};

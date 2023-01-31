import { RedditSquareFilled } from "@ant-design/icons";
import requestor from "app/api";
import { apiPath } from "app/apiPath";
import actions from "./type";

//USER
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
// export const fetchUserByProject = (idProject) => async (next) => {
//   try {
//     const res = await requestor({
//       method: "GET",
//       url: apiPath.USER_BY_PROJECT,
//       params: { idProject },
//     });
//     console.log(res);
//     next({
//       type: actions.SET_USER_BY_PROJECT,
//       payload: res.data.content,
//     });
//   } catch (error) {
//     console.log(error);
//     if (error.response) alert(error.response.data.message);
//     throw error;
//   }
// };

//PROJECT
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

export const createProject = (data) => async () => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.CREATE_PROJECT,
      data,
    });
    alert("Thêm project thành công");
    console.log(res);
  } catch (error) {
    throw alert(error.response.data.content);
  }
};

// TASK
export const createTask = (data) => async () => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.CREATE_TASK,
      data,
    });
    alert("Thêm task thành công");
    console.log(res);
  } catch (error) {
    throw alert(error.response.data.content);
  }
};

export const fetchTaskDetail = (taskId) => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      url: apiPath.TASK_DETAIL,
      params: { taskId },
    });
    console.log(res);
    next({ type: actions.SET_TASK_DETAIL, payload: res.data.content });
  } catch (error) {
    console.log(error);
  }
};
//search user api
export const fetchSearchUser = (keyword) => async (next) => {
  try {
    const res = await requestor({
      method: "GET",
      url: apiPath.SEARCH_USER,
      params: { keyword },
    });
    next({ type: actions.SET_SEARCH_USER, payload: res.data.content });
    console.log(res.data.content);
  } catch (error) {
    console.log(error);
  }
};
//assign user api
export const assignUserAction = (data) => async () => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.ASSIGN_USER,
      data,
    });
    console.log(res);
    alert("Added the user to the project");
  } catch (error) {
    console.log(error);
    if (error.response) alert(error.response.data.content);
    throw error;
  }
};
//remove user from project
export const removeUserProject = (data) => async () => {
  if (!window.confirm("Remove this user?")) return;
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.REMOVE_USER_FROM_PROJECT,
      data,
    });
    console.log(res);
    alert("User removed");
  } catch (error) {
    console.log(error);
    if (error.response) alert(error.response.data.content);
    throw error;
  }
};

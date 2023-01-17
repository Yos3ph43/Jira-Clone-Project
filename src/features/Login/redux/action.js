import requestor from "app/api";
import { apiPath } from "app/apiPath";
import actions from "./type";

export const loginAction = (data) => async (next) => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.LOGIN,
      data,
    });
    console.log(res);
    next({ type: actions.SET_PROFILE, payload: res.data.content });
    localStorage.setItem("token", res.data.content.accessToken);
    localStorage.setItem("user", JSON.stringify(res.data.content));
  } catch (error) {
    console.log(error);

    if (error.response) alert(error.response.data.message);
    throw error;
  }
};
export const signupAction = (data) => async () => {
  try {
    const res = await requestor({
      method: "POST",
      url: apiPath.SIGNUP,
      data,
    });
    console.log(res);
    alert("Tạo tài khoản thành công.");
  } catch (error) {
    console.log(error);
    if (error.response) alert(error.response.data.message);
    throw error;
  }
};

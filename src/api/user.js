import axios from "@axios";

export const getToken = (data) =>
  axios.request({
    url: "api/Account/get_token",
    params: data,
    method: "get",
  });
// 获取验证码
export const getCode = ({ phone }) => {
  const data = { phone };
  return axios.request({
    url: "/api/Account/get_phone_code",
    params: data,
    method: "get",
  });
};
// 获取个人信息
export const getInfo = () => {
  axios.request({
    url: "api/Account/userinfo",
    method: "get",
  });
};

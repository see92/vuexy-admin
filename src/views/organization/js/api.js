import axios from "@axios";

// 获取组织信息列表
export const getAllorgInfo = (params) => {
  return axios.request({
    url: "api/Organization/get_allorginfo",
    method: "get",
    params,
  });
};

// 获取行业信息
export const getDicTree = () => {
  return axios.request({
    url: "api/Dictionary/get_dictionary_tree?code=IndustryClassification",
    method: "get",
  });
};

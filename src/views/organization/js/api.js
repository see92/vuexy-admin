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

// 获取省市区三级联动
// /api/Dictionary/get_regions
export const get_regions = () => {
  return axios.request({
    url: "api/Dictionary/get_regions",
    method: "get",
  });
};

// 获取集群列表
export const getClusterInfo = (params) => {
  return axios.request({
    url: "api/Cluster/get_global_cluster_info",
    method: "get",
    params,
  });
};

//通过手机号码搜索用户信息
export const getUserInfo = (params) => {
  return axios.request({
    url: "api/Organization/get_organizeuserbyphone",
    method: "get",
    params,
  });
};

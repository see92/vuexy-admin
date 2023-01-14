import axios from "@axios";

// 获取集群列表  api/Cluster/get_cluster_info
export const clusterList = (params) => {
  return axios.request({
    url: "api/Cluster/get_cluster_info",
    method: "get",
    params,
  });
};

// 更新集群信息
export const updateCluster = (data) => {
  return axios.request({
    url: "api/Cluster/update_cluster_server",
    method: "post",
    data,
  });
};

// 查询集群常规信息
export const getClusterInfo = (params) => {
  return axios.request({
    url: "api/Cluster/get_cluster_generalsetup",
    method: "get",
    params,
  });
};

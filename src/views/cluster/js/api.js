import axios from "@axios";

// 获取集群列表  api/Cluster/get_cluster_info
export const clusterList = (params) => {
  return axios.request({
    url: "api/Cluster/get_cluster_info",
    method: "get",
    params,
  });
};

import axios from "axios";

// 请求模拟数据
export const reqMockData = () =>
  axios.get("http://localhost:8080/mock/mock_data");

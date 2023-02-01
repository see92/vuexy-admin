const sizeOptions = [
  { key: 0, label: "0~50" },
  { key: 1, label: "51~200" },
  { key: 2, label: "201~500" },
  { key: 3, label: "501~1000" },
  { key: 4, label: "1000+" },
];

// 新增组织状态
const osOptions = [
  { key: 1, label: "基本信息通过" },
  { key: 2, label: "全部信息通过" },
];
// 修改组织状态
const editOsOptions = [
  { key: 0, label: "注册通过" },
  { key: 1, label: "基本信息通过" },
  { key: 2, label: "全部信息通过" },
];
const stateOptions = [
  { key: 0, label: "禁用" },
  { key: 1, label: "启用" },
];
const moduleOptions = [
  { key: 0, label: "模块1" },
  { key: 1, label: "模块2" },
  { key: 2, label: "模块3" },
  { key: 3, label: "模块4" },
];
const statusOptions = [
  { key: 0, label: "试用" },
  { key: 1, label: "正式" },
];
const cityOptions = [
  { key: 1, label: "北京", value: 1, disabled: false },
  { key: 2, label: "上海", value: 2, disabled: false },
  { key: 3, label: "广州", value: 3, disabled: false },
  { key: 4, label: "香港", value: 4, disabled: false },
  { key: 5, label: "重庆", value: 5, disabled: false },
  { key: 6, label: "成都", value: 6, disabled: false },
  { key: 7, label: "南京", value: 7, disabled: false },
];
export {
  sizeOptions,
  osOptions,
  editOsOptions,
  stateOptions,
  moduleOptions,
  statusOptions,
  cityOptions,
};

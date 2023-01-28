// 引入mock.js
const Mock = require("mockjs");
// 获取mock.Random 对象
const Random = Mock.Random;

// 模拟数据，包括标题、内容、创建时间
const data = function () {
  let dataList = [];
  for (let i = 0; i < 20; i++) {
    let dataObject = {
      cluster_name: Random.ctitle(3, 5),
      cluster_area: Random.natural(0, 10),
      create_time: Random.datetime(),
      cluster_state: Random.integer(0, 1),
      title: Random.ctitle(), //Random.ctitle(min,max) 随机产生一个中文标题，长度默认在3-7之间
      // content: Random.cparagraph(), //Random.cparagraph(min,max) 随机生成一个中文段落，段落里句子个数默认3-7个
      createdTime: Random.date(), //Random.date() 指定生成的日期字符串格式
      img: Random.image(), // 生成默认图片
      username: Random.cname(), //生成默认名字
    };
    dataList.push(dataObject);
  }
  return dataList;
};

// 请求该url，就可以返回dataList
Mock.mock("http://localhost:8080/mock/mock_data", data);

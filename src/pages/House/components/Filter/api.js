// 1- 创建接口
import request from '../../../../utils/http.js'
// 4- 导入getCity文件,获取本地存储的CityId信息
// 2- 引入基于http.js中的基本配置地址
export const getHousesCondition =(cityID)=>{
  // 3- 接口明确需要传入城市ID信息,根据ID信息进行进一步的数据渲染
  return request(`houses/condition?id=${cityID}`)
}

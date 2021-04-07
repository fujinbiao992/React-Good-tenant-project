
// ->>> 配置选择后的接口,拼装一个对象,声明形参,通过调用方法时,传递进来具体的实参即可
import request from '../../utils/http.js'
export const getHouses = ({ cityId, filters, start = 1, end = 20 }) => {
  return request(`/houses`, {
    params: {
      cityId: cityId,
      ...filters,
      start: start,
      end: end
    }
  })
}

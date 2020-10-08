import request from '../../utils/http.js'

// getCityList
export const getAreaCity = () => {
  return request(`/area/city?level=1`)
}
// getAreaHot
export const getAreaHot = () => {
  return request(`/area/hot`)
}

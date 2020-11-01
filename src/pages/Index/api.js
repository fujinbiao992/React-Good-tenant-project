import request from '../../utils/http.js'

// swiper
export const getSwiper = ()=>{
  return request(`/home/swiper`)
}
// homeGroup
export const getGroups = ()=>{
  return request(`home/groups?area=AREA%7C88cff55c-aaa4-e2e0`)
}
// getNews
export const getNews = ()=>{
  return request(`home/news?area=AREA%7C88cff55c-aaa4-e2e0`)
}
// getAreaInfo
export const getAreaInfo = cityName => {
  return request(`/area/info?name=${cityName}`)
}

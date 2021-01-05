// 抽离定位当前城市模块
import { getAreaInfo } from '../pages/Index/api.js'
// 导入
// import { getCity, setCity } from './city.js'
const getCurrCity = () => {
  const curr = JSON.parse(window.localStorage.getItem('hkzf_city'))
  if (!curr) {
    return new Promise(resolve => {
      const { AMap } = window
      AMap.plugin('AMap.CitySearch', () => {
        var citySearch = new AMap.CitySearch()
        citySearch.getLocalCity(async result => {
          const cityName = result.name
          const { data } = await getAreaInfo(cityName)
          if (data.status === 200) {
            // 暴露给外部城市信息
            // setCity(data.body)
            window.localStorage.setItem('hkzf_city', JSON.stringify(data.body))
            resolve(data.body)
          }
        })
      })
    })
  } else {
    // 直接return给外部
    return Promise.resolve(curr)
  }
}
export { getCurrCity }

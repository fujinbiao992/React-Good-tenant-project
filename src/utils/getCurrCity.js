// 抽离定位当前城市模块
import { getAreaInfo } from '../pages/Index/api.js'
// 导入
import { getCity, setCity } from './city.js'
const getCurrCity = () => {
  const curr = getCity()
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
            setCity(data.body)
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

export { getCurrCity, getCity, setCity }




















/**
 * export const getCurrCityName = () => {
  const { AMap } = window
  AMap.plugin('AMap.CitySearch', () => {
    var citySearch = new AMap.CitySearch()
    citySearch.getLocalCity((status, result) => {
      if (status === 'complete' && result.info === 'OK') {
        // 查询成功，result即为当前所在城市信息
        this.setState(() => {
          return { currCity: result.city }
        })
      }
    })
  })
}

 *
 *
 *
*/

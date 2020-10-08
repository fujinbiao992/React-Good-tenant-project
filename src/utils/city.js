// 本地存储城市信息的模块

const CITY_KEY = 'hkzf_city'

export const getCity = () => JSON.parse(window.localStorage.getItem(CITY_KEY))

export const setCity = city =>
  window.localStorage.setItem(CITY_KEY, JSON.stringify(city))

import React from 'react'
import './index.css'
class Map extends React.Component {
  componentDidMount () {
    const { AMap } = window
    const map = new AMap.Map('container', {
      resizeEnable: true, //是否监控地图容器尺寸变化
      zoom: 11, //初始化地图层级
      center: [116.397428, 39.90923], //初始化地图中心点
      viewMode:'3D'//使用3D视图
    })
    console.log(map)
  }
  render () {
    return <div className="map">
      <div id="container">
      </div>
    </div>
  }
}
export default Map

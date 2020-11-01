import React from 'react'
import { NavBar, Icon, Toast } from 'antd-mobile'
import { List, AutoSizer } from 'react-virtualized'

import { getAreaCity, getAreaHot } from './api.js'
import { getCurrCity, setCity } from '../../utils/getCurrCity'
import './index.scss'
// 创建热门城市数组
const hotCity = ['北京', '上海', '广州', '深圳']
class cityList extends React.Component {
  state = {
    cityList: {},
    cityIndex: [],
  }
  // 处理二次数据的方法
  formatCityDate = (list) => {
    let cityList = {}
    let cityIndex = []
    // 二次处理数据
    list.forEach(item => {
      // short这个属性,是数据中的属性,根据索引a,b,c的名称进行对应
      const letter = item.short.substr(0, 1)
      // 此处的in 也是判断的一种方式,如果返回true 那么就把最新的item存放到数组中,否则给定一个排序过的数组
      if (letter in cityList) {
        cityList[letter].push(item)
      } else {
        cityList[letter] = [item]
      }
    })
    // 处理返回数据中的index索引值,根据索引进行一个新数组的排序
    cityIndex = Object.keys(cityList).sort()
    return {
      cityList,
      cityIndex
    }
  }
  // 城市列表数据方法
  getAreaCity = async () => {
    const { data } = await getAreaCity()
    if (data.status === 200) {
      const { cityList, cityIndex } = this.formatCityDate(data.body)
      // 热门城市
      const { data: dataHot } = await getAreaHot()
      if (dataHot.status === 200) {
        // 添加到cityList列表中
        cityList['hot'] = dataHot.body
        cityIndex.unshift('hot')
        // 当前城市
        const currCity = await getCurrCity()
        // 把#号,添加到cityList列表中
        cityList['#'] = [currCity]
        cityIndex.unshift('#')
        this.setState(() => {
          return { cityList, cityIndex }
        }, () => {
          // console.log(this.state.cityIndex, this.state.cityList)
        })
      }
    }
  }
  // 钩子函数,加载方法使用
  componentDidMount () {
    this.getAreaCity()
  }
  // 行高配置函数
  rowRenderer = ({ key, index, style }) => {
    const { cityList, cityIndex } = this.state
    const letter = cityIndex[index]
    return (
      <div key={key} style={style} className="city">
        <div className="title">{letter}</div>
        {cityList[letter].map(item => (
          <div
            key={item.label}
            className="name"
            onClick={() => {
              // 将来整租/合租的数据和当前城市有关系->这里只有Hot的城市有数据
              if (hotCity.includes(item.label)) {
                // 1. 修改ls的数据
                setCity({ label: item.label, value: item.value })
                // 2. 回到首页
                this.props.history.goBack()
              } else {
                // 提示
                Toast.info('该城市暂无房源信息!!')
              }
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }
  // 计算行高函数
  calRowHeight = ({ index }) => {
    // 获取cityList/cityIndex,根据这两个的内容,来计算行高
    const { cityIndex, cityList } = this.state
    // 设计一个计算公式,这里的行高,取决于内容多少
    // 计算公式计算方式: 行高= 索引的高度+城市个数*城市高度
    return 36 + cityList[cityIndex[index]].length * 50
  }
  render () {
    const { cityIndex, cityList } = this.state
    return (
      // ! className的名字,和解构出来的名字一致,会导致列表数据渲染失败
      <div className="citylist">
        <NavBar
          className="navbar"
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >城市选择</NavBar>
        {/* 列表基础配置 */}
        {cityList.length !== 0 && (
          <AutoSizer>
            {({ height, width }) => {
              return (
                <List
                  width={width}
                  height={height}
                  rowCount={cityIndex.length}
                  rowHeight={this.calRowHeight}
                  rowRenderer={this.rowRenderer}
                />)
            }}
          </AutoSizer>
        )}
      </div>
    )
  }
}
export default cityList

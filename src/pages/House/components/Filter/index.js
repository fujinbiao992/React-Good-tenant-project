import React, { Component } from 'react'
import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import styles from './index.module.css'
import { getHousesCondition } from './api.js'
import { getCity } from '../../../../utils/city.js'
const { value = 'AREA|88cff55c-aaa4-e2e0' } = getCity()
// 创建高亮显示假数据
const titleSelectedStatus = {
  area: false,
  mode: true,
  price: false,
  more: false
}
// 创建选中默认值显假数据
const selectedValues = {
  area: ['area', 'null'],
  mode: ['null'],
  price: ['null'],
  more: []
}
export default class Filter extends Component {
  // 2- 更改为状态数据,将来执行点击操作时,根据状态数据,更改状态驱动变化就可以
  state = {
    titleSelectedStatus,
    selectedValues,
    openType: '',
    filterData: {},
  }
  // 发送请求
  loadGetHousesCondition = async () => {
    const { data } = await getHousesCondition(value)
    if (data.status === 200) {
      this.setState(() => {
        return {
          filterData: data.body
        }
      }, () => {
        // console.log(data)
      })
    }
  }
  // 使用生命钩子函数,发送请求接口方法
  componentDidMount () {
    this.loadGetHousesCondition()
  }
  // 创建方法-关闭FilterPicker组件
  onCancel = (key) => {
    const { titleSelectedStatus, selectedValues } = this.state
    const newTitleSelectedStatus = titleSelectedStatus
    const SelValues = selectedValues[key]
    if (key === 'area' && (SelValues.length === 3 || SelValues[0] !== 'area')) {
      newTitleSelectedStatus[key] = true
    } else if (key === 'mode' && SelValues[0] !== 'null') {
      newTitleSelectedStatus[key] = true
    } else if (key === 'price' && SelValues[0] !== 'null') {
      // newTitleSelectedStatus[key] = true
    } else if (key === 'more') {
      newTitleSelectedStatus[key] = true
    } else {
      newTitleSelectedStatus[key] = false
    }
    this.setState(() => {
      return {
        openType: ''
      }
    })
  }
  // 创建方法-确定关闭FilterPicker组件
  onSave = (key, value) => {
    const { titleSelectedStatus, selectedValues } = this.state
    const newTitleSelectedStatus = titleSelectedStatus
    const SelValues = value
    // 根据旧数据(未选中的数据)selectedValues,进行组装一个新的对象
    let newSelectedValues = { ...selectedValues, [key]: value }
    // 处理数据,是否高亮显示
    if (key === 'area' && (SelValues.length === 3 || SelValues[0] !== 'area')) {
      newTitleSelectedStatus[key] = true
    } else if (key === 'mode' && SelValues[0] !== 'null') {
      newTitleSelectedStatus[key] = true
    } else if (key === 'price' && SelValues[0] !== 'null') {
      // newTitleSelectedStatus[key] = true
    } else if (key === 'more') {
      newTitleSelectedStatus[key] = true
    } else {
      // 取消高亮
      newTitleSelectedStatus[key] = false
    }

    // 1- 获取已经选择好的值
    let filters = {}
    // 获取'区域'中的area属性
    let area = newSelectedValues['area']
    // 把area中的第一项,取出当做key
    let areaKey = area[0]
    let areaValue
    // 2- 区域/地铁
    //    2-1 判断有值的几种状态
    /**
     * 1- 根据area中的几种情况,进行判断
     * ! 2- 如果area中的第三个值,为null,那么把area中的第二项赋值
     * ! 3- 如果area中的第三个值,不为null,那么就把area中的第三个项赋值
     * 4- 如果等于subway那么进来判断条件
     * ! 5- 如果area中的第三个值,不等于null,那么将area中的第三项赋值
     *
     *
    */
    if (area.length === 3) {
      if (areaKey === 'area') {
        if (area[2] === 'null') {
          areaValue = area[1]
        }
        if (area[2] !== 'null') {
          areaValue = area[2]
        }
      }
      if (areaKey === 'subway') {
        if (area[2] !== 'null') {
          areaValue = area[2]
        }
      }
    }
    // 动态的添加一个Key值,用来保存最新选中的条件项
    filters[areaKey] = areaValue
    console.log(filters);
    // 3- 方式
    const mode = newSelectedValues.mode
    filters.rentType = mode[0]
    // 4- 租金
    const prices = newSelectedValues.price
    filters.price = prices[0]


    console.log(filters)
    this.setState(state => {
      return {
        openType: '',
        titleSelectedStatus: newTitleSelectedStatus,
        selectedValues: newSelectedValues
      }
    })
  }
  onTitleClick = (type) => {
    /**
     * 1- 点击标题,遍历标题高亮的数据
     * 2- 如果是当前标题,设置为高亮
     * 3- 如果有,保持高亮
     * 4- 如果没有,去掉高亮
    */
    const { titleSelectedStatus, selectedValues } = this.state
    const newTitleSelectedStatus = { ...titleSelectedStatus }
    Object.keys(newTitleSelectedStatus).forEach((key) => {
      const SelValues = selectedValues[key]
      if (key === type) {
        newTitleSelectedStatus[key] = true
      } else if (key === 'area' && (SelValues.length === 3 || SelValues[0] !== 'area')) {
        newTitleSelectedStatus[key] = true
      } else if (key === 'mode' && SelValues[0] !== 'null') {
        newTitleSelectedStatus[key] = true
      } else if (key === 'price' && SelValues[0] !== 'null') {
        // newTitleSelectedStatus[key] = true
      } else if (key === 'more') {
        newTitleSelectedStatus[key] = true
      } else {
        newTitleSelectedStatus[key] = false
      }
    })

    this.setState((state) => {
      return {
        // titleSelectedStatus中添加一个新的type: true值,从新赋值
        titleSelectedStatus: newTitleSelectedStatus,
        openType: type
      }
    })
  }
  renderFilterPicker = () => {
    const {
      openType,
      filterData: { area, subway, rentType, price },
      selectedValues
    } = this.state
    if (openType === 'mode' || openType === 'area' || openType === 'price') {
      // 1- 多级判断,根据area,mode,price来渲染对应的数据
      let data = []
      let cols = 3
      // 根据选中的,更换最新选中的数据
      const defaultSelectValues = selectedValues[openType]
      switch (openType) {
        case 'area':
          // 获取到区域数据
          data = [area, subway]
          cols = 3
          break
        case 'mode':
          data = rentType
          cols = 1
          break
        case 'price':
          data = price
          cols = 1
          break
        default:
          break
      }
      // 在FilterPicker组件中加入一个key属性,该属性会触发diff算法,进行比较,比较出来当前组件,和上次组件不一致,会重新展示当前最新的状态
      return (
        <FilterPicker
          key={openType}
          defaultSelectValues={defaultSelectValues}
          type={openType}
          data={data}
          cols={cols}
          onCancel={this.onCancel}
          onSave={this.onSave} />)
    } else {
      return null
    }
  }
  renderFilterMore = () => {
    const { openType, filterData: { characteristic, floor, oriented, roomType } } = this.state
    const data = { characteristic, floor, oriented, roomType }
    if (openType === 'more') {
      return <FilterMore onCancel={this.onCancel} onSave={this.onSave} type={openType} data={data} />
    } else {
      return null
    }

  }
  render () {
    // 在render渲染函数中,需要解构出在state中声明的状态数据,否则获取不到
    const { titleSelectedStatus, openType } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层--->>>创建点击函数,关闭FilterPicker */}
        {(openType === 'mode' || openType === 'area' || openType === 'price') && <div className={styles.mask} onClick={() => { this.onCancel() }} />}
        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            onTitleClick={this.onTitleClick}
          />
          {/* 前三个菜单对应的内容： */}
          {this.renderFilterPicker()}
          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}

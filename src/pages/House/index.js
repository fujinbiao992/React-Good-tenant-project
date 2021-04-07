import React from 'react'
import FiLter from './components/Filter'
import { AutoSizer, List, WindowScroller, InfiniteLoader } from 'react-virtualized'
import { Toast } from 'antd-mobile';
import HouseItem from '../../components/HouseItem'
import NoHouse from '../../components/NoHouse'
import styles from './index.module.css'
import { getHouses } from './api'
import { getCity } from '../../utils/city.js'
const { value = 'AREA|88cff55c-aaa4-e2e0' } = getCity()

export default class HouseList extends React.Component {
  state = {
    start: 1,
    end: 20,
    houseList: [],
    total: 0,
    isLoadFinished: false
  }
  filters = {}
  // 发送列表数据
  loadHousesByCondition = async filters => {
    this.setState(() => {
      return {
        isLoadFinished: false
      }
    })
    Toast.loading('加载中', 0, null, false)
    this.filters = filters
    const { start, end } = this.state
    const { data } = await getHouses({
      cityId: value,
      filters: filters,
      start,
      end
    })
    if (data.status === 200) {
      // 提示加载出来的总数据
      Toast.info(`共获取${data.body.count}条数据`, 2, null, false)
      this.setState(() => {
        return {
          houseList: data.body.list,
          total: data.body.count,
          isLoadFinished: true
        }
      })
    }
  }
  componentDidMount () {
    const { filters } = this
    this.loadHousesByCondition(filters)
  }
  // 渲染每条数据的方法
  renderHouseItem = ({ key, index, style }) => {
    const { houseList } = this.state
    const item = houseList[index]
    // 处理未渲染的行数据,进行判断,如果item等于undefined的话,那么渲染一个div进行展示
    if (!item) {
      return (
        <div style={style} key={key}>
          <p className={styles.loading}></p>
        </div>
      )
    }
    return <HouseItem {...item} key={key} style={style} />

  }
  // 加载更多数据InfiniteLoader组件需要使用的方法
  isRowLoaded = ({ index }) => {
    const { houseList } = this.state
    return !!houseList[index]
  }
  // 加载更多数据,loadMoreRows方法,发送数据的方法
  loadMoreRows = async ({ startIndex, stopIndex }) => {
    // 组装一个对象,用于获取动态传递的数据
    const { data } = await getHouses({
      cityId: value,
      filters: this.filters,
      start: startIndex,
      end: stopIndex
    })
    if (data.status === 200) {
      this.setState((state) => {
        return {
          houseList: [...state.houseList, ...data.body.list]
        }
      })
    }
    return new Promise(resolve => {
      resolve()
    })
  }
  // 数据列表需要渲染的组件
  HouseListRender = () => {
    const { total } = this.state
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={total}
      >
        {({ onRowsRendered }) => (
          <WindowScroller>
            {({ height, isScrolling, scrollTop }) => (
              <AutoSizer>
                {({ width }) => {
                  // console.log(width) // AutoSizer计算的高度不是我们需要的,只需要width
                  return (
                    <List
                      autoHeight
                      height={height}
                      isScrolling={isScrolling}
                      rowCount={total}
                      rowHeight={120}
                      rowRenderer={this.renderHouseItem}
                      scrollTop={scrollTop}
                      width={width}
                      onRowsRendered={onRowsRendered}
                    />
                  )
                }}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    )
  }
  // 加载更多数据后,需要展示的组件
  renderNoHouse = () => {
    return <NoHouse>该条件无房源,请换一个筛选条件试试</NoHouse>
  }
  render () {
    const { total, isLoadFinished } = this.state
    return (
      <div className="style.root">
        {/* 条件筛选栏 */}
        <FiLter loadHousesByCondition={this.loadHousesByCondition} />
        {total && this.HouseListRender()}
        {total === 0 && isLoadFinished && this.renderNoHouse()}
      </div>
    )
  }
}

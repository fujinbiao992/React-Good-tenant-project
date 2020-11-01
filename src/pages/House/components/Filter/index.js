import React, { Component } from 'react'

import FilterTitle from '../FilterTitle'
// import FilterPicker from '../FilterPicker'
// import FilterMore from '../FilterMore'

import styles from './index.module.css'
// 1- 创建高亮显示假数据
const titleSelectedStatus = {
  area: false,
  mode: true,
  price: false,
  more: false
}
export default class Filter extends Component {
  // 2- 更改为状态数据,将来执行点击操作时,根据状态数据,更改状态驱动变化就可以
  state = { titleSelectedStatus }
  onTitleClick = (type) => {
    // 根据状态传递过来的属性值,使用setState进行修改
    this.setState = (state) => {
      console.log(state)
      return {
        titleSelectedStatus: { ...this.state.titleSelectedStatus, [type]: true }
      }
    }

  }
  render () {
    const { titleSelectedStatus } = this.state
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        <div className={styles.mask} />
        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            onTitleClick={this.onTitleClick}
          />
          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}

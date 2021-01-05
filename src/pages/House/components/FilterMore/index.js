import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'
import Item from 'antd-mobile/lib/popover/Item'

export default class FilterMore extends Component {
  // 渲染标签
  renderFilters (data) {
    // 高亮类名： styles.tagActive
    let dataTemplate = []
    if (data.length !== 0) {
      dataTemplate = data.map((item, index) => {
        return (
          <span 
            key={index}
            className={[styles.tag, styles.tagActive].join(' ')}>{item.label}</span>
        )
      })
    }
    return dataTemplate
  }

  render () {
    const { onCancel, type, onSave, value, data } = this.props
    // 动态数据data返回的是一个对象结构,其中包含了四个数组,所以,要单独进行解构获取对应的四个数组,拿来当做实参进行传递
    const { characteristic, floor, oriented, roomType } = data
    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={() => {
          onCancel(type)
        }} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer}
          onCancel={() => {
            onCancel(type)
          }}
          onSave={() => {
            onSave(value)
          }}
        />
      </div>
    )
  }
}

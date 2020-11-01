import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'
console.log(styles.selected)

// 条件筛选栏标题数组：
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]

export default function FilterTitle (props) {
  // 函数组件,使用props进行接收父组件传递过来的数据
  const { titleSelectedStatus, onTitleClick } = props
  const renderTitle = () => {
    return titleList.map(item => (
      <Flex.Item
        key={item.type}
        onClick={() => {
          onTitleClick(item.type)
        }}
      >
        {/* 选中类名： selected */}
        {/* 根据父组件中传递过来的数据,判断是否显示类名,显示高亮操作 */}
        <span
          className={[
            styles.dropdown,
            titleSelectedStatus[item.type] ? styles.selected2 : ''].join(' ')}>
          <span>{item.title}</span>
          <i className="iconfont icon-arrow" />
        </span>
      </Flex.Item>
    ))
  }
  return (
    <Flex align="center" className={styles.root}>
      {renderTitle()}
    </Flex>
  )
}

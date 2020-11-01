import React from 'react'

// import { Flex } from 'antd-mobile'

// import { FiLter } from './components/Filter'
import FiLter from './components/Filter'
// 导入样式
import styles from './index.module.css'

// 获取当前定位城市
// const {label} = JSON.parse(localStorage.getItem('hkzf_city'))
export default class HouseList extends React.Component {
  render () {
    return (
      <div className={styles.root}>
        {/* 导航列表组件 */}
        <FiLter />
        {/* 列表内容组件 */}
      </div>
    )
  }
}

import React from 'react'

import PropTypes from 'prop-types'

// import { BASE_URL } from '../../utils/url'
import styles from './index.module.css'
// props中自带的一个参数,children获取组件子节点的内容
const NoHouse = ({ children }) => (
  <div className={styles.root}>
    <img
      className={styles.img}
      src={'http://localhost:8080/img/not-found.png'}
      alt="暂无数据"
    />
    <p className={styles.msg}>{children}</p>
  </div>
)

NoHouse.propTypes = {
  children: PropTypes.node.isRequired
}

export default NoHouse

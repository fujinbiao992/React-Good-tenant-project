import React from 'react'
import { Route } from 'react-router-dom'
// 导入组件库
import { TabBar } from 'antd-mobile'
// 导入二级路由组件
import Index from '../Index'
import House from '../House'
import Profile from '../Profile'
// 导入自己的定义的样式文件
import './index.css'
// 导入assets中的iconfont资源
import '../../assets/fonts/iconfont.css'
// 导入tabbar模拟假数据
import { tabbarData } from './tabbar.json'
class Home extends React.Component {
  state = {
    // 点击当前路由模块,刷新之后,应该保留住,当前的状态
    // 通过路由模块中location.pathName能够取到当前路由
    // selectedTab: '/home/index'
    selectedTab: this.props.location.pathname
  }
  // 替换结构的方法
  renderTabBarItems = () => {
    return tabbarData.map(item => (
      <TabBar.Item
        title={item.title}
        key={item.id}
        icon={<i className={`iconfont ${item.icon}`}></i>}
        selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
        selected={this.state.selectedTab === item.path}
        onPress={() => {
          this.props.history.push(item.path)
          this.setState({
            selectedTab: item.path,
          });
        }}
      >
      </TabBar.Item>
    ))
  }
  render () {
    return (
      <div className="home">
        {/* Router */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/profile" component={Profile} />
        <div className="tab-bar">
          <TabBar
            // 根据此属性,隐藏内容
            noRenderContent
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
          >
            {this.renderTabBarItems()}
          </TabBar>
        </div>
      </div>
    )
  }
}

export default Home

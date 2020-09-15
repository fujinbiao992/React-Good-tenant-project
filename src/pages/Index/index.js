import React from 'react'
import { Carousel, Flex, Grid, WingBlank, NavBar, Icon } from 'antd-mobile'
import { getSwiper, getGroups, getNews } from './api.js'
// 导入assets图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'
// 导入对应的css文件
import './index.scss'
// 基础地址
const baseUrl = 'http://localhost:8080'
// 创建导航菜单数据
const DataJson = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/list'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/abc'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/map'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/rent/add'
  }
]
class HomeIndex extends React.Component {
  state = {
    swiperData: [],
    groupsData: [],
    getNewsData: [],
    imgHeight: 212,
    autoplay: false
  }

  // 宫格请求方法
  loadGroups = async () => {
    const { data } = await getGroups()
    if (data.status === 200) {
      this.setState(() => {
        return { groupsData: data.body }
      })
    }
  }
  // 最新资讯请求方法
  loadGroups = async () => {
    const { data } = await getNews()
    console.log(data.body)
    if (data.status === 200) {
      this.setState(() => {
        return { getNewsData: data.body }
      })
    }
  }
  // 轮播图请求方法
  loadSwiper = async () => {
    // 发送请求,获取数据
    const { data } = await getSwiper()
    if (data.status === 200) {
      this.setState(() => {
        return { swiperData: data.body }
      }, () => {
        this.setState(() => {
          return { autoplay: true }
        })
      })
    }
  }
  // 在页面加载完毕后,加载请求数据的方法
  async componentDidMount () {
    this.loadSwiper()
    this.loadGroups()
  }
  // 排除轮播图警告
  componentWillMount () {
    this.autoplay = false
  }
  // 轮播图
  renderCarousel = () => {
    return this.state.swiperData.map(item => (
      <a
        key={item.id}
        href="http://www.itcast.com"
        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
      >
        {/* 根据数据接口,动态获取img图片 */}
        <img
          src={`${baseUrl}${item.imgSrc}`}
          alt="img is 404"
          style={{ width: '100%', verticalAlign: 'top' }}
          // 页面加载时触发
          onLoad={() => {
            //
            window.dispatchEvent(new Event('resize'));// 当窗口发生变化,img图片发生变化
            this.setState({ imgHeight: 'auto' });// 图片自适应
          }}
        />
      </a>
    ))
  }
  // 导航菜单
  renderMenus = () => {
    return DataJson.map(item => (
      <Flex.Item
        className='nav'
        key={item.id}
        onClick={() => {
          this.props.history.push(item.path)
        }}
      >
        <img src={item.img} alt="图片加载失败" />
        <p>{item.title}</p>
      </Flex.Item>

    ))
  }
  // Grid宫格
  renderGrid = () => {
    const { groupsData } = this.state
    return (
      <Grid data={groupsData}
        columnNum={2}
        square={false}
        activeStyle
        hasLine={false}
        renderItem={item => {
          return (
            <Flex className="grid-item" justify="between">
              <div className="desc">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <img src={`${baseUrl}${item.imgSrc}`} alt="图片显示错误" />
            </Flex>
          )
        }}
      />
    )
  }
  // news最新资讯
  renderNews = () => {
    const { getNewsData } = this.state
    return getNewsData.map(item => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img className="img" src={`${baseUrl}${item.imgSrc}`} alt="" />
        </div>
        <Flex className="content" direction='column' justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ))

  }
  // navBar导航
  renderNavBar = ()=>{
    return(
      <NavBar
      mode="dark"
      rightContent={[
        <Icon key="1" type="ellipsis" onClick={()=>{
          this.props.history.push('/cityList')
        }} />,
      ]}
    >首页</NavBar>
    )
  }
  render () {
    // 声明常量,保存的是autoplay中的状态,根据state中的状态,来驱动视图层的变化
    const { autoplay } = this.state
    return (
      <div>
        {/* navBar部分 */}
        {this.renderNavBar()}
        {/* 轮播图部分*/}
        <Carousel
          autoplay={autoplay}
          infinite
        >
          {/* 轮播图部分 */}
          {this.renderCarousel()}
        </Carousel>
        {/* 导航菜单部分 */}
        <Flex>{this.renderMenus()}</Flex>
        {/* 租房小组部分 */}
        <div className="group">
          <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* 宫格部分*/}
          {this.renderGrid()}
        </div>
        {/* 最新资讯部分 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    )
  }
}

export default HomeIndex

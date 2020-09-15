import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
// import { Button } from 'antd-mobile';
import CityList from './pages/CityList'
import Home from './pages/Home'

class App extends React.Component {
  render () {
    return (
     <div className="App">
        <Router>
        {/* Link */}
        {/* <Link to="/home">首页</Link> */}
        {/* <Link to="/cityList">城市列表</Link> */}
        {/* Route */}
        <Route path="/home" component={Home}/>
        <Route exact path="/" render={()=><Redirect to="/home"/>}/>
        <Route path="/cityList" component={CityList} />
      </Router>
     </div>
    )
  }
}
export default App

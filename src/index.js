import React from 'react'
import ReactDOM from 'react-dom'
import {Router,Route,hashHistory,IndexRoute} from 'react-router'
import reactResponsive from 'react-responsive'
//PC端组件
import NewsContainer from './components/NewsContainer'
import NewsDetail from './components/NewsDetail'
import UserCenter from './components/UserCenter'
import App from './components/App'

// 移动端组件
import MobileApp from './components/Mobile_App'
import MobileNewsContainer from './components/Mobile_NewsContainer'
import MobileNewsDetail from './components/Mobile_NewsDetail'
import MobileUserCenter from './components/Mobile_UserCenter'

//引入样式
import './componentCss/pc.css'
import './componentCss/mobile.css'

//
const MediaQuery = require('react-responsive');

ReactDOM.render((
<div>
  <MediaQuery query='(min-device-width: 1224px)'>
    <Router history={hashHistory}>
      <Route path='/' components={App}>
        <IndexRoute components={NewsContainer}> </IndexRoute>
        <Route path='/news_detail/:id/:type' components={NewsDetail}> </Route>
        <Route path='/user_center' components={UserCenter}> </Route>
      </Route>
    </Router>
  </MediaQuery>
  <MediaQuery query='(max-device-width: 1224px)'>
    <Router history={hashHistory}>
      <Route path='/' components={MobileApp}>
        <IndexRoute components={MobileNewsContainer}> </IndexRoute>
        <Route path='/news_detail/:uniquekey' components={MobileNewsDetail}> </Route>
        <Route path='/user_center' components={MobileUserCenter}> </Route>
      </Route>
    </Router>
  </MediaQuery>
</div>


),document.getElementById('root'))



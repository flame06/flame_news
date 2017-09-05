// 移动端主组件
import React, {Component} from 'react'
import ReactDOM from 'react-dom';

import MobileNewsHeader from './Mobile_NewsHeader'
import NewsFooter from './NewsFooter'

import '../componentCss/pc.css'
import Moble_NewsHeader from "./Mobile_NewsHeader";

export default class App extends Component {
  render() {
    return(
      <div>
        <MobileNewsHeader> </MobileNewsHeader>
        {this.props.children}
        <NewsFooter> </NewsFooter>
      </div>


    )
  }
}
import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Row,Col,Tabs,Card,Carousel} from 'antd'

import MobileNewsBlock from './Mobile_NewsBlock'


//引入轮播图图片
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'


const TabPane=Tabs.TabPane

export default class CommentsList extends Component {
  render() {
    return(
      <div>
        <Tabs
          defaultActiveKey="1"
          mode="horizontal"
          style={{ height: '100%' }}
        >
          <TabPane tab="头条" key="1">

              <Carousel autoplay>
                <div><img src={carousel_1}/></div>
                <div><img src={carousel_2}/></div>
                <div><img src={carousel_3}/></div>
                <div><img src={carousel_4}/></div>
              </Carousel>
              <MobileNewsBlock type="top" count={19}></MobileNewsBlock>


          </TabPane>
          <TabPane tab="社会" key="2">
            <MobileNewsBlock type="shehui" count={19}> </MobileNewsBlock>
          </TabPane>
          <TabPane tab="国内" key="3">
            <MobileNewsBlock type="guonei" count={19}> </MobileNewsBlock>
          </TabPane>
          <TabPane tab="国际" key="4">
            <MobileNewsBlock type="guoji" count={19}> </MobileNewsBlock>
          </TabPane>
          <TabPane tab="娱乐" key="5">
            <MobileNewsBlock type="yule" count={19}> </MobileNewsBlock>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
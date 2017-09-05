import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Row,Col,Tabs,Carousel} from 'antd'

//引入自定义组件
import NewsBlock from './NewsBlock'
import NewsImageBlock from './NewsImageBlock'
import NewsProduct from './NewsProducts'

//引入轮播图图片
import carousel_1 from '../images/carousel_1.jpg'
import carousel_2 from '../images/carousel_2.jpg'
import carousel_3 from '../images/carousel_3.jpg'
import carousel_4 from '../images/carousel_4.jpg'
const TabPane = Tabs.TabPane


export default class NewsContainer extends Component {
  render() {
    return(
      <div>
        <Row className='container'>
            <Col span={1}> </Col>
            <Col span={22}>
              {/*1.轮播图，图片新闻*/}
              <div className="leftContainer" style={{width:'35%'}}>
                  {/*轮播图*/}
                <Carousel autoplay>
                  <div><img src={carousel_1}/></div>
                  <div><img src={carousel_2}/></div>
                  <div><img src={carousel_3}/></div>
                  <div><img src={carousel_4}/></div>
                </Carousel>
                  {/*图片新闻*/}
                    <NewsImageBlock type="guoji" count={6} cardTitle="国际新闻" cardWidth="100%" imageWidth='112px'> </NewsImageBlock>
              </div>

              {/*2.新闻版块*/}
              <div className="leftContainer" style={{width:'35%'}}>
                  <Tabs className='tabs_news'>
                      <TabPane key="1" tab="头条新闻">
                        <NewsBlock type='top' count={21}></NewsBlock>

                      </TabPane>
                      <TabPane key="2" tab="国际新闻">
                        <NewsBlock type='guoji' count={21}></NewsBlock>

                      </TabPane>
                  </Tabs>
              </div>

              {/*3.直播版块*/}

              <div className="leftContainer" style={{width:'30%'}}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab="React News产品" key="1">
                    <NewsProduct></NewsProduct>
                  </TabPane>
                </Tabs>
              </div>

              {/*4. 下半身的图片新闻*/}
              <div>
                <NewsImageBlock type="guonei" count={8} cardTitle="国内新闻" cardWidth="100%" imageWidth='132px'> </NewsImageBlock>
                <NewsImageBlock type="yule" count={16} cardTitle="娱乐新闻" cardWidth="100%" imageWidth='132px'> </NewsImageBlock>
              </div>
            </Col>
            <Col span={1}> </Col>
        </Row>
      </div>
    )
  }
}
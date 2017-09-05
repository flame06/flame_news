import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Row,Col} from 'antd'
export default class NewsFooter extends Component {
  render() {
    return(
      <Row>
        <Col span={1}> </Col>
        <Col span={22} style={{textAlign:'center',padding:'10px'}}>
          <span>这是我的一个新闻的网页，可以跳来跳去</span>
        </Col>
        <Col span={1}> </Col>

      </Row>
    )
  }
}
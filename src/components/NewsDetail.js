import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Row,Col,BackTop,Form,Card,Input} from 'antd'
import axios from 'axios'

import NewsImageBlock from './NewsImageBlock'
import NewsComments from './NewsComments'

export default class NewsDetail extends Component {
  state={
    news:{}
  }

  componentDidMount(){
    const uniquekey = this.props.params.id
    console.log(uniquekey)
    this.showNewsDetail(uniquekey)

  }

  componentWillReceiveProps(newProps){
    this.showNewsDetail(newProps.params.id)
  }
  showNewsDetail =(uniquekey)=>{
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
    axios.get(url)
      .then(response=>{
        const news = response.data

        this.setState({news})
        //更新文档标题
        document.title = news.title
      })
  }

  render() {
    const {news}=this.state;
    let {type,id}=this.props.params;
    if(!type){
      type ='top'
    }
    return(
      <div>
        <Row>
          <Col span={1}> </Col>
          <Col span={16}>
            <div dangerouslySetInnerHTML={{__html:news["pagecontent"]}}></div>
            {/*评论列表*/}
            <Form >
              <NewsComments uniqueKey={id}></NewsComments>
            </Form>
          </Col>
          <Col span={6}>
            <NewsImageBlock type={type} cardTitle='相关新闻' count={40} imageWidth='150px' cardWidth='100%'></NewsImageBlock>
          </Col>
          <Col span={1}> </Col>

          <BackTop/>
        </Row>


      </div>


    )
  }
}
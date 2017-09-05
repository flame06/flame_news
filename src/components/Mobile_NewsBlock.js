import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {Row,Col,Card} from 'antd'

import axios from 'axios'



export default class MobileNewsBlock extends Component {
  static propTypes ={
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
  }

state={
    newsArr:null
}

componentDidMount (){
    const {type,count}=this.props
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
  axios.get(url)
    .then(response=>{
      const newsArr = response.data
      this.setState({newsArr})
    })
}

  render() {
    const {type}=this.props
    const {newsArr}=this.state
    const newsContent = !newsArr
      ?<h2>没有新闻</h2>
      :(

        newsArr.map((news,index)=>(


          <div key={index} className=" m_article list-item special_section clearfix">
            <Card style={{ width: '100%' }}>
              <Link to={`news_detail/${news.uniquekey}`}>
                <div className="m_article_img">
                  <img src={news["thumbnail_pic_s"]}/>
                </div>
                <div className="m_article_info">
                  <div className="m_article_title">
                    <span>{news.title}</span>
                  </div>
                  <div className="m_article_desc clearfix">
                    <div className="m_article_desc_l">
                      <span className="m_article_channel">{news.realtype}</span>
                      <span>{news.date}</span>
                    </div>
                  </div>
                </div>

              </Link>
            </Card>
          </div>
        ))


      )





      return(
      <Row>
        <Col span={24}>

            {newsContent}

        </Col>
      </Row>

    )
  }
}
import React, {Component,PropTypes} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'

export default class NewsBlock extends Component {
  state={
    newsArr:null
  }
  static propTypes = {
    type:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
  }
//组件挂载后，自动发送ajax请求加载数据:得到数据列表，更新newArr状态
componentDidMount(){
    const {type,count}=this.props
    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(
        response=>{

          var newsArr= response.data

          this.setState({newsArr})
        }
      )
}



  render() {
    const {newsArr} = this.state
    const {type}=this.props
    const contentUI=newsArr
      ?(
        newsArr.map((news,index)=>(
          <li key={index}>
            <Link to={`/news_detail/${news.uniquekey}/${type}`}>{news.title}</Link>
          </li>
        ))
      )
      :(
        <h3>网络缓慢，稍等...</h3>
      )
    return(
      <Card className="topNewsList">
        <ul>

          {
            contentUI
          }
        </ul>
      </Card>
    )
  }
}
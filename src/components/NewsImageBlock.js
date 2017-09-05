import React, {Component,PropTypes} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'
import {Card} from 'antd'
import {Link} from 'react-router'
export default class NewsImageBlock extends Component {

static propTypes={
  type : PropTypes.string.isRequired,
  cardTitle : PropTypes.string.isRequired,
  count : PropTypes.number.isRequired,
  cardWidth : PropTypes.string.isRequired,
  imageWidth : PropTypes.string.isRequired
}

state={
  newsArr:null
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
    const {cardTitle,cardWidth,imageWidth,count,type}=this.props
    const {newsArr}= this.state;
    console.log(newsArr);
    //定义图片文字样子
    const titleStyle={
      "width": imageWidth,
      "whiteSpace": "nowrap",
      "overflow": "hidden",
      "textOverflow": "ellipsis",
      "color":'#666'
    }
    const imageStyle={
      width:imageWidth,
      height:'90px',
      display:'block'
    }

    //定义图片
    const newsImage = newsArr
      ?(
        newsArr.map((news,index)=>(
          <div key={index} className="imageblock">
              <Link to={`/news_detail/${news.uniquekey}/${type}`}>
                  <div>
                      <img src={news.thumbnail_pic_s} style={imageStyle}/>
                  </div>
                  <div className="custom-card">
                      <h3 style={titleStyle}>{news.title}</h3>
                      <p>{news.author_name}</p>
                  </div>
              </Link>
          </div>
          )

        )
      )
      :(
        <h2>网络较慢，请稍等，或者刷新页面</h2>
      )



    return(
      <Card className="topNewsList" title={cardTitle} style={{width:cardWidth}}>
        {newsImage}
      </Card>
    )
  }
}
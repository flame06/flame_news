import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {Row,Form,BackTop} from 'antd'
import axios from 'axios'

import NewsComments from './NewsComments'

class MobileNewsDetail extends Component {

state={
  news:{}
}

  componentDidMount (){

    const url=`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.params.uniquekey}`
    axios.get(url)
      .then(response=>{
        const news = response.data
        this.setState({news})
      })
  }

  render() {
      const {news} = this.state
    const {uniquekey} = this.props.params
    return(
        <div>
          <div dangerouslySetInnerHTML={{__html:news["pagecontent"]}}></div>
          {/*评论列表*/}
          <Form >
            <NewsComments uniqueKey={uniquekey}></NewsComments>
          </Form>
          <BackTop/>
        </div>

    )
  }
}
export default Form.create()(MobileNewsDetail)
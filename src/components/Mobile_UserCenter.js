import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Row,Col,Tabs,Card,message,Upload, Icon, Modal} from 'antd'
import axios from 'axios'
import {Link} from 'react-router'
const TabPane = Tabs.TabPane


export default class MobileUserCenter extends Component {
  state={
    comments:null,
    collections:null,
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  }
//挂载完成，发送ajax请求的到评论和收藏列表
  componentDidMount(){
    //发送ajax请求，得到评论列表
    const userId=localStorage.getItem('userId')
    console.log(userId)
    if(!userId){
      return
    }
    let url= `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
    axios.get(url)
      .then(response=>{
        const comments=response.data

        this.setState({comments})
        console.log(comments)
      })
    //发送ajax请求，得到收藏列表
    url= `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
    axios.get(url)
      .then(response=>{
        const collections=response.data

        this.setState({collections})
        console.log(collections)
      })
  }

//头像设置
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })


  render() {
    const {comments,collections}=this.state
    const userId = localStorage.getItem('userId')
    //todo 定义评论列表组件
    const commentList = !comments
      ? <h3>没有任何评论</h3>
      : comments.map((comment, index) => (
        <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
              extra={<Link to={`/news_detail/${comment.uniquekey}/top`}>查看</Link>}>
          {comment.Comments}
        </Card>
      ))
    //todo 定义收藏列表组件
    const collectionList = !collections
      ? <h3>没有任何收藏, 立即去收藏文章</h3>
      : collections.map((collection, index) => (
        <Card key={index} title={collection.uniquekey}
              extra={<Link to={`/news_detail/${collection.uniquekey}/top`}>查看</Link>}>
          {collection.Title}
        </Card>
      ))

//设置头像
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return(
      <Row>
        <Col span={1}> </Col>
        <Col span={22}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="我收藏的列表" key="1">
              {collectionList}
            </TabPane>
            <TabPane tab="我的评论列表" key="2">
              {commentList}
            </TabPane>
            <TabPane tab="头像设置" key="3">
              <div className="clearfix">
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {fileList.length >= 3 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </div>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={1}> </Col>

      </Row>

    )
  }
}
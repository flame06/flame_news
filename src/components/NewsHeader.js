import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Row,Col,Menu,Icon,Button,Modal,Tabs,Form,Input,message} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'
import logo from '../images/logo2.jpg'


const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane
const FormItem=Form.Item


class NewsHeader extends Component {
  //初始状态
  state={
    selectedKey:'top',
    username:null,
    modalShow:false
  }
//登录注册
  clickMenu =({key})=>{
    //选中登录/注册按钮，则显示模态框。提示登录注册信息。
    if(key=='login'){
      this.setState({modalShow:true})
    }
    //更改显示的菜单项为当前选中项。
    this.setState({selectedKey:key})
  }
//退出登录
  logout=()=>{
    const {username,userId}= this.state
    this.setState({username:null})
    localStorage.removeItem('username')
    localStorage.removeItem('userId')
  }
  // 显示模态框
  showModal=()=>{
    this.setState({modalShow:false})
  }
//为什么刷新后，登录状态会自动退出？
  handleSubmit = (isLogin,event)=>{
    event.preventDefault();
    const {username,password,r_username,r_password,r_confirmPassword}=this.props.form.getFieldsValue()
    let url='http://newsapi.gugujiankong.com/Handler.ashx?'
    if(isLogin){
      //提交登录
      url += `action=login&username=${username}&password=${password}`

    }else{
      //提交注册
      url +=`action=register&r_userName=${r_username}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`
    }
//发送登录和注册的请求
    axios.get(url)
      .then((response)=>{
      //清楚输入的数据
        this.props.form.resetFields()

        const result=response.data;//todo 获取到了服务器返回的数据。

        if(isLogin){
          //登录
          if(!result){//1-如果用户名和密码没有注册或者不匹配，则反馈给用户，登录失败
            message.error('登录失败，请检查用户名和密码')
          }else{    //登录成功 更新username的状态（用来显示用户中心），保存到localStorage中，客户登录后刷新还能显示用户中心
            //登录成功
            const username=result.NickUserName;
            const userId = result.UserId;

            //保存到windows对象中
            localStorage.setItem('username',username)
            localStorage.setItem('userId',userId)

            // 更新username
            this.setState({username})
          }
        }else{
          message.success('注册成功')
        }
        //关闭模态框
        this.setState({modalShow:false})
      })

  }
  //切换登录注册模态框，清楚对方的数据。
  handleChange=()=>{
    this.props.form.resetFields()
  }
//todo 重点  ： 我忘记的重点： 组件挂载：读取此时的username 更新状态。可以解决：刷新后，不显示用户中心哪个界面
  componentDidMount () {
    // 读取保存到local中的username
    const username = localStorage.getItem('username')
    if(username) {
      // 更新状态
      this.setState({username})
    }
  }

  //渲染
  render() {
    //获取
    // const username=localStorage.getItem('username')
    const {selectedKey,username,modalShow}=this.state;
    const { getFieldDecorator } = this.props.form

  //定义用户中心
    const userShow = username
      ? (
        <MenuItem key="logout"  className="register">
          <Button type='primary'>{username}</Button>&nbsp;&nbsp;
          <Link to="/user_center"><Button type='dashed'>个人中心</Button></Link>&nbsp;&nbsp;
          <Button onClick={this.logout}>退出</Button>
        </MenuItem>
      )
      :(
        <MenuItem key="login"  className="register">
          <Icon type="appstore"/>登录/注册
        </MenuItem>
      )

    return(
      <header>
        <Row>
          <Col key='0' span={1}> </Col>
          <Col key='1' span={3}>
            <div>
              <Link to="#/" className="logo">
                <img src={logo} alt=""/>
                <span>ReactNews</span>
              </Link>
            </div>
          </Col>
          <Col key='2' span={19}>
            <Menu mode="horizontal" selectedKeys={[selectedKey]} onClick={this.clickMenu}>
              <MenuItem key="top">
                <Icon type="appstore"/>头条
              </MenuItem>
              <MenuItem key="shehui">
                <Icon type="appstore"/>社会
              </MenuItem>
              <MenuItem key="guonei">
                <Icon type="appstore"/>国内
              </MenuItem>
              <MenuItem key="guoji">
                <Icon type="appstore"/>国际
              </MenuItem>
              <MenuItem key="yule">
                <Icon type="appstore"/>娱乐
              </MenuItem>
              <MenuItem key="tiyu">
                <Icon type="appstore"/>体育
              </MenuItem>
              <MenuItem key="keji">
                <Icon type="appstore"/>科技
              </MenuItem>
              <MenuItem key="shishang">
                <Icon type="appstore"/>时尚
              </MenuItem>

              {userShow}
            </Menu>
            <Modal
              title="用户中心"
              visible={modalShow}
              onOk={this.showModal}
              onCancel={this.showModal}
              okText='关闭'
            >
              <Tabs type="card"  onChange={this.handleChange}>
                {/*登录开始*/}
                <TabPane key="1" tab="登录">
                  <Form onSubmit={this.handleSubmit.bind(this,true)}>
                    <FormItem label="用户名">
                      {
                        getFieldDecorator('username')(
                          <Input type="text" placeholder="输入名字"/>
                        )
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator('password')(
                          <Input type="password" placeholder="输入密码"/>
                        )
                      }
                    </FormItem>
                    <Button type='primary' htmlType="submit">登陆</Button>
                  </Form>
                </TabPane>
                {/*注册开始*/}
                <TabPane key="2" tab="注册">
                  <Form onSubmit={this.handleSubmit.bind(this,false)}>
                    <FormItem label="用户名">
                      {
                        getFieldDecorator('r_username')(
                          <Input type="text" placeholder="输入名字"/>
                        )
                      }
                    </FormItem>
                    <FormItem label="密码">
                      {
                        getFieldDecorator('r_password')(
                          <Input type="password" placeholder="输入密码"/>
                        )
                      }
                    </FormItem>
                    <FormItem label="确认密码">
                      {
                        getFieldDecorator('r_confirmPassword')(
                          <Input type="password" placeholder="输入确认密码"/>
                        )
                      }
                    </FormItem>
                    <Button type='primary' htmlType="submit">注册</Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col key='3' span={1}></Col>
        </Row>

      </header>
    )
  }
}

export default Form.create()(NewsHeader);

// ReactDOM.render(<WrappedRegistrationForm />, mountNode);
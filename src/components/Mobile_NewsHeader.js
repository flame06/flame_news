import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Row,Col,Menu,Icon,Button,Modal,Tabs,Form,Input,message} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'
import logo from '../images/logo.png'


const MenuItem = Menu.Item;
const TabPane = Tabs.TabPane
const FormItem=Form.Item


class MobileNewsHeader extends Component {
  state={
    username:null,
    modalShow:false
  }

  showModal=()=>{
    this.setState({modalShow:false})
  }

  handleClick=()=>{
    this.setState({modalShow:true})
  }

  handleChange=()=>{
    this.props.form.resetFields()
  }

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

  render() {
    const {modalShow,username}=this.state
    const { getFieldDecorator } = this.props.form

    const userShow = username
      ?<Link to="/user_center">
        <Icon type="inbox" />
      </Link>
      :<Link to="/"  onClick={this.handleClick}>
        <Icon type="setting" />
      </Link>

    return(
      <Form>
        <div id="mobileheader">
          <header>
            <Link to="/"><img src={logo} /></Link>
            <span>ReactNews</span>

              {userShow}

          </header>
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
        </div>

      </Form>

    )
  }
}

export default Form.create()(MobileNewsHeader)
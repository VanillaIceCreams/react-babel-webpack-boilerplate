/**
 * Created by Administrator on 2018/1/25.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import hex_md5 from '../js/md5'
import { Link} from 'react-router';
import URL from './URL';



export default class LoginItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {logined: false, user:{}};//logined:是否已经登录  user：用户信息
  }


  exit = ()=> {
    $.get(URL.exitURL, (result)=> {
      if (result.status == 200) {
        this.setState({
          logined: false,
          user:{}
        });
      } else {
        alert("退出失败")
      }
    })
  };
  //向服务器确认登录情况
  componentDidMount() {
    $.get(URL.ifLoginURL, (result)=> {
      if (result.status == 200) {
        this.setState({
          logined: true,
          user:result.data
        });
      } else {
        if (this.state.logined == true) {//没登录，但前端状态却是已登录
          this.setState({
            logined: false,
            user:{}//这里是不是该把user重置为{}？
          })
        }
      }
    })
  }
   //由Logining组件来调用，用于改变登录状态
  changeToLogined = (user)=> {
    this.setState({
      logined: true,
      user:user
    });
  };

  render() {
    if (this.state.logined == true) {//如果已经登录了，就渲染这个DOM
      return (
        <div>
          <Logined user={this.state.user} exit={this.exit}/>
        </div>
      )
    } else {//如果未登录，就渲染这个DOM
      return (
        <div>
          <Logining changeToLogined={this.changeToLogined}/>
        </div>
      )
    }
  }
}

class Logining extends React.PureComponent {

  switchModal = ()=> {
    if ($(this.refs.loginModal).hasClass("is-active")) {
      $(this.refs.loginModal).removeClass("is-active")
    } else {
      $(this.refs.loginModal).addClass("is-active")
    }
  };
  handleLogin = (event)=> {
    let url = URL.loginURL;
    let account = this.refs.account.value;
    let password = hex_md5(this.refs.password.value);//md5加密了
    let target = $(event.target);
    let flag = true;//表单验证
    if (!account.trim().length) {
      $('#account').easytip().show();
      flag = false;
    }
    if (!this.refs.password.value.trim().length) {
      $('#password').easytip().show();
      flag = false;
    }
    if (flag) {
      target.addClass("is-loading");
      $.get(url, {account: account, password: password}, (result)=> {
        target.removeClass("is-loading");
        if (result.status == 200) {
          $(this.refs.tips).addClass("is-invisible");
          this.switchModal();
          this.props.changeToLogined(result.data)
        } else {
          $(this.refs.tips).removeClass("is-invisible");
        }
      });
    }

  };

  render() {
    return (
      <div>
        {/* 登录按钮开始 */}
        <div className="navbar-item">
          <div className="field is-grouped" onClick={this.switchModal}>
            <p className="control">
              <a className="button is-primary">
                <span className="icon">
                  <i className="fa fa-chevron-circle-right"/>
                </span>
                <span >登录</span>
              </a>
            </p>
          </div>
        </div>
        {/* 登录按钮结束 */}
        {/* 模态框开始 */}
        <div className="modal " ref="loginModal">{/*模态框的ref*/}
          <div className="modal-background" onClick={this.switchModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">欢迎登录</p>
            </header>
            <section className="modal-card-body ">
              <div className="field  has-text-centered has-text-danger is-invisible" ref="tips">
                <i className="fa fa-times-circle "/>
                <span>用户名或密码错误</span>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">用户名:</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className="input" type="text" placeholder="userName" ref="account" id="account"
                             data-easytip-message="请填写用户名"
                             data-easytip="position:top;class:easy-black;disappear:1000;speed:1000;"/>
                    </p>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">密　码:</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className="input" type="password" placeholder="password" ref="password" id="password"
                             data-easytip-message="请填写密码"
                             data-easytip="position:top;class:easy-black;disappear:1000;speed:1000;"/>
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot column">
              <div className="pull-right">
                <button className="button is-success" onClick={this.handleLogin}>登录</button>
                <button className="button" onClick={this.switchModal}>取消</button>
              </div>
            </footer>
          </div>
        </div>
        {/* 模态框结束 */}
      </div>
    )
  }

}
class Logined extends React.PureComponent {
  render() {
    return (
      <div className="navbar-item has-dropdown is-hoverable" style={{height: '100%'}}>
        <a className="navbar-link">
          {this.props.user.nickname}
        </a>
        <div className="navbar-dropdown">
          <Link to="/manage" className="navbar-item">
            后台管理
          </Link>
          <a className="navbar-item" onClick={this.props.exit}>
            退出
          </a>
          <hr className="navbar-divider"/>
          <div className="navbar-item">
            Version 0.0.1
          </div>
        </div>
      </div>

    )
  }
}

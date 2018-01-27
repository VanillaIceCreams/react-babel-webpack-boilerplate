import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Link,IndexLink } from 'react-router';
import LoginItem from './LoginItem'


//let url = "http://localhost:8081/test/sort.json";
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {listSortList: []};
  }

  getSortList = "http://localhost:8080/api/sort";

  componentDidMount() {
    $.get(this.getSortList, (result)=> {
        if (result.status == 200) {
          this.setState({
            listSortList: result.data
          })
        }
      }
    )
  }
  closeBurger=()=>{//点击汉堡菜单内的选项后，关闭汉堡菜单
    $("#fuck,#fuckButton").removeClass("is-active");
  };
  render() {
    return (
      <div>
        <nav className="navbar is-fixed-top is-dark">
          <div className="navbar-brand">
            <IndexLink className="navbar-item is-size-5" to="/">
              <span>香草的博客</span>
            </IndexLink>
            <div className="navbar-burger burger" data-target="fuck" id="fuckButton">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div id="fuck" className="navbar-menu " style={{paddingRight: "30px"}}>
            <div className="navbar-start">
              <IndexLink to="/" className="navbar-item" onClick={this.closeBurger}>
                Home
              </IndexLink>
              {this.state.listSortList.map((data)=> {//   /article/:lv/:sort
                let url1 = "/article/one/" + data.sort1.sortId;
                return <div className="navbar-item has-dropdown is-hoverable" key={data.sort1.sortId}>
                  <Link className="navbar-link" to={url1} onClick={this.closeBurger}>
                    {data.sort1.name}
                  </Link>
                  <div className="navbar-dropdown is-boxed ">
                    {data.sort2s.map((sort2)=> {
                      let url2 = "/article/two/" + sort2.sortId;
                      return <Link className="navbar-item" to={url2} key={sort2.sortId} onClick={this.closeBurger}>
                        {sort2.name}
                      </Link>
                    })}
                  </div>
                </div>
              })}
            </div>
            <div className="navbar-end">
              {/* 登录开始 */}
              <LoginItem/>
              {/* 登录结束 */}
            </div>
          </div>
        </nav>
        {/* 内容体开始 */}
        <div className="container " style={{marginTop:"50px"}}>
          <div className="notification is-white">
            {this.props.children}
          </div>
        </div>
        {/* 内容体结束*/}

      </div>
    );
  }
}
/**
 * 汉堡菜单,添加监听（注意，上面模块里还有个监听...）
 */
document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
});


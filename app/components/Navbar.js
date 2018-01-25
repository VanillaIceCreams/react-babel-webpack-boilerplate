import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Link,IndexLink } from 'react-router';


//let url = "http://localhost:8081/test/sort.json";
export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {listSortList: []};
  }

  componentDidMount() {
    $.get("http://localhost:8081/test/sort.json", (result)=> {
        if (result.status == 200) {
          this.setState({
            listSortList: result.data
          })
        }
      }
    )
  }

  render() {
    return (
      <div>
        <nav className="navbar is-fixed-top ">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
            </a>
            <div className="navbar-burger burger" data-target="fuck">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div id="fuck" className="navbar-menu">
            <div className="navbar-start">
              <IndexLink to="/" className="navbar-item">
                Home
              </IndexLink>
              {this.state.listSortList.map((data)=> {//   /article/:lv/:sort
                let url1 = "/article/one/" + data.sort1.sortId;
                return <div className="navbar-item has-dropdown is-hoverable" key={data.sort1.sortId}>
                  <Link className="navbar-link" to={url1}>
                    {data.sort1.name}
                  </Link>
                  <div className="navbar-dropdown is-boxed">
                    {data.sort2s.map((sort2)=> {
                      let url2 = "/article/two/" + sort2.sortId;
                      return <Link className="navbar-item" to={url2} key={sort2.sortId}>
                        {sort2.name}
                      </Link>
                    })}
                  </div>
                </div>
              })}
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="field is-grouped">
                  <p className="control">
                    <a className="button is-primary" href="">
                      <span className="icon">
                        <i className="fas fa-download"/>
                      </span>
                      <span>登录</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="container " style={{marginTop:"50px"}}>
          <div className="notification is-white">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}



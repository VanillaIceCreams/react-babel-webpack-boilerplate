/**
 * Created by Administrator on 2018/1/24.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory,Link,IndexLink,browserHistory,IndexRoute } from 'react-router';
import  ArticleList from './ArticleList.js'
import HomePage from './HomePage.js'
import Article from './Article.js'
import Footer from './Footer.js'
import  Navbar from './Navbar.js'


ReactDOM.render(
  <div>
    <Router history={browserHistory}>
      <Route path="/" component={Navbar}>
        <IndexRoute component={HomePage}/>
        <Route path="/article/:lv/:sort" component={ArticleList}/>
        <Route path="/article/:articleId" component={Article}/>
      </Route>
    </Router>
    <Footer/>
  </div>
  ,
  document.getElementById("app")
);


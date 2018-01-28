/**
 * Created by Administrator on 2018/1/24.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory,Link,IndexLink,browserHistory,IndexRoute } from 'react-router';
import  ArticleListPage from './ArticleList.js'
import HomePage from './HomePage.js'
import ArticlePage from './ArticlePage.js'
import Footer from './Footer.js'
import  Navbar from './Navbar.js'
import  WritingPage from './WritingPage.js'
import  Manage from './Manage.js'
import  AlterArticle from './AlterArticle.js'
ReactDOM.render(
  <div>
    <Router history={browserHistory}>
      <Route path="/" component={Navbar}>
        <IndexRoute component={HomePage}/>
        <Route path="/article/:lv/:sort" component={ArticleListPage}/>
        <Route path="/article/:articleId" component={ArticlePage}/>
        <Route path="/markdown" component={ WritingPage}/>
        <Route path="/manage" component={Manage}/>
        <Route path="/alter/:articleId" component={AlterArticle}/>
      </Route>
    </Router>
    <Footer/>
  </div>
  ,
  document.getElementById("app")
);


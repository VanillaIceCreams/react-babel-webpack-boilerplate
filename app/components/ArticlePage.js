/**
 * Created by Administrator on 2018/1/24.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Review from './Review.js'
import  '../css/mycss.css'
import URL from './URL';


export default class ArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {article: ""};
  }

  componentDidMount() {
    $.get(URL.articleURL + this.props.params.articleId, (result)=> {
        this.setState({
          article: result.data
        })
      }
    )
  }
  render() {
    return (
      <div>
        <ArticleTitle article ={this.state.article} />
        <Content content={this.state.article.content}/>
        <Review articleId={this.props.params.articleId}/>
        <GotoTop/>
      </div>
    );
  }
}
class ArticleTitle extends React.PureComponent {
  componentDidMount() {
    $("#date").easytip();
  }

  render() {
    return (<div>
      <h1 className="title">{this.props.article.title}</h1>
      <div className="column">
         <p><a  style={{ textDecoration:"none"}}>作　　者：香草丶</a></p>
        <a data-easytip="position:bottom;class:easy-black;hover_show:true"
           data-easytip-message={"最后编辑于"+new Date(this.props.article.updateTime).toLocaleString()}
           id="date"
           style={{ textDecoration:"none"}}>
        <span>创建日期：</span>
        <span >{new Date(this.props.article.createTime).toLocaleDateString()}</span>
        </a>
      </div>
      <hr/>
    </div>)
  }

}
//文章的正文
class Content extends React.PureComponent {

  render() {
    //dangerouslySetInnerHTML={{__html:值}}用于添加innerhtml
    return (
      <div className="markdown-body" dangerouslySetInnerHTML={{__html:this.props.content}}></div>
    );
  }
}

class GotoTop extends React.PureComponent {
  smoothscroll = ()=> {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  };

  render() {
    return <div className="GotoTop" onClick={this.smoothscroll}>
      <i className="fa fa-arrow-up"/>
    </div>
  }

}

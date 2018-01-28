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
    this.state = {reviewList: []};
  }

  putReview = (review, reviewForm)=> {//reviewForm是子组件，用于提交成功后清空输入内容！
    review.articleId = this.props.params.articleId;
    $.ajax({
      type: 'put',
      contentType: 'application/json;charset=UTF-8',
      dataType: "json",
      url: URL.reviewUrl,
      data: JSON.stringify(review),//必须是json格式！
      success: (result)=> {
        alert("评论成功");
        this.getReviewList(URL.reviewUrl + this.props.params.articleId)
        reviewForm.cleatInput();
      },
      error: (result)=> {
        alert("服务器出错");
      }
    });
  };

  getReviewList(url) {
    $.get(url, (result)=> {
        if (result.status == 200) {
          this.setState({
            reviewList: result.data
          })
        }
      }
    )
  }

  componentDidMount() {
    this.getReviewList(URL.reviewUrl + this.props.params.articleId)
  }

  render() {
    return (
      <div>
        <ArticleTitle />
        <Content articleId={this.props.params.articleId}/>
        <Review reviewList={this.state.reviewList} putReview={this.putReview}/>
        <GotoTop/>
      </div>
    );
  }
}
class Content extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {content: ""};
  }


  componentDidMount() {
    $.get(URL.articleURL + this.props.articleId, (result)=> {
        this.setState({
          content: result.data.content
        })
      }
    )
  }

  render() {
    //dangerouslySetInnerHTML={{__html:值}}用于添加innerhtml
    return (
      <div className="markdown-body" dangerouslySetInnerHTML={{__html:this.state.content}}></div>
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

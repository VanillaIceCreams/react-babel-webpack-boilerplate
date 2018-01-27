/**
 * Created by Administrator on 2018/1/24.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import  '../css/mycss.css'

export default class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = {reviewList: []};
  }

  getReviewUrl = "http://localhost:8080/api/review/" + this.props.params.articleId;
  putReviewUrl = "http://localhost:8080/api/review";

  putReview = (review, reviewForm)=> {//reviewForm是组件对象，用于提交成功后清空输入内容！
    review.articleId = this.props.params.articleId;
    let url = "http://localhost:8080/api/review";
    $.ajax({
      type: 'put',
      contentType: 'application/json;charset=UTF-8',
      dataType: "json",
      url: this.putReviewUrl,
      data: JSON.stringify(review),//必须是json格式！
      success: (result)=> {
        alert("评论成功");
        this.getReviewList(this.getReviewUrl)
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
    this.getReviewList(this.getReviewUrl)
  }

  render() {
    return (
      <div>
        <Markdown articleId={this.props.params.articleId}/>
        <Review reviewList={this.state.reviewList} putReview={this.putReview}/>
        <GotoTop/>
      </div>
    );
  }
}
class Markdown extends React.Component {

  componentDidMount() {
    //console.log(this.props.articleId);
    $.get("http://localhost:8080/api/article/" + this.props.articleId, (result)=> {
      console.log(result.data.content)
        $(".markdown-body").html(result.data.content);
      }
    )
  }

  render() {
    return (
      <div className="markdown-body"></div>
    );
  }
}
class Review extends React.Component {
  render() {
    return (
      <div>
        <h1 className="is-size-1">评论 :</h1>
        <ReviewList reviewList={this.props.reviewList}/>
        <br/>
        <ReviewForm putReview={this.props.putReview}/>
      </div>
    );
  }
}
class ReviewList extends React.Component {
  render() {

    return (
      <div className="card">
        {
          this.props.reviewList.map((review)=> {
            return (<div className="card-content" key={review.reviewId}>
              <div className="media">
                <div className="media-content" style={{overflow: "visible"}}>
                  <p className="title is-5">{review.name}</p>
                  <p className="subtitle is-6">{review.email}</p>
                </div>
              </div>

              <div className="content">
                {review.content}
                <br/>
              </div>
              <time className="column has-text-right">{new Date(review.createTime).toLocaleString()}</time>
            </div>)

          })}

      </div>
    );
  }

}
class ReviewForm extends React.Component {

  componentDidMount() {
    //$("#formArea").easyform();
    $.get("http://localhost:8080/api/article/" + this.props.articleId, (result)=> {
        $(".markdown-body").html(result.data.content);
      }
    )
  }
  handleClick = ()=> {
    let review = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      content: this.refs.content.value
    };
    let flag = true;//如果是true，才提交
    //邮箱验证
    if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(review.email)){
      $('#email').easytip().show();
      flag=false;
    }
    if(!review.name.trim().length){
      $('#name').easytip().show();
      flag=false;
    }
    if(!review.content.trim().length){
      $('#content').easytip().show();
      flag=false;
    }
    if(flag){
      this.props.putReview(review, this);//注意这个this，贼6
    }
  };
  cleatInput = ()=> {//清空输入内容
    this.refs.name.value = '';
    this.refs.email.value = '';
    this.refs.content.value = '';
  };

  render() {
    return (
      <div id="formArea">
        <div className="field" >
          <label className="label">姓名</label>
          <div className="control">
            <input className="input" type="text" placeholder="name" ref="name" id="name"
                   data-easytip-message="请填写姓名(不许敲奇怪的符号哦~)"
                   data-easytip="position:top;class:easy-black;left:40;disappear:1000;speed:1000;"/>
          </div>
          <label className="label">邮箱</label>
          <div className="control">
            <input className="input" type="text" placeholder="email" ref="email" id="email"
                   data-easytip="position:top;class:easy-black;left:40;disappear:1000;speed:1000;"
                   data-easytip-message="邮箱格式错误"/>
          </div>
          <label className="label">评论</label>
          <div className="control">
            <textarea className="textarea" placeholder="textarea" ref="content" id="content"
                      data-easytip="position:top;class:easy-black;left:40;disappear:1000;speed:1000;"
                      data-easytip-message="请填写评论"/>
          </div>
        </div>
        <div className="field is-grouped is-grouped-right">
          <p className="control">
            <a className="button is-primary" onClick={this.handleClick}>
              Submit
            </a>
          </p>
          <p className="control">
            <a className="button is-light" onClick={this.cleatInput}>
              Clear
            </a>
          </p>
        </div>

      </div>
    );
  }
}
class GotoTop extends React.Component {
  smoothscroll = ()=> {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(this.smoothscroll);
      window.scrollTo(0, currentScroll - (currentScroll / 5));
    }
  }

  render() {
    return <div id="GotoTop" onClick={this.smoothscroll}>
      <i className="fa fa-arrow-up"/>
    </div>
  }

}

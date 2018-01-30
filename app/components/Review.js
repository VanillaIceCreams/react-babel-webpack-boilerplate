/**
 * Created by Administrator on 2018/1/24.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import URL from './URL';

export default class Review extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {reviewList: []};
  }

  putReview = (review, reviewForm)=> {//reviewForm是子组件，用于提交成功后清空输入内容！
    review.articleId = this.props.articleId;
    $.ajax({
      type: 'put',
      contentType: 'application/json;charset=UTF-8',
      dataType: "json",
      url: URL.reviewUrl,
      data: JSON.stringify(review),//必须是json格式！
      success: (result)=> {
        if(result.status==200){
          alert("评论成功");
          this.getReviewList(URL.reviewUrl + this.props.articleId);
          reviewForm.cleatInput();
        }else{
          alert(result.msg);
        }
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
    this.getReviewList(URL.reviewUrl + this.props.articleId)
  }

  render() {
    return (
      <div>
        <h1 className="is-size-1">评论 :</h1>
        <ReviewList reviewList={this.state.reviewList}/>
        <br/>
        <ReviewForm putReview={this.putReview}/>
      </div>
    );
  }
}
class ReviewList extends React.PureComponent {
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
class ReviewForm extends React.PureComponent {

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

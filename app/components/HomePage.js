import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Link,IndexLink } from 'react-router';
import URL from './URL';




export default class HomePage extends React.Component {


  render() {
    return ( <div className="columns">
      <ArticleList1/>
      <RecentReview />
    </div>)
  }
}

class ArticleList1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {articles: []};
  }

  componentDidMount() {
    $.get(URL.recentArticleURL+"?num=4", (result)=> {
        if (result.status == 200) {
          this.setState({
            articles: result.data
          })
        }
      }
    )
  }

  render() {

    return (
      <div className="column">
        <h4 className="title">近期文章</h4>
        {this.state.articles.map((article)=> {
          return (
            <div className="box" key={article.articleId}>
              <Link to={"/article/"+article.articleId}>
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-2by1 is-128x128">
                      <img src={article.imageLarge}/>
                    </figure>
                  </div>

                  <div className="media-content">
                    <div className="content">
                      <p>
                        <strong>{article.title}</strong>
                        <br/>
                        {article.overview}
                      </p>
                    </div>
                  </div>
                </article>
                <time className="is-pulled-right is-size-7">发表时间:{new Date(article.createTime).toLocaleString()}</time>
              </Link>
            </div>
          )
        })}

      </div>)
  }
}

class RecentReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: []};
  }

  componentDidMount() {
    $.get(URL.recentReviewURL+"?num=11", (result)=> {
        if (result.status == 200) {
          this.setState({
            reviews: result.data
          })
        }
      }
    )
  }
  multicolor=(e)=>{
    var num = parseInt(Math.random()*4)
      if(num==1){
        $(e.target).addClass("is-primary")
      }else if(num==2){
        $(e.target).addClass("is-danger")
      }else if(num==3){
        $(e.target).addClass("is-dark ")
      }else{
        $(e.target).addClass("is-success")
      }
    }
  multicolor2=()=>{
    var num = parseInt(Math.random()*4)
    if(num==1){
     return "is-primary"
    }else if(num==2){
      return"is-info"
    }else if(num==3){
      return"is-dark "
    }else{
      return"is-warning"
    }
  };
  deleteReview=(e)=>{
    var newreviews =  this.state.reviews.filter((review)=>{
      if(review.reviewId==e.target.id){
        return false
      }
      return true;
    });
    this.setState({
      reviews: newreviews
    })
  };
  render() {
    return (
      <div className="column is-two-fifths is-hidden-mobile">
        <h4 className="title">近期评论</h4>
        {  this.state.reviews.map((review)=>{
          return (
            <div className="notification " key= {review.reviewId} style={{marginBottom:"0.5rem"}}>
              <button className="delete" onClick={this.deleteReview} id={review.reviewId}/>
              <Link to={"/article/"+review.articleId}>
                <div>
                  <span>{review.name+": "}</span> <span>{review.content}</span>
                </div>
              </Link>
            </div>
          )
        })}
    </div>)
  }
}





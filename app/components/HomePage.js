import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Link,IndexLink } from 'react-router';


//let url = "http://localhost:8081/test/article.json";

export default class HomePage extends React.Component {


  render() {
    return ( <div className="columns">
      <ArticleList1/>
      <A />
    </div>)
  }
}

class ArticleList1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {articles: []};
  }

  componentDidMount() {
    $.get("http://localhost:8081/test/article.json", (result)=> {
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
        {this.state.articles.map((article)=> {
          return (
            <div className="box" key={article.articleId}>
              <Link to={"/article/"+article.articleId}>
                <article className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
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

class A extends React.Component {
  render() {
    return ( <div className="column is-two-fifths"></div>)
  }
}





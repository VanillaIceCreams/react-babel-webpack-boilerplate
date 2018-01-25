/**
 * Created by Administrator on 2018/1/24.
 */
/**
 * Created by Administrator on 2018/1/24.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Link,IndexLink } from 'react-router';
//

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {articles: []};
  }

  componentDidMount() {
    var url = "http://localhost:8080/api/article/" + this.props.params.lv + "/" + this.props.params.sort;
    this.getArticleList(url);
  }
  getArticleList(url){
    $.get(url, (result)=> {
        if (result.status == 200) {
          console.log(result);
          this.setState({
            articles: result.data
          })
        }
      }
    )
  }
  componentWillReceiveProps(nextProps) {
    var url = "http://localhost:8080/api/article/" + nextProps.routeParams.lv + "/" + nextProps.routeParams.sort;
    this.getArticleList(url);
  }

  render() {
    return (
      <div className="column">
        {
          this.state.articles.map((article)=> {
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
                  <time className="is-pulled-right is-size-7">发表时间:{new Date(article.createTime).toLocaleString()}
                  </time>
                </Link>
              </div>
            )
          })}

      </div>
    );
  }
}





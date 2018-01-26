/**
 * Created by Administrator on 2018/1/24.
 */
/**
 * Created by Administrator on 2018/1/24.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import Page from  './Page.js'
import {Link,IndexLink } from 'react-router';

export default class ArticleListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      pageSize:4,
      pageNum:1,
      articleAmount:0
    };
  }

//总共有多少条数据，本页的数据
  componentDidMount() {
    //let url1 = "http://localhost:8080/api/article/" + this.props.params.lv + "/" +
    //  this.props.params.sort+"?pageNum="+this.state.pageNum+"&pageSize="+this.state.pageSize;
    //let url2 =  "http://localhost:8080/api/articleAmount/" + this.props.params.lv + "/" + this.props.params.sort;
    this.getArticleList();
    this.getArticleAmount();
  }

  getArticleList=()=> {
    let url1 = "http://localhost:8080/api/article/" + this.props.params.lv + "/" +
      this.props.params.sort+"?pageNum="+this.state.pageNum+"&pageSize="+this.state.pageSize;
    $.get(url1, (result)=> {
        if (result.status == 200) {
          this.setState({
            articles: result.data
          })
        }
      }
    )
  };
  getArticleAmount=()=> {
    let url2 =  "http://localhost:8080/api/articleAmount/" + this.props.params.lv + "/" + this.props.params.sort;
    $.get(url2, (result)=> {
        if (result.status == 200) {
          this.setState({
            articleAmount: result.data
          })

        }
      }
    )
  };

  componentWillReceiveProps(nextProps) {
    let url = "http://localhost:8080/api/article/" + nextProps.routeParams.lv + "/" + nextProps.routeParams.sort+"?pageNum="+this.state.pageNum+"&pageSize="+this.state.pageSize;
    this.getArticleList(url);
  }

  handlePageChange=(page)=>{//获得点击的页码，将其设置进状态

    let url3 = "http://localhost:8080/api/article/" + this.props.params.lv + "/" +
      this.props.params.sort+"?pageNum="+page+"&pageSize="+this.state.pageSize;
    $.get(url3, (result)=> {
        if (result.status == 200) {
          this.setState({
            articles: result.data,
            pageNum: page
          });

        }
      }
    )

  };
  render() {
    return (
      <div>
        <ArticleList articles = {this.state.articles}/>
        <Page pageSize={this.state.pageSize} pageNum={this.state.pageNum} articleAmount={this.state.articleAmount} handlePageChange={this.handlePageChange}/>
      </div>
    )
  }
}

class ArticleList extends React.Component {


  render() {
    return (
      <div className="column">
        {
          this.props.articles.map((article)=> {
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




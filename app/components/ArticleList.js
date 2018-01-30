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
import URL from './URL';

export default class ArticleListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      //以下状态传递给分页组件，使其发生变化（可尝试移出state外使用）
      pageSize: 4,
      pageNum: 1,
      articleAmount: 0
    };
  }

  /**
   * URL1:分页获取当前分类的文章列表
   * URL2:获取当前分类的文章总数
   */
  componentDidMount() {
    let url1 = URL.articleURL + this.props.params.lv + "/" +
      this.props.params.sort + "?pageNum=" + this.state.pageNum + "&pageSize=" + this.state.pageSize;
    let url2 = URL.articleAmountURL + this.props.params.lv + "/" + this.props.params.sort;
    this.setArticleAmountAndList(url1, url2)
  }

  /**
   * 获取文章列表的信息
   * @param url
   */
  getArticleList = (url)=> {
    $.get(url, (result)=> {
        if (result.status == 200) {
          this.setState({
            articles: result.data,
            pageNum: 1
          });
        }
      }
    )
  };
  /**
   * 获取文章总数
   * @param url
   */
  getArticleAmount = (url)=> {
    $.get(url, (result)=> {
        if (result.status == 200) {
          this.setState({
            articleAmount: result.data
          })
        }
      }
    )
  };
  /**
   * 获取文章列表的信息Promise
   * @param url
   */
  getArticleListPromise = (url)=> {
    return new Promise(function (resolve, reject) {
      $.get(url, (result)=> {
          if (result.status == 200) {
            resolve(result.data);
          } else {
            reject("getArticleListPromise出错,75行");
          }
        }
      )
    });
  };
  /**
   * 获取文章总数Promise
   * @param url
   */
  getArticleAmountPromise = (url)=> {
    return new Promise(function (resolve, reject) {
      $.get(url, (result)=> {
          if (result.status == 200) {
            resolve(result.data);
          } else {
            reject("getArticleAmountPromise出错，91行");
          }
        }
      )
    });
  };

  setArticleAmountAndList = (url1, url2)=> {
    Promise.all([
      this.getArticleListPromise(url1),
      this.getArticleAmountPromise(url2)
    ]).then(([articles,articleAmount])=> {
      this.setState({
        articleAmount: articleAmount,
        articles: articles,
        pageNum: 1
      })
    }).catch(e => console.log(e));
  }


  /**
   * 组件参数发生变更时候调用（本处用于url参数变更时，请求新的文章信息）
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    let url1 = URL.articleURL + nextProps.routeParams.lv + "/" + nextProps.routeParams.sort + "?pageNum=" + this.state.pageNum + "&pageSize=" + this.state.pageSize;
    let url2 = URL.articleAmountURL + nextProps.routeParams.lv + "/" + nextProps.routeParams.sort;
    this.setArticleAmountAndList(url1, url2)
  }

  /**
   * 获得点击的页码，向后台查询新数据，并将其设置进状态
   * 本方法传递给子组件
   * @param page 子组件传递上来
   */
  handlePageChange = (page)=> {
    let url3 = URL.articleURL + this.props.params.lv + "/" +
      this.props.params.sort + "?pageNum=" + page + "&pageSize=" + this.state.pageSize;
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
        <ArticleList articles={this.state.articles}/>
        <Page pageSize={this.state.pageSize} pageNum={this.state.pageNum} amount={this.state.articleAmount}
              handlePageChange={this.handlePageChange}/>
      </div>
    )
  }
}

class ArticleList extends React.PureComponent {

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




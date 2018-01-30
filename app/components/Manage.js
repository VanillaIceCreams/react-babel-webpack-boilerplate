/**
 * Created by Administrator on 2018/1/27.
 */
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
import {browserHistory} from 'react-router';
import URL from './URL';


export default class ManageArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  /**
   * URL1:分页获取当前分类的文章列表
   * URL2:获取当前分类的文章总数
   */
  componentDidMount() {
    this.getArticleList(URL.articleURL);
  }

  /**
   * 获取文章列表的信息
   * @param url
   */
  getArticleList = (url)=> {
    $.get(url, (result)=> {
        if (result.status == 200) {
          this.setState({
            articles: result.data
          });
        }
      }
    )
  };
  deleteArticle= (e)=> {
    let articleId = e.target.id;
    if(confirm("确定删除《"+e.target.title+"》吗"))//二次确认，因为后面只有一行代码了，就不加大括号了
    $.ajax({
      type: 'delete',
      contentType: 'application/json;charset=UTF-8',
      dataType: "json",
      url: URL.articleURL,
      data: articleId,
      success: (result)=> {
        alert("删除成功");
        let newArticles = this.state.articles.filter((article)=>{
          if(article.articleId==articleId){return false}
          return true
        });
        this.setState({
          articles: newArticles
        });


      },
      error: (result)=> {
        alert("删除失败");
      }
    });
  };
  render() {
    return (
      <div className="column">
        <h1 className="title">后台管理——文章列表</h1>
        {
          this.state.articles.map((article)=> {
            return (

              <div className="box" key={article.articleId}>

                <article className="media">
                  <div className="media-left">
                    <figure className="image is-64x64">
                      <img src={article.imageLarge}/>
                    </figure>
                  </div>
                  <Link to={"/article/"+article.articleId} style={{width:"100%"}}>
                    <div className="media-content">
                      <div className="content">
                        <p>
                          <strong >{article.title}</strong>
                          <br/>
                          {article.overview}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="media-right">
                    <div className="content">
                      <Link to={"/alter/"+article.articleId} className="button is-success is-outlined">修改</Link>
                      <a className="button is-danger is-outlined" onClick={this.deleteArticle} id={article.articleId} title={article.title}>删除</a>
                    </div>
                  </div>
                </article>
                <time className="is-pulled-right is-size-7">发表时间:{new Date(article.createTime).toLocaleString()}
                </time>

              </div>
            )
          })}

      </div>
    );
  }
}




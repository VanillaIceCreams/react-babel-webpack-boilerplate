
/**
 * Created by Administrator on 2018/1/17.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import '../css/react-mde-all.css'
import prism from '../md/prism.js'
import {browserHistory} from 'react-router';
import URL from './URL';


export default class WritingPage extends Component {

  render() {
    return (
      <div>
        <SomeArticleElements articleId = {this.props.params.articleId} />
        <MarkDown ref="MarkDown"/>
      </div>
    )
  }
}
class SomeArticleElements extends Component {
  constructor(props) {
    super(props);
    this.state = {listSortList: [], article: {},sortTwos:[]};
  }

  getListSortList=(url)=>{
    return new Promise(function (resolve, reject) {
      $.get(url, (result)=> {
          if (result.status == 200) {
            resolve(result.data);
          } else {
            reject("getListSortList出错");
          }
        }
      )
    });
  };
  getArticle=(url)=>{
    return new Promise(function (resolve, reject) {
      $.get(url, (result)=> {
          if (result.status == 200) {
            resolve(result.data);
          } else {
            reject("getArticle出错");
          }
        }
      )
    });
  };
  setArticleAndListSortList = (url1, url2)=> {
    Promise.all([
      this.getListSortList(url1),
      this.getArticle(url2)
    ]).then(([listSortList,article])=> {
      for(let SortList of listSortList){
        if(SortList.sort1.sortId==article.sortOne){
          this.setState({
            listSortList: listSortList,
            article: article,
            sortTwos:SortList.sort2s
          });

        }
      }

      /**
       * 下面2行代码需要改进（作用是将文章正文设置进相应位置）
       */
      $("#ta1").val(article.markdown);
      $(".mde-preview-content").html(article.content);
    }).catch(e => console.log(e));
  };

  componentDidMount() {
    this.setArticleAndListSortList( URL.listSortListURL,URL.articleURL + this.props.articleId)
  }

  submit = ()=> {

    /*表单验证开始*/
    let flag = true;
    if (!this.state.article.title) {
      $('#title').easytip().show();
      flag = false;
    }
    if (!this.state.article.overview) {
      $('#overview').easytip().show();
      flag = false;
    }
    if (!this.state.article.sortTwo) {
      $('#sortTwo').easytip().show();
      flag = false;
    }
    /*表单验证结束*/
    if (flag) {
      /*
      * 这两句也需要改进
      * */
      this.state.article.markdown = $("#ta1").val();
      this.state.article.content = $(".mde-preview-content").html();

      $.ajax({
        type: 'post',
        contentType: 'application/json;charset=UTF-8',
        dataType: "json",
        url: "http://localhost:8080/api/article",
        data: JSON.stringify(this.state.article),//必须是json格式！
        success: (result)=> {
          alert("提交成功");
          browserHistory.push("/manage")
        },
        error: (result)=> {
          alert("服务器出错");
        }
      });
    }
  };
  changeValue=(targetId)=>{
    let newarticle={};
    if(targetId=="title"){
      newarticle= Object.assign({}, this.state.article);
      newarticle.title=this.refs.title.value;
      this.setState({
        article:  newarticle
      })
    }else if(targetId=="overview"){
      newarticle= Object.assign({}, this.state.article);
      newarticle.overview=this.refs.overview.value;
      this.setState({
        article: newarticle
      })
    }
    else if(targetId=="sortOne"){
      for(let SortList of this.state.listSortList){
        if(SortList.sort1.sortId==this.refs.sortOne.value){
          newarticle= Object.assign({}, this.state.article);
          newarticle.sortOne=this.refs.sortOne.value;
          newarticle.sortTwo=SortList.sort2s[0].sortId;
          this.setState({
            sortTwos: SortList.sort2s,
            article: newarticle
          })
        }
      }
    }
    else if(targetId=="sortTwo"){
      newarticle= Object.assign({}, this.state.article);
      newarticle.sortTwo=this.refs.sortTwo.value;
      this.setState({
        article: newarticle
      })
    }else if(targetId=="imageLarge"){
      newarticle= Object.assign({}, this.state.article);
      newarticle.imageLarge=this.refs.imageLarge.value;
      this.setState({
        article: newarticle
      })
    }else{}
  };
  render() {
    return (
      <div >
        {/*标题，总述，分类，提交，隐藏的ID*/}
         <input className="input is-invisible" type="text" ref="atricleId" disabled/>

        <div className="field">
          <div className="control">
            <input className="input  is-medium" type="text" placeholder="图片链接" ref="imageLarge" id="imageLarge"
                   value={this.state.article.imageLarge}
                   onChange={()=>this.changeValue("imageLarge")}/>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <input className="input  is-medium" type="text" placeholder="标题" ref="title" id="title"
                   data-easytip="position:top;class:easy-black;disappear:1000;speed:1000;"
                   data-easytip-message="请填写标题"
                   value={this.state.article.title}
                   onChange={()=>this.changeValue("title")}/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea className="textarea is-medium" type="text" placeholder="概述" ref="overview" id="overview"
                      data-easytip="position:top;class:easy-black;disappear:1000;speed:1000;"
                      data-easytip-message="请填写概述"
                      value={this.state.article.overview}
                      onChange={()=>this.changeValue("overview")}/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <div className="select">
              <select ref="sortOne" onChange={()=>this.changeValue("sortOne")}>
                {this.state.listSortList.map((sortOne)=> {
                  if(sortOne.sort1.sortId==this.state.article.sortOne ){
                    return <option value={sortOne.sort1.sortId} key={sortOne.sort1.sortId} selected>{sortOne.sort1.name}</option>
                  }
                  return <option value={sortOne.sort1.sortId} key={sortOne.sort1.sortId}>{sortOne.sort1.name}</option>
                })}
              </select>
            </div>
            <div className="select">

              <select ref="sortTwo" id="sortTwo"
                      data-easytip="position:right;class:easy-black;disappear:1000;speed:1000;"
                      data-easytip-message="请选择分类"
                      onChange={()=>this.changeValue("sortTwo")}>
                {this.state.sortTwos.map((sortTwo)=> {
                  if(sortTwo.sortId==this.state.article.sortTwo ){
                    return  <option value={sortTwo.sortId} key={sortTwo.sortId} selected>{sortTwo.name}</option>
                  }
                  return <option value={sortTwo.sortId} key={sortTwo.sortId}>{sortTwo.name}</option>
                })}
              </select>
            </div>
            <a className="button is-danger is-outlined pull-right" onClick={this.submit}>
              <span className="icon is-small">
                <i className="fa fa-check"></i>
              </span>
              <span >提交</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}
class MarkDown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reactMdeValue: {text: '', selection: null},
    };
  }

  handleValueChange = (value) => {
    this.setState({reactMdeValue: value});
  };
  componentDidUpdate = ()=> {
    //refs万岁！！！
    $(this.refs.ReactMde.preview).find("code").each(function (i, block) {
      Prism.highlightElement(block);
    });
  };

  render() {
    return (
      <div className="markdownContainer" ref="container">
        <ReactMde
          textAreaProps={{
                        id: 'ta1',
                        name: 'ta1'
                    }}

          value={this.state.reactMdeValue}
          onChange={this.handleValueChange}
          ref= "ReactMde"
          commands={ReactMdeCommands.getDefaultCommands() }
        />
      </div>
    );
  }
}

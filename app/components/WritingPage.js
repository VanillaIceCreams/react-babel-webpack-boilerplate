/**
 * Created by Administrator on 2018/1/17.
 */
/**
 * Created by Administrator on 2018/1/17.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactMde, { ReactMdeCommands } from 'react-mde';
import '../css/react-mde-all.css'
import prism from '../md/prism.js'
import {browserHistory} from 'react-router';


export default class WritingPage extends Component {
  render() {
    return (
      <div>
        <SomeArticleElements/>
        <MarkDown/>
      </div>
    )
  }
}
class SomeArticleElements extends Component {
  constructor(props) {
    super(props);
    this.state = {sortOneList: [], sortTwoList: []};
  }

  componentDidMount() {//获取一级分类
    $.get("http://localhost:8080/api/sort/one", (result)=> {
        if (result.status == 200) {
          this.setState({
            sortOneList: result.data
          })
        }
      }
    )
  }

  getSortTwo = (e)=> {
    $.get("http://localhost:8080/api/sort/two", {parent: e.target.value}, (result)=> {
        if (result.status == 200) {
          this.setState({
            sortTwoList: result.data
          })
        }
      }
    )

  };
  submit = ()=> {


    let article = {
      title: this.refs.title.value,
      overview: this.refs.overview.value,
      sortOne: $(this.refs.sortOne).find("option:selected").val(),
      sortTwo: $(this.refs.sortTwo).find("option:selected").val()
    };
    /*表单验证开始*/
    let flag = true;
    if (!article.title.trim().length) {
      $('#title').easytip().show();
      flag = false;
    }
    if (!article.overview.trim().length) {
      $('#overview').easytip().show();
      flag = false;
    }
    if (!article.sortTwo) {
      $('#sortTwo').easytip().show();
      flag = false;
    }
    return false;
    /*表单验证结束*/
    if (flag) {
      article.markdown = $("#ta1").val();
      article.content = $(".mde-preview-content").html();
      $.ajax({
        type: 'put',
        contentType: 'application/json;charset=UTF-8',
        dataType: "json",
        url: "http://localhost:8080/api/article",
        data: JSON.stringify(article),//必须是json格式！
        success: (result)=> {
          alert("提交成功");
          browserHistory.push("/article/" + result.data)
        },
        error: (result)=> {
          alert("服务器出错");
        }
      });
    }
  };

  render() {
    return (
      <div >
        {/*标题，总述，分类，提交，隐藏的ID*/}
        <input className="input is-invisible" type="text" ref="atricleId" disabled/>
        <div className="fid">
          <div className="control">
            <input className="input  is-medium" type="text" placeholder="标题" ref="title" id="title"
                   data-easytip="position:top;class:easy-black;disappear:1000;speed:1000;"
                   data-easytip-message="请填写标题"/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <textarea className="textarea is-medium" type="text" placeholder="概述" ref="overview" id="overview"
                      data-easytip="position:top;class:easy-black;disappear:1000;speed:1000;"
                      data-easytip-message="请填写概述"/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <div className="select">
              <select ref="sortOne" onChange={this.getSortTwo}>
                {this.state.sortOneList.map((sortOne)=> {
                  return <option value={sortOne.sortId}>{sortOne.name}</option>
                })}
              </select>
            </div>
            <div className="select">

              <select ref="sortTwo" id="sortTwo"
                      data-easytip="position:right;class:easy-black;disappear:1000;speed:1000;"
                      data-easytip-message="请选择分类">
                {this.state.sortTwoList.map((sortTwo)=> {
                  return <option value={sortTwo.sortId}>{sortTwo.name}</option>
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
    $(this.refs.container).find("code").each(function (i, block) {
      Prism.highlightElement(block);
    });
  };

  render() {
    return (
      <div className="markdownContainer" ref="container">
        <ReactMde
          textAreaProps={{
                        id: 'ta1',
                        name: 'ta1',
                    }}

          value={this.state.reactMdeValue}
          onChange={this.handleValueChange}
          commands={ReactMdeCommands.getDefaultCommands()}
        />
      </div>
    );
  }
}

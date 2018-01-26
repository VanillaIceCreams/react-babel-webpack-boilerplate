/**
 * Created by Administrator on 2018/1/24.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'



//let url = "http://localhost:8081/test/sort.json";
export default class Page extends React.Component {

  handlePageClick=(event)=>{
    this.props.handlePageChange(parseInt(event.target.innerHTML) )
  };
  //如果(当前页-1)>1,那么1...now-1,now
  //如果(当前页+1)<totalPage,那么now,now+1...totalPage
  render() {

    let totalPage = parseInt(this.props.articleAmount/this.props.pageSize+1);

    let pre=[];
    let last=[];

    for(let i=this.props.pageNum;i>0;i--) {

      if(i==this.props.pageNum){//给当前页加高亮并且不许点击
        pre.unshift(<li><a className="pagination-link is-current" >{i}</a></li>);
      }else{
        pre.unshift(<li><a className="pagination-link" onClick={this.handlePageClick}>{i}</a></li>);
      }
      if(pre.length==2&&i>1){
        pre.unshift(<li><span className="pagination-ellipsis">&hellip;</span></li>);
        pre.unshift( <li><a className="pagination-link" onClick={this.handlePageClick}>1</a></li>);
        break;
      }
    }
   // aria-current="page"
    for(let i=this.props.pageNum+1;i<totalPage+1;i++){
      last.push(<li><a className="pagination-link" onClick={this.handlePageClick}>{i}</a></li>);
      if(last.length==2&&i<totalPage-1){
        last.push(<li><span className="pagination-ellipsis">&hellip;</span></li>);
        last.push( <li><a className="pagination-link" onClick={this.handlePageClick}>{totalPage}</a></li>);
        break;
      }
    }

    return (
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
          {pre}
          {last}
        </ul>
      </nav>
    );
  }
}



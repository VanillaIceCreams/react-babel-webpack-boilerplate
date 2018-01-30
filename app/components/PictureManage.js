/**
 * Created by Administrator on 2018/1/29.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Link,IndexLink } from 'react-router';
import URL from './URL';


export default  class ImageManage extends React.Component {
  addImage=(data)=>{

    this.refs.ImageList.addImage(data);
  };
  render() {
    return (
      <div>
        <OnloadModal addImage = {this.addImage}/>
        <ImageList ref="ImageList"/>
      </div>)
  }
}
class OnloadModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {img64: ""};
    this.f = {};//拖拽上来的文件存这里，方便ajax提交
  }

  componentDidMount() {
    this.refs.box.ondragover = (e)=> {
      e.preventDefault();
    };
    this.refs.box.ondrop = (e)=> {
      e.preventDefault();
      if (!this.state.img64) {//简单处理下，如果有图片了就不许拖入了
        this.f = e.dataTransfer.files[0];//获取到第一个上传的文件对象
        var fr = new FileReader();//实例FileReader对象
        fr.readAsDataURL(this.f);//把上传的文件对象转换成url
        fr.onload = (e)=> {
          var Url = fr.result;//上传文件的URL
          this.setState({
            img64: Url
          })
        }
      }
    }
  }

  switchModal = ()=> {
    var onloadModal = $("#onloadModal");
    if (onloadModal.hasClass("is-active")) {
      onloadModal.removeClass("is-active")
    } else {
      onloadModal.addClass("is-active")
    }
  };
  clearImage = ()=> {
    this.setState({
      img64: ""
    })
  };
  uploadImage = ()=> {
    //判断有没有上传文件
    if (this.state.img64 =="") {
      return false
    }

    var form = new FormData();
    form.append("file", this.f);
    $.ajax({
      processData: false,// 告诉jQuery不要去处理发送的数据
      contentType: false,// 告诉jQuery不要去设置Content-Type请求头
      type: 'put',
      url: URL.imageURL,
      data: form,
      success: (result)=> {
        if (result.status == 200) {
          alert("提交成功");
          this.clearImage();
          this.switchModal();
          this.props.addImage(result.data)
        }
      },
      error: (result)=> {
        alert("服务器出错");
      }
    });
  };
  switchDelete=(e)=>{
    var deletes= $(".token");
    if(e.target.innerText=="管理图片"){
      deletes.removeClass("is-invisible");
      e.target.innerText="退出管理";
      $("#onloadButton").attr("disabled","true")
    }else{
      deletes.addClass("is-invisible");
      e.target.innerText="管理图片";
      $("#onloadButton").removeAttr("disabled")
    }

  }
  render() {
    return (
      <div>
        <div>
          <button onClick={this.switchModal} className="button is-danger is-large pull-right" id="onloadButton" >上传图片</button>
          <div style={{clear:"both",marginTop:"10px"}}></div>
          <button onClick={this.switchDelete} className="button is-danger is-large pull-right" >管理图片</button>
        </div>

        <div className="modal" id="onloadModal">
          <div className="modal-background" onClick={this.switchModal}></div>
          <div className="modal-card">
            <section className="modal-card-body is-paddingless">
              <button className="modal-close is-large" aria-label="close" onClick={this.switchModal}/>
              <div id="box" ref="box" style={{minHeight:"200px",backgroundColor:"#00000014"}}>
                {this.state.img64 ? <img src={this.state.img64} style={{margin:"0 auto",display:"block"}}/> :
                  <h3 className="title has-text-centered">请将图片拖入</h3>}
              </div>
            </section>
            <footer className="modal-card-foot">
              <div className="has-text-centered" style={{margin:"0 auto"}}>
                <button className="button is-success " onClick={this.uploadImage}>上传</button>
                <button className="button " onClick={this.clearImage}>清空</button>
              </div>
            </footer>
          </div>
        </div>
      </div>)
  }
}
class ImageList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {images: []};
  }
  addImage=(data)=>{
    this.setState({
      images: [...this.state.images,{imageId:data}]
    })
  }
  componentDidMount() {
    $.get(URL.imageURL,  (result)=> {//缺问号
      this.setState({
        images: result.data
      })
    })
  }
  switchImageModal=(url)=>{
    let imageModal = $(this.refs.imageModal);
    if( imageModal.hasClass("is-active")){
      imageModal.removeClass("is-active")
    }else{
      imageModal.addClass("is-active");
      this.refs.bigImage.src  = url;
    }
  };
  deleteImage=(e)=>{
    var imageId =e.target.id;
    $.ajax({
      type: 'delete',
      contentType: 'application/json;charset=UTF-8',
      dataType: "json",
      url: URL.imageURL,
      data: imageId,
      success: (result)=> {
        if (result.status == 200) {
          var newimages =  this.state.images.filter((image)=>{
            if(image.imageId==imageId){
              return false
            }
            return true;
          });
          this.setState({
            images: newimages
          });

        }else{
          alert("删除失败");
        }
      },
      error: (result)=> {
        alert("服务器出错");
      }
    });
  };
  render() {
    return (<div>

      <div className="columns is-mobile is-multiline is-centered" id="imageContain">
        {
          this.state.images.map((image)=> {
            return (
              <div className="column is-narrow">
                <figure className="image is-128x128">
                  <a className={"delete pull-right token is-invisible" } id={image.imageId} onClick={this.deleteImage}/>
                  <a onClick={()=>this.switchImageModal(URL.imagePreURL+image.imageId)}><img src={URL.imagePreURL+image.imageId} /></a>
                </figure>
              </div>)
          })
        }
        <div className="modal" ref="imageModal">
          <div className="modal-background" onClick={this.switchImageModal}></div>
          <div className="modal-content">
            <p className="image">
              <img src="" ref="bigImage"/>
            </p>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={this.switchImageModal}/>
        </div>

      </div>
    </div>)
  }
}





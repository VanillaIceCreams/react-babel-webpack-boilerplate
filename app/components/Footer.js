/**
 * Created by Administrator on 2018/1/24.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'



export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>Bulma</strong> is <a href="https://jgthms.com">a framework</a> which only depend on css
          </p>
        </div>
      </div>
      </footer>
    );
  }
}


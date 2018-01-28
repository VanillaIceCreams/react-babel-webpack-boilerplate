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
            <strong>This Blog</strong> is a fucking project!!!
          </p>
        </div>
      </div>
      </footer>
    );
  }
}


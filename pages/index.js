import React, { Component } from 'react'
import Router from 'next/router'
import * as Auth from '../utils/auth'
import { Dimmer, Loader } from 'semantic-ui-react'


class index3 extends Component {
  componentDidMount() {
    document.title = 'Auto-System - Home'
    if (Auth.getToken() || localStorage.getItem('rules')) {
      Router.push('/goat')
      return
    }
    if (!Auth.getToken() && !localStorage.getItem('rules')) {
      Router.push('/rules')
    }
  }
  render() {
    return (
      <Dimmer active>
        <Loader inverted size="big">
          Loading
        </Loader>
      </Dimmer>
    )
  }
}

export default index3

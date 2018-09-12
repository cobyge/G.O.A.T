import React, { Component } from 'react'
import Router from 'next/router'
import * as Auth from '../utils/auth'
import { Dimmer, Loader } from 'semantic-ui-react'


class index3 extends Component {
	componentDidMount() {
		document.title = 'Auto-System - Home'
		Router.push('/goat')
		return
		
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
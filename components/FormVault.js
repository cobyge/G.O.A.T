import React from 'react'
import {
  Button,
  Form,
  Segment,
  Radio,
  Message,
  Dimmer,
  Header,
  Icon,
  Checkbox
} from 'semantic-ui-react'
import axios from 'axios'
import { getToken } from '../utils/auth'

var TAGS = []
var i = 0

export default class TagsForm extends React.Component {
  constructor() {
    super()
    this.state = {
      form: {},
      error: false,
      sent: false,
      tags: [],
      loading: false
    }
  }


  componentDidMount() { 

  }
    
  handleSubmit(e) {}
  handleClose() {location.reload()}
//When a box is clicked, if the box was empty, checks the box just clicked.  Otherwise (if the box was selected), it unchecks the box.  It then calls handleTags, which is explained in the code in index.js where the function is defined.
  handleChange = (answ, tag) => {
    if (!this.state.tags.includes(tag.value))
      this.setState({
        tags: [
          ...this.state.tags, tag.value]
      })
    else {
      this.setState({ tags: this.state.tags.filter(i => i !== tag.value) })
    }
    axios({
      method: 'POST',
      url: `/handleTags`,
      data: { tag: tag.value, token: getToken() }
    })
  }
//Function to capitalize and seperate by space Labels
  capitalize(str){
	str = str.split('-').join(' ')
	return str.charAt(0).toUpperCase() + str.slice(1)}
//All of this controls the actual webpage content.
  render() {
	
//This compares a list of roles the user currently has, with the available options (From the category), and selects the checkboxes a member has.  Also gets the list of channels to display.
	axios({
		method: 'GET',
		url: `/serverChannels`}).then(function(response){
		TAGS = []
		for (i in response.data){
			TAGS.push(response.data[i])
		}
	}).catch(err => console.log(err)).then(
	axios({
		method: 'GET',
		url: `/userTags/${this.props.userid}`
		}).then(({ data }) => {
			this.setState({ tags: data.filter(i => (TAGS.includes(i)))})
			this.setState({ loading: false })
		}).catch(err => console.log(err)))
			
	return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Segment 
            style={{ margin: '50px' }}
            loading={this.state.loading}
            raised
            inverted color='black'
			secondary
          >
            <Form.Group unstackable>
                  <div>
                      {TAGS.sort().map(tag => {
                        return (
                          <Form.Field
                            control={Checkbox}
                            label={this.capitalize(tag)}
                            value={tag}
                            key={tag}
                            checked={this.state.tags.includes(tag)}
                            onChange={this.handleChange.bind(this)}
                          />
                        )
                      })}
                  </div>
            </Form.Group>
          </Segment>
        </Form>
        <style jsx global>{`
          .field label {
            color: #ffffff !important;
          }
          .segment {
            padding: 20px !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

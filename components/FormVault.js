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
      loading: true
    }
  }


  componentDidMount() {
//Gets a list of all the roles that the user currently has in the server.  Then it only takes the roles that are both in TAGS, and in the server, and it activates them on the webpage.  
    TAGS = this.props.taglist
	axios({
      method: 'GET',
      url: `/userTags/${this.props.userid}`
    }).then(({ data }) => {
      this.setState({ tags: data.filter(i => (TAGS.includes(i)))})
      this.setState({ loading: false })
    }).catch(err => console.log(err))
  }
  handleSubmit(e) {}
  handleClose() {
    location.reload()
  }
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
//Function to capitalize Labels
  capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1)}
//All of this controls the actual webpage content (After being logged in).  Need to change this to display my new TagCategories correctly.
  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Segment
            style={{ margin: '50px' }}
            loading={this.state.loading}
            raised
            inverted
          >
            <Form.Group unstackable>
                  <div>
                    <Form.Field>
                      {this.props.taglist.map(tag => {
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
                    </Form.Field>
                  </div>
            </Form.Group>
          </Segment>
        </Form>
        <style jsx global>{`
          .field label {
            color: #1bff80 !important;
          }
          .segment {
            padding: 20px !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

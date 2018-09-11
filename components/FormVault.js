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
var j = 0


  
  
//Here tags are sorted into their games (Probably useless unless we have game categories), and put into the page
const TagCategories = {

  'A': [
    'Enclave',
    'Apple',
    'Shi',
    'Vault City',
    'Tanker Vagrants',
    'Raider Gangs'
  ],
  'Fallout 3': [
    'Enclave',
    "Brotherhood of Steel (Lyon's Pride)",
    'Regulators (FO3)',
    'Tunnel Snakes',
    "Reilly's Rangers",
    'Talon Company',
    'Children of the Atom',
    'Brotherhood of Steel (Outcasts)',
    'Raider Gangs'
  ],
  'Fallout: New Vegas': [
    'Independent Vegas (Yes Man)',
    'Mr. House',
    "Caesar's Legion",
    'New California Republic',
    'Followers of the Apocalypse',
    'Kings',
    'Great Khans',
    'Boomers',
    'Raider Gangs',
    'Sorrows',
    'Twisted Hairs'
  ],
  'Fallout 4': [
    'Railroad',
    'Minutemen',
    'Institute',
    "Brotherhood of Steel (Maxson's Pride)",
    'Atom Cats',
    'Children of the Atom',
    'Raider Gangs'
  ],
  'Fallout Tactics': [
  'Brotherhood of Steel (Midwest Chapter)'
  ]
}

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

//Gets a list of all the roles that the user currently has in the server.  Then it only takes the roles that are both in TAGS, and in the server, and it activates them on the webpage.
  componentDidMount() {
      
    //Gets list of channels in specific category in Server.  Also appends the EXTRA_TAGS environment variable
    axios({
      method: 'GET',
      url: `/serverChannels`}).then(function(response){
          TAGS = []
          TAGS.push(response.data)
          }).catch(err => console.log(err))
          
    axios({
      method: 'GET',
      url: `/userTags/${this.props.userid}`
    }).then(({ data }) => {
      this.setState({ tags: data.filter(i => TAGS.includes(i)) })
      this.setState({ loading: false })
    }).catch(err => console.log(err))
  }
  handleSubmit(e) {}
  handleClose() {
    location.reload()
  }
//When a box is clicked, if the box was empty, unchecks 'Not specified', and checks the box just clicked.  Otherwise (if the box was selected), it unchecks the box.  It then calls handleTags, which is explained in the code in index.js where the function is defined.
  handleChange = (answ, tag) => {
    if (!this.state.tags.includes(tag.value))
      this.setState({
        tags: [
          ...this.state.tags.filter(i => i !== 'Not Specified'),
          tag.value
        ]
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
  
//Deselects all roles except for age.
  handleNotSpecified() {
    this.setState({
      tags: [
        ...this.state.tags.filter(i => i === '+18' || i === '-18'),
        'Not Specified'
      ]
    })

    axios({
      method: 'POST',
      url: `/handleTags`,
      data: { tag: 'Not Specified', token: getToken() }
    }).catch(err => console.log(err))
  }
//Handles changing the age.  Just makes sure that only one (or zero) of the two age roles is selected.
  handleAge(e, { value }) {
    if (value === '+18') {
      this.setState({
        tags: [...this.state.tags.filter(i => i !== '-18'), '+18']
      })
    } else if (value === 'NoAge') {
      this.setState({
        tags: [...this.state.tags.filter(i => i !== '+18' && i !== '-18')]
      })
    } else {
      this.setState({
        tags: [...this.state.tags.filter(i => i !== '+18'), '-18']
      })
    }
    axios({
      method: 'POST',
      url: `/handleTags`,
      data: { tag: value, token: getToken() }
    }).catch(err => console.log(err))
  }
  
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
              {Object.keys(TagCategories).map(game => {
                return (
                  <div
                    style={{
                      paddingRight: '10px',
                      paddingBottom: '10px',
                      color: '#1bff80'
                    }}
                    key={game}
                  >
                    <Form.Field>
                      <label style={{ color: '#1bff80' }}>
                        <b>> {game}</b>
                      </label>
                      {TagCategories[game].map(tag => {
                        return (
                          <Form.Field
                            control={Checkbox}
                            label={tag}
                            value={tag}
                            key={tag}
                            checked={this.state.tags.includes(tag)}
                            onChange={this.handleChange.bind(this)}
                          />
                        )
                      })}
                    </Form.Field>
                  </div>
                )
              })}
            </Form.Group>
            <div style={{ textAlign: 'center' }}>
              <Form.Field
                control={Checkbox}
                label="Not Specified"
                value="Not Specified"
                checked={this.state.tags.includes('Not Specified')}
                onChange={this.handleNotSpecified.bind(this)}
              />
            </div>
          </Segment>
          <Segment
            style={{ margin: '50px' }}
            inverted
            loading={this.state.loading}
          >
            <Form.Field>
              <label style={{ color: '#1bff80' }}>> Idade</label>
              <Form.Field
                control={Radio}
                label="-18"
                value="-18"
                name="idade"
                checked={this.state.tags.includes('-18')}
                onChange={this.handleAge.bind(this)}
              />
              <Form.Field
                control={Radio}
                label="+18"
                value="+18"
                name="idade"
                checked={this.state.tags.includes('+18')}
                onChange={this.handleAge.bind(this)}
              />
              <Form.Field
                control={Radio}
                label="Prefer not to answer"
                value="NoAge"
                name="idade"
                checked={
                  !this.state.tags.includes('+18') &&
                  !this.state.tags.includes('-18')
                }
                onChange={this.handleAge.bind(this)}
              />
            </Form.Field>
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

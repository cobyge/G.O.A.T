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


//Tags for all the games
const TAGS = [
  'Blades',
  'Regulators (FO1)',
  'Unity',
  'Brotherhood of Steel',
  'Followers of the Apocalypse',
  'Raider Gangs',
  'Enclave',
  'Shi',
  'Unity',
  'Vault City',
  'Tanker Vagrants',
  'Raider Gangs',
  'Enclave',
  "Lyon's Pride",
  'Regulators (FO3)',
  'Tunnel Snakes',
  "Reilly's Rangers",
  'Talon Company',
  'Children of the Atom',
  'Kings',
  'BoS - Outcasts',
  'Raider Gangs',
  'Independent Vegas (Yes Man)',
  'Mr. House',
  "Caesar's Legion",
  'New California Republic',
  'Followers of the Apocalypse',
  'Great Khans',
  'Boomers',
  'Brotherhood of Steel',
  'Raider Gangs',
  'Sorrows',
  'Twisted Hairs',
  'Railroad',
  'Minutemen',
  'Institute',
  "Maxson's Pride",
  'Atom Cats',
  'Outcasts',
  'Children of the Atom',
  'Raider Gangs',
  'Midwest Chapter',
  'Not Specified',
  'Not Specified',
  '+18',
  '-18',
  'Brotherhood of Steel (First Chapter)',
  "Brotherhood of Steel (Lyon's Pride)",
  'Brotherhood of Steel (Mojave Chapter)',
  "Brotherhood of Steel (Maxson's Pride)",
  'Brotherhood of Steel (Midwest Chapter)',
  'Brotherhood of Steel (Outcasts)'
]

//Here tags are sorted into their games (Probably useless unless we have game categories)
const TagCategories = {
  'Fallout 1': [
    'Blades',
    'Regulators (FO1)',
    'Unity',
    'Brotherhood of Steel (First Chapter)',
    'Followers of the Apocalypse',
    'Raider Gangs'
  ],
  'Fallout 2': [
    'Enclave',
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
    'Brotherhood of Steel (Mojave Chapter)',
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
  'Fallout Tactics': ['Brotherhood of Steel (Midwest Chapter)']
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
//Sets the 'tags' var to contain all the tags that are also in TAGS.  Gets this list from server.
  componentDidMount() {
    axios({
      method: 'GET',
      url: `/userTags/${this.props.userid}`
    }).then(({ data }) => {
      this.setState({ tags: data.filter(i => TAGS.includes(i)) })
      this.setState({ loading: false })
    })
  }
  handleSubmit(e) {}
  handleClose() {
    location.reload()
  }
//When boxes are clicked on, if the box was not 'Not Specified', then unchecks 'Not Specified', and checks the other boxes
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
//Handles the "Not Specified" button
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
    })
  }
//Handles changing the age
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
    })
  }
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

import React from 'react'
import { Image, Button, Loader, Dimmer, Container, Icon, Segment, Checkbox, Form } from 'semantic-ui-react'
import {
  refreshToken,
  getToken,
  getInfo,
  logout,
  checkMembership
} from '../utils/auth'
import axios from 'axios'

//Checks to see if there is a SITE_URL env.  If not, it uses the default localhost
const SITE_URL = process.env.SITE_URL
  ? process.env.SITE_URL
  : 'http://localhost:3000'
const CLIENT_ID = process.env.CLIENT_ID
var TAGS = []
var i = 0
var DATA = {}

//Gets token and code for user credentials
function getUrlParams(search) {
  let hashes = search.slice(search.indexOf('?') + 1).split('&')
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split('=')
    return Object.assign(params, { [key]: decodeURIComponent(val) })
  }, {})
}
   
export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedin: false,
      member: false,
	  tags: [],
      loading: true
    }
  }
  
  componentDidMount() {
	document.title = 'Auto-System'
    const { code, refresh } = getUrlParams(window.location.search)
    const token = getToken()
    if (code && refresh) {
      localStorage.setItem('token', code)
      localStorage.setItem('refresh', refresh)
      this.setState({ loggedin: true })
      this.loadInfo()
      history.replaceState(
        {},
        'Auto-System-Tags',
        '/'
      )
    } else if (token) {
      this.setState({ loggedin: true })
      refreshToken().then(data => {
        this.loadInfo()		
      })
    } else {
      this.setState({ loading: false })
    }
  }
//Loads user-info, if user is in the server, then continue, else keep this page.
  loadInfo() {
	this.getChannels()
    getInfo()
      .then(({ data }) => {
		this.setState({ user: data })
        document.title =
          'Auto-System - ' +
          data.username +
          '#' +
          data.discriminator
        
      })}
	  
  //This compares a list of roles the user currently has, with the available options (From the category), and selects the checkboxes a member has.  Also gets the list of channels to display.
	  
  getChannels(){
	var userid = ''
	getInfo().then(data => {return (data.data.id)}).then(id => 
	checkMembership().then(result => {
		if (result) {
		  axios({
			method: 'GET',
			url: `/userTags/${id}`}).then(({ data }) => {
				TAGS = data[1]
				this.setState({ tags: data[0]})
				this.setState({ member: true })
				this.setState({ loading: false })}).catch(err => console.log(err))
		}
		else{
		  this.setState({ loading: false })
		}
	}).catch(err => console.log(err))
	).catch(err => console.log(err))
  }
  
  
  onLogout() {
    logout()
    this.setState({ loggedin: false })
    document.title =
      'Auto-System - Tags'
  }

  getAvatar(){
   if (this.state.user.avatar == null){
	   return ('https://discordapp.com/assets/1cbd08c76f8af6dddce02c5138971129.png')}
	else{
		return(`https://cdn.discordapp.com/avatars/${this.state.user.id}/${this.state.user.avatar}.png`)}
	}

	
	//Function to capitalize and seperate Labels by space
  capitalize(str){
	str = str.split('-').join(' ')
	return str.charAt(0).toUpperCase() + str.slice(1)}

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
    }).catch(err => console.log(err))
  }
	
	
	
	
	
	
	
	render() {
	//Gets list of channels in specific category in Server.
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader inverted size="big">
            Loading
          </Loader>
        </Dimmer>
      )
    }
    return (
      <Container>
        {(this.state.loggedin && this.state.user && (
        <React.Fragment>
		<div className="profile">
        <Image
          size="tiny"
          rounded
          src={this.getAvatar()}
          floated="left"
          verticalAlign="top"
        />
        <React.Fragment>
          <span className="username">
            {this.state.user.username + '#' + this.state.user.discriminator}
            <br />
            <Button
              animated
              size="mini"
              color="blue"
              style={{ marginTop: '10px' }}
              onClick={() => this.onLogout()}
            >
              <Button.Content visible>Logout</Button.Content>
              <Button.Content hidden>
              <Icon name="right arrow" />
              </Button.Content>
             </Button>
          </span>
        </React.Fragment>
		</div>

		
              {(this.state.member && (
			  
			  
			  
			  
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
				      </React.Fragment>
              )) ||			  
			  <h1>You are not a member of this Discord server.  Please go to <a href="https://discordapp.com">Discord</a> and log into the account connected to the Discord server</h1>}
			</React.Fragment>
          )) || (
          <div>
            <center>
              <Image src="/static/serverIcon.png" size="medium" />
              <h1>
                Hello fellow Discord user! <br /> Welcome to the server!
              </h1>
              <p>
                Here you will be presented with a list of games, and you can choose any or all of them.  Other people can see what games you play on the Discord server.
              </p>{' '}
              <p>You can choose whichever games you want, and you can always come back to change your choice.</p>{' '}
              <br />
              <a
                href={`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${SITE_URL}/callback&response_type=code&scope=identify%20guilds`}
              >
                <Button
                  color="blue"
                  className="loginBtn"
                  inverted
                  size="massive"
                >
                  Sign in with Discord
                </Button>
              </a>
            </center>
          </div>
        )}
        <style jsx global>
          {`
            @font-face {
              font-family: 'Work Sans', sans-serif;
              src: url(../static/WorkSans-Regular.tff)
            }
            ::selection{
			  background-color: #0b67d6 !important;
			  color: #ffffff
			}
            body {
              display: flex;
              background-color: #23272A;
              justify-content: center;
              color: #ffffff;
			  font-weight: 700;
              background-repeat: no-repeat;
              background-attachment: fixed;
              font-family: 'Work Sans', sans-serif;
            }
            h1 {
              font-family: 'Work Sans', sans-serif;
            }
            .container {
              padding: 10px;
            }
            .login {
              display: flex; /* establish flex container */
              flex-direction: column; /* make main axis vertical */
              justify-content: center; /* center items vertically, in this case */
              align-items: center; /* center items horizontally, in this case */
              height: 100vh;
            }
            .notMember {
              display: flex; /* establish flex container */
              align-items: center; /* center items horizontally, in this case */
            }
            .ui.inverted.blue.button,
            .ui.inverted.blue.buttons .button {
              box-shadow: 0 0 0 2px #23272A inset !important;
			  background-color: #7289DA;
              color: #ffffff;
              font-family: 'Work Sans', sans-serif;
            }
            .ui.inverted.blue.button:hover,
            .ui.inverted.blue.buttons .button:hover {
              background-color: #677bc4;
            }
			.ui.animated.blue.button,
            .ui.animated.blue.buttons .button {
              box-shadow: 0 0 0 2px #23272A inset !important;
			  background-color: #7289DA;
              color: #ffffff;
              font-family: 'Work Sans', sans-serif;
            }
            .ui.animated.blue.button:hover,
            .ui.animated.blue.buttons .button:hover {
              background-color: #677bc4;
            }
			.profile {
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -ms-flex-align: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            align-items: center;
            justify-content: center;
            padding-top: 10px;
          }
          .profile .username {
            font-weight: bold;
            font-size: 1.6em;
            margin-top: -10px;
          }
          @media only screen and (max-width: 600px) {
            .logoutBtn {
              text-align: center;
            }
          }
          
          .field label {
            color: #ffffff !important;
          }
          .segment {
            padding: 20px !important;
          }
        `}
        </style>
      </Container>
    )
  }
}
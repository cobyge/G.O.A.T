import React from 'react'
import { Image, Button, Loader, Dimmer, Container } from 'semantic-ui-react'
import {
  refreshToken,
  getToken,
  getInfo,
  logout,
  checkMembership
} from '../utils/auth'
import axios from 'axios'
import Profile from '../components/Profile'
import Form from '../components/FormVault'

//Checks to see if there is a SITE_URL env.  If not, it uses the default localhost
const SITE_URL = process.env.SITE_URL
  ? process.env.SITE_URL
  : 'http://localhost:3000'
const CLIENT_ID = process.env.CLIENT_ID
var TAGS = []
var i = 0

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
    getInfo()
      .then(({ data }) => {
        this.setState({ user: data })
        document.title =
          'Auto-System - ' +
          data.username +
          '#' +
          data.discriminator
        checkMembership().then(result => {
		  if (result) {
            this.setState({ member: true })
            this.setState({ loading: false })
          } else {
            this.setState({ loading: false })
		  }
        })
      })
	  .catch(err => console.log(err))

	  //Gets list of channels in specific category in Server.
	  axios({
		method: 'GET',
		url: `/serverChannels`}).then(function(response){
		TAGS = []
		for (i in response.data){
			TAGS.push(response.data[i])
		}
	}).catch(err => console.log(err))
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
        {(this.state.loggedin &&
          this.state.user && (
            <React.Fragment>
              <Profile
                avatar={this.getAvatar()}
                username={
                  this.state.user.username + '#' + this.state.user.discriminator
                }
                onLogout={this.onLogout.bind(this)}
              />
              {(this.state.member && (
                <Form
                  userid={this.state.user.id}
                />
              )) ||			  
			  <h1>You are not a member of this Discord server.  Please go to <a href="https://discordapp.com">Discord</a> and log into the account connected to the Discord server</h1>}
			</React.Fragment>
          )) || (
          <div>
            <center>
              <Image src="/static/coopport.png" size="medium" />
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
          `}
        </style>
      </Container>
    )
  }
}
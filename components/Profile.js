import React from 'react'
import { Button, Item, Image, Icon } from 'semantic-ui-react'

export default class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <Image
          size="tiny"
          rounded
          src={this.props.avatar}
          floated="left"
          verticalAlign="top"
        />
        <React.Fragment>
          <span className="username">
            {this.props.username}
            <br />
            <Button
              animated
              size="mini"
              color="blue"
              style={{ marginTop: '10px' }}
              onClick={() => this.props.onLogout()}
            >
              <Button.Content visible>Logout</Button.Content>
              <Button.Content hidden>
                <Icon name="right arrow" />
              </Button.Content>
            </Button>
          </span>
        </React.Fragment>

        <style jsx>{`
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
        `}</style>
      </div>
    )
  }
}
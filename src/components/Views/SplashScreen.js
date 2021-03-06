import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaGithubSquare from 'react-icons/lib/fa/github-square';
import FaGoogle from 'react-icons/lib/fa/google';
import {
  toggleSplash,
  storeUserName,
  toggleSplashError,
} from '../../actions/uiActions';
import {
  fireLoginWithProvider,
  fireLoginAnon,
  fireLoginEmail,
  fireCreateUser,
} from '../../actions/firebaseActions';
import {
  Button,
  Icon,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from 'react-mdc-web';

@firebaseConnect()
@connect(
  store => ({
    isOpen: store.splashState.isOpen,
    splashState: store.splashState,
    authError: pathToJS(store, 'authError'),
    auth: pathToJS(store, 'auth'),
  }),
  {
    toggleThis: toggleSplash,
    storeUserName,
    fireLoginWithProvider,
    fireLoginEmail,
    fireLoginAnon,
    toggleSplashError,
    fireCreateUser,
  },
)
export default class SplashScreen extends Component {
  render() {
    const hideSplashStyle = {
        top: '-110vh',
      },
      showSplashStyle = {
        top: '0vh',
      },
      loginArrowStyle = {
        position: 'absolute',
        backgroundColor: 'var(--mdc-theme-primary)',
        borderRadius: '50%',
        right: '3%',
        top: '25%',
        cursor: 'pointer',
      };

    return (
      <div
        className="SplashScreen splashTheme"
        style={this.props.isOpen ? showSplashStyle : hideSplashStyle}
      >
        <h1 className="splashTheme">Tic-Tac-Toe!</h1>
        <div className="splashLoginDialog">
          <span className="splashSpan splashTheme">E-Mail</span>
          <div className="splashInputBox splashTheme">
            <input
              className="splashInput"
              type="text"
              id="splashNameInput"
              name="splashName"
            />
            <span
              className="splashSignUp"
              onClick={() => {
                console.log('click fired');
                this.props.fireCreateUser(this.props.firebase);
              }}
            >
              Sign Up
            </span>
          </div>
          <span className="splashSpan splashTheme">Password</span>
          <div className="splashInputBox splashTheme">
            <input
              className="splashInput"
              type="password"
              id="splashPasswordInput"
              name="splashPassword"
            />
            <Icon
              name="chevron_right"
              style={loginArrowStyle}
              onClick={() => {
                this.props.fireLoginEmail(this.props.firebase);
              }}
            />
          </div>
          <div>
            <FaFacebookSquare
              style={{ cursor: 'pointer' }}
              onClick={() =>
                this.props.fireLoginWithProvider(
                  this.props.firebase,
                  'facebook',
                )
              }
              height={32}
              width={32}
            />
            <FaTwitterSquare
              style={{ cursor: 'pointer' }}
              onClick={() =>
                this.props.fireLoginWithProvider(this.props.firebase, 'twitter')
              }
              height={32}
              width={32}
            />
            <FaGithubSquare
              style={{ cursor: 'pointer' }}
              onClick={() =>
                this.props.fireLoginWithProvider(this.props.firebase, 'github')
              }
              height={32}
              width={32}
            />
            <FaGoogle
              style={{ cursor: 'pointer' }}
              onClick={() =>
                this.props.fireLoginWithProvider(this.props.firebase, 'google')
              }
              height={32}
              width={32}
            />
          </div>
          <br />
          <div
            className="splashSkip"
            onClick={() => {
              this.props.fireLoginAnon(this.props.firebase);
            }}
          >
            Skip
          </div>
        </div>
        <Dialog
          style={{ color: 'black' }}
          open={this.props.splashState.errorDialog.isOpen}
          onClose={this.props.toggleSplashError}
        >
          <DialogHeader>
            <DialogTitle>
              {this.props.splashState.errorDialog.title}
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            {this.props.splashState.errorDialog.error}
            <br />
            {this.props.splashState.errorDialog.message}
          </DialogBody>
          <DialogFooter>
            <Button dense raised onClick={this.props.toggleSplashError}>
              Okay
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}

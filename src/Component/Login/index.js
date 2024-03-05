import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  onInputUsername = event => {
    this.setState({username: event.target.value})
  }

  onInputPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.getData()
  }

  getData = async () => {
    const {history} = this.props
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    if (response.ok) {
      const data = await response.json()
      Cookies.set('jwt_token', data.jwt_token, {expires: 50})
      history.replace('/')
    } else {
      const data = await response.json()
      this.setState({errMsg: data.error_msg})
    }
  }

  render() {
    const {errMsg} = this.state
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bg-container-login">
        <div className="login-card">
          <img
            className="logo-image"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <form onSubmit={this.onSubmitForm} className="input-form">
            <label className="username-label" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.onInputUsername}
              type="text"
              className="input-username"
              placeholder="Username"
              id="username"
            />
            <label className="username-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.onInputPassword}
              type="password"
              className="input-username"
              placeholder="Password"
              id="password"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {errMsg && <p className="error-msg">*{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login

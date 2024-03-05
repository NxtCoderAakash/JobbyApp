import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <div className="bg-container-header">
      <Link to="/">
        <button type="button" className="icon-button">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-image-header"
          />
        </button>
      </Link>
      <ul className="header-list">
        <ul className="header-list-center">
          <li>
            <Link to="/">
              <button type="button" className="button home-button">
                Home
              </button>
            </Link>
          </li>

          <li>
            <Link to="/jobs">
              <button type="button" className="button home-button">
                Jobs
              </button>
            </Link>
          </li>
        </ul>
        <button
          onClick={onClickLogout}
          type="button"
          className="button logout-button"
        >
          Logout
        </button>
      </ul>
    </div>
  )
}

export default withRouter(Header)

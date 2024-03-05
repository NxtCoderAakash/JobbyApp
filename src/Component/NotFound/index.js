import './index.css'

const NotFound = () => (
  <div className="bg-container-failure">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="failure-image"
    />
    <h1 className="failure-text-head">Page Not Found</h1>
    <p className="failure-text-para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound

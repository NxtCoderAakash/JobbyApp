import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'

const Home = () => (
  <div className="bg-container-home">
    <Header />
    <div className="home-card">
      <h1 className="home-heading">Find the Job That Fits Your Life</h1>
      <p className="home-heading">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="find-jobs-button logout-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home

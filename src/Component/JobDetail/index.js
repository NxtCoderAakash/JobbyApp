import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {FaSuitcase} from 'react-icons/fa'
import {RiExternalLinkFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import SimilarJobsCard from '../SimilarJobsCard'
import SkillCard from '../SkillCard'

const stateConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobDetail extends Component {
  state = {jobDetailsData: {}, showResult: stateConstants.initial}

  componentDidMount() {
    this.getJobDetailsData()
  }

  getCamelData = item => {
    const jobDetails = item.job_details
    const similarJobs = item.similar_jobs

    const camelData = {
      jobDetails: {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        skills: jobDetails.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          imageUrl: jobDetails.life_at_company.image_url,
          description: jobDetails.life_at_company.description,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
      },
      similarJobs: similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      })),
    }
    return camelData
  }

  getJobDetailsData = async () => {
    this.setState({showResult: stateConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const formattedData = this.getCamelData(data)
      //   console.log(formattedData)
      this.setState({
        jobDetailsData: formattedData,
        showResult: stateConstants.success,
      })
    } else {
      this.setState({showResult: stateConstants.failure})
    }
  }

  checkProfileFetchStatus = () => {
    const {showResult} = this.state
    switch (showResult) {
      case 'LOADING':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderResult()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return this.renderFailure()
    }
  }

  renderResult = () => {
    const {jobDetailsData} = this.state

    const {jobDetails} = jobDetailsData
    const {similarJobs} = jobDetailsData
    console.log(similarJobs)

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="bg-container-jobs-item">
        <Header />

        <div className="job-details-card">
          <div className="job-item-image-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-image"
            />
            <div>
              <h1 className="job-title-head">{similarJobs[0].title}</h1>
              <div className="job-item-ratings-container">
                <AiFillStar color="#fbbf24" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="jos-item-location-internship-container">
            <div className="location-job-type-combined">
              <div>
                <p>
                  <span>
                    <HiLocationMarker color="#f1f5f9" />
                  </span>
                  {'     '}
                  {location}{' '}
                </p>
              </div>
              <div>
                <p>
                  {' '}
                  <span>
                    <FaSuitcase color="#f1f5f9" />
                  </span>
                  {'     '}
                  {employmentType}
                </p>
              </div>
            </div>
            <p>{packagePerAnnum}</p>
          </div>

          <hr />

          <div className="link-container">
            <h1 className="life-title">Description</h1>

            <a href={`${companyWebsiteUrl}`}>
              {' '}
              <button type="button" className="link-button">
                Visit <RiExternalLinkFill />
              </button>
            </a>
          </div>
          <p className="jobs-item-description">{jobDescription}</p>
          <h1 className="life-title">Skills</h1>
          <ul className="skills-container">
            {skills.map(item => (
              <SkillCard key={item.name} data={item} />
            ))}
          </ul>
          <h1 className="life-title">Life at Company</h1>
          <div className="life-image-container">
            <p>{lifeAtCompany.description}</p>
            <img
              alt="life at company"
              className="life-imgae"
              src={lifeAtCompany.imageUrl}
            />
          </div>
        </div>

        <div className="similar-job-section">
          <h1>Similar Jobs</h1>

          <ul className="similar-jobs-container">
            {similarJobs.map(item => (
              <Link style={{textDecoration: 'none'}} to={`/jobs/${item.id}`}>
                <SimilarJobsCard key={item.id} similarData={item} />
              </Link>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="bg-container-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text-head">Oops! Something Went Wrong</h1>
      <p className="failure-text-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        onClick={this.getJobDetailsData}
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  render() {
    return this.checkProfileFetchStatus()
  }
}

export default JobDetail

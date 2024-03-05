import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import UserCard from '../UserCard'
import FilterCard from '../FilterCard'
import JobsItem from '../JobsItem'
import NoJobs from '../NoJobs'

const stateConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    isLoading: stateConstants.initial,
    isLoadingProfile: stateConstants.initial,
    profile: {},
    empFilter: [],
    salaryFilter: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
    this.getProfile()
  }

  //   const SampleData = {
  //   jobs: [
  //     {
  //       companyLogoUrl:
  //         'https://assets.ccbp.in/frontend/react-js/jobby-app/facebook-img.png',
  //       employmentType: 'Full Time',
  //       id: 'd6019453-f864-4a2f-8230-6a9642a59466',
  //       jobDescription:
  //         'We’re in search of a Back-End Software Engineer that specializes in server-side components. In this role, you’ll primarily work in NodeJs, SQL Lite, Python, AWS and GO and will bring a depth of knowledge on basic algorithms and data structures. As a Back-End Engineer, you might be architecting new features for our customers.',
  //       location: 'Bangalore',
  //       packagePerAnnum: '21 LPA',
  //       rating: 4,
  //       title: 'Backend Engineer',
  //     },
  //   ],
  //   total: 25,
  // }

  getCamelData = data => {
    const {jobs} = data

    const camelData = jobs.map(item => ({
      companyLogoUrl: item.company_logo_url,

      employmentType: item.employment_type,
      id: item.id,
      jobDescription: item.job_description,
      location: item.location,
      packagePerAnnum: item.package_per_annum,
      rating: item.rating,
      title: item.title,
    }))

    return camelData
  }

  getJobsList = async () => {
    this.setState({isLoading: stateConstants.loading})
    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const {empFilter, salaryFilter, searchInput} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${[
        ...empFilter,
      ]}&minimum_package=${salaryFilter}&search=${searchInput}`,
      options,
    )
    console.log(response.status)
    if (response.status === 200) {
      const data = await response.json()
      console.log(data)
      const formattedData = this.getCamelData(data)
      this.setState({
        jobsList: formattedData,
        isLoading: stateConstants.success,
      })
    } else {
      this.setState({isLoading: stateConstants.failure})
    }
  }

  getCamelProfileData = profileData => {
    const formattedData = {
      name: profileData.profile_details.name,
      profileImageUrl: profileData.profile_details.profile_image_url,
      shortBio: profileData.profile_details.short_bio,
    }
    return formattedData
  }

  getProfile = async () => {
    this.setState({isLoadingProfile: stateConstants.loading})
    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/profile`, options)
    if (response.status === 200) {
      const profileData = await response.json()
      //   console.log(profileData)
      const formattedProfile = this.getCamelProfileData(profileData)
      console.log(formattedProfile)
      this.setState({
        profile: formattedProfile,
        isLoadingProfile: stateConstants.success,
      })
    } else {
      this.setState({isLoadingProfile: stateConstants.loading})
    }
  }

  onChangeEmploymentSuperParent = id => {
    const {empFilter} = this.state
    if (empFilter.includes(id)) {
      const newFilter = empFilter.filter(item => item !== id)
      this.setState({empFilter: [...newFilter]}, this.getJobsList)
    } else {
      this.setState(
        prevState => ({empFilter: [...prevState.empFilter, id]}),
        this.getJobsList,
      )
    }
  }

  onClickSalarySuperParent = id => {
    this.setState({salaryFilter: id}, this.getJobsList)
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getJobsList()
  }

  checkEnterPress = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  checkListFecthStatus = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case 'LOADING':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderSuccess()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return this.renderFailure()
    }
  }

  checkProfileFecthStatus = () => {
    const {isLoadingProfile} = this.state
    switch (isLoadingProfile) {
      case 'LOADING':
        return this.renderLoading()
      case 'SUCCESS':
        return this.renderSuccessProfile()
      case 'FAILURE':
        return this.renderFailureProfile()
      default:
        return this.renderFailureProfile()
    }
  }

  renderSuccess = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length !== 0 && (
          <ul className="jobs-list-ul">
            {jobsList.map(eachJob => (
              <JobsItem key={eachJob.id} data={eachJob} />
            ))}
          </ul>
        )}
        {jobsList.length === 0 && <NoJobs />}
      </>
    )
  }

  renderSuccessProfile = () => {
    const {profile} = this.state
    return <UserCard data={profile} />
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
      <button type="button" onClick={this.getJobsList} className="retry-button">
        Retry
      </button>
    </div>
  )

  renderFailureProfile = () => (
    <div className="bg-container-failure-profile">
      <button type="button" onClick={this.getProfile} className="retry-button">
        Retry
      </button>
    </div>
  )

  render() {
    // const {isLoading, isLoadingProfile} = this.state
    const {empFilter} = this.state
    console.log(empFilter)

    return (
      <div className="bg-container-jobs-page">
        <Header />
        <div className="jobs-page-section">
          <div className="jobs-page-left-section">
            {this.checkProfileFecthStatus()}
            <hr />
            <FilterCard
              onChangeEmploymentSuperParent={this.onChangeEmploymentSuperParent}
              onClickSalarySuperParent={this.onClickSalarySuperParent}
            />
          </div>
          <div className="jobs-page-right-section">
            <div className="input-container">
              <input
                onChange={this.onChangeSearch}
                onKeyDown={this.checkEnterPress}
                type="search"
                placeholder="Search"
                className="input-search"
              />

              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchIcon}
                className="search-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.checkListFecthStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

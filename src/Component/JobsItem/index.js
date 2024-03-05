import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

// const SampleData = {
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

const JobsItem = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = data
  return (
    <li className="bg-contaiiner-jobs-item">
      <Link style={{textDecoration: 'none'}} to={`/jobs/${id}`}>
        <div className="job-item-image-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-image"
          />
          <div>
            <h1 className="job-title">{title}</h1>
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
                  <HiLocationMarker />
                </span>
                {'     '}
                {location}{' '}
              </p>
            </div>
            <div>
              <p>
                {' '}
                <span>
                  <FaSuitcase />
                </span>
                {'     '}
                {employmentType}
              </p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="jobs-item-desciption-heading">Description</h1>
        <p className="jobs-item-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobsItem

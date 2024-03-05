import {HiLocationMarker} from 'react-icons/hi'
import {FaSuitcase} from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobsCard = props => {
  const {similarData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarData

  return (
    <li className="bg-contaiiner-jobs-item bg-similar-jobs-card">
      <div className="job-item-image-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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

      <hr />
      <h1 className="jobs-item-desciption-heading">Description</h1>
      <p className="jobs-item-description">{jobDescription}</p>
      <div className="jos-item-location-internship-container">
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
    </li>
  )
}

export default SimilarJobsCard

import './index.css'

//   {
//   "profile_details": {
//     "name": "Rahul Attuluri",
//     "profile_image_url": "https://assets.ccbp.in/frontend/react-js/male-avatar-img.png",
//     "short_bio": "Lead Software Developer and AI-ML expert"
//   }
// }

const UserCard = props => {
  const {data} = props
  const {name, profileImageUrl, shortBio} = data
  console.log(data)

  return (
    <div className="user-card">
      <div className="user-card-image-container">
        <img src={profileImageUrl} alt="profile" className="user-image" />
        <h1 className="profile-name">{name}</h1>
      </div>
      <p className="para">{shortBio}</p>
    </div>
  )
}

export default UserCard

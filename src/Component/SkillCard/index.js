import './index.css'

const SkillCard = props => {
  const {data} = props
  const {name, imageUrl} = data
  return (
    <li className="skill-item-container">
      <img alt={name} src={imageUrl} className="sikills-image" />
      <p>{name}</p>
    </li>
  )
}

export default SkillCard

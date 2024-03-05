import './index.css'

const FilterItem = props => {
  const {data, onChangeEmploymentParent} = props
  const {employmentTypeId, label} = data

  const onChangeEmploymentChild = event => {
    onChangeEmploymentParent(event.target.value)
  }
  return (
    <li>
      <input
        className="checkbox-input"
        value={employmentTypeId}
        onClick={onChangeEmploymentChild}
        id={employmentTypeId}
        type="checkbox"
      />
      <label htmlFor={employmentTypeId}>{label}</label>
    </li>
  )
}

export default FilterItem

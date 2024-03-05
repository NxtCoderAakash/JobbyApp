import './index.css'

const FilterItemsSalary = props => {
  const {data, onClickSalaryParent} = props
  const {salaryRangeId, label} = data

  const onClickSalary = event => {
    onClickSalaryParent(event.target.value)
  }

  return (
    <li>
      <input
        name="salary-filter"
        onClick={onClickSalary}
        id={salaryRangeId}
        type="radio"
        className="radio-input"
        value={salaryRangeId}
      />
      <label htmlFor={salaryRangeId}>{label}</label>
    </li>
  )
}

export default FilterItemsSalary

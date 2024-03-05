import './index.css'
import FilterItemEmployment from '../FilterItemEmployment'
import FilterItemsSalary from '../FilterItemsSalary'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterCard = props => {
  const {onChangeEmploymentSuperParent, onClickSalarySuperParent} = props

  const onChangeEmploymentParent = id => {
    onChangeEmploymentSuperParent(id)
  }
  const onClickSalaryParent = id => {
    onClickSalarySuperParent(id)
  }

  return (
    <div className="filter-card">
      <div className="filter-types-employment-section">
        <br />
        <h1 className="filter-type">Type of Employment</h1>
        <ul className="employment-filter-sub-container">
          {employmentTypesList.map(item => (
            <FilterItemEmployment
              key={item.employmentTypeId}
              data={item}
              onChangeEmploymentParent={onChangeEmploymentParent}
            />
          ))}
        </ul>
      </div>
      <hr />
      <br />
      <div className="filter-types-employment-section">
        <h1 className="filter-type">Salary Range</h1>
        <ul className="employment-filter-sub-container">
          {salaryRangesList.map(item => (
            <FilterItemsSalary
              key={item.salaryRangeId}
              data={item}
              onClickSalaryParent={onClickSalaryParent}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FilterCard

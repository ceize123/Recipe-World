import RecipeDataService from '../services/recipe.service'
import { Option } from '../types'

const cuisineAry = [
  'All',
  'African',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin American',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese',
]

const CuisineOption: React.FC<Option> = ({
  query,
  setResult,
  setLoading,
  setError,
}) => {
  const handleSelect = (e: any) => {
    const option = e.target.value
    setLoading(true)
    // if option is 'All', no need to filter
    if (option === 'All') {
      RecipeDataService.search(query)
        .then((res: any) => {
          setResult(res.data.results)
        })
        .catch(() => {
          setLoading(false)
          setError(true)
        })
    } else {
      RecipeDataService.filter(query, option)
        .then((res: any) => {
          setResult(res.data.results)
        })
        .catch(() => {
          setLoading(false)
          setError(true)
        })
    }
    setLoading(false)
  }
  return (
    <div className='mb-3'>
      <select onChange={handleSelect} className='border'>
        {cuisineAry.map((item, idx) => {
          return (
            <option key={idx} value={item}>
              {item}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default CuisineOption

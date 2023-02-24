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
  setError,
  setLoading,
  setNoResult,
}) => {
  const handleSelect = (e: any) => {
    const option = e.target.value
    setNoResult(false)
    setLoading(true)
    setError(false)

    // if option is 'All', no need to filter
    if (option === 'All') {
      RecipeDataService.search(query)
        .then((res: any) => {
          if (res.data.results.length > 0) setResult(res.data.results)
          else setNoResult(true)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
          setError(true)
        })
    } else {
      RecipeDataService.filter(query, option)
        .then((res: any) => {
          if (res.data.results.length > 0) setResult(res.data.results)
          else setNoResult(true)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
          setError(true)
        })
    }
  }
  return (
    <div className='mb-3 text-black'>
      <select
        onChange={handleSelect}
        className='border-2 border-primary rounded text-xl p-1'
      >
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

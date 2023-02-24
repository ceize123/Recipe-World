import { Recipe } from '../types'
import RecipeCard from './RecipeCard'

interface RecipeAry {
  recipes: Recipe[]
}

const RecipeList: React.FC<RecipeAry> = ({ recipes }) => {
  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8'>
      {recipes.map((item) => {
        return <RecipeCard {...item} />
      })}
    </div>
  )
}

export default RecipeList

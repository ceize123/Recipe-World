import { useNavigate } from 'react-router-dom'
import { Recipe } from '../types'
import RecipeCard from './RecipeCard'

interface RecipeAry {
  recipes: Recipe[]
}

const RecipeList: React.FC<RecipeAry> = ({ recipes }) => {
  const navigate = useNavigate()
  const routeChange = (recipeId: number) => {
    const path = `/recipe/${recipeId}`
    navigate(path)
  }
  return (
    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-8'>
      {recipes.map((item) => {
        return (
          <div
            key={item.id}
            className='bg-primary p-4 rounded-md cursor-pointer'
            onClick={() => routeChange(item.id)}
          >
            <RecipeCard {...item} />
          </div>
        )
      })}
    </div>
  )
}

export default RecipeList

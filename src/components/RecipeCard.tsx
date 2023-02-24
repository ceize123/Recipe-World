import { useNavigate } from 'react-router-dom'
import { Recipe } from '../types'

const RecipeCard: React.FC<Recipe> = ({ id, title, image }) => {
  const navigate = useNavigate()
  const routeChange = (recipeId: number) => {
    console.log(recipeId)
    const path = `/recipe/${recipeId}`
    navigate(path)
  }

  return (
    <div
      key={id}
      className='text-center flex flex-col bg-emerald-600 p-4 rounded-md cursor-pointer'
      onClick={() => routeChange(id)}
    >
      <h2 className='mb-2'>{title}</h2>
      <div className='w-full mt-auto overflow-hidden'>
        <img
          src={image}
          alt={title}
          className='w-full h-auto max-w-[450px] mx-auto hover:scale-105 transition'
        />
      </div>
    </div>
  )
}

export default RecipeCard

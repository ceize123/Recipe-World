import { Recipe } from '../types'

const RecipeCard: React.FC<Recipe> = ({ title, image }) => {
  return (
    <>
      <div className='overflow-hidden mb-2'>
        <div
          className='w-full h-0 pb-[100%] hover:scale-105 transition'
          style={{
            background: `url(${image}) no-repeat center center / cover`,
          }}
        ></div>
      </div>
      <h3>{title}</h3>
    </>
  )
}

export default RecipeCard

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
        {/* <img
          src={image}
          alt={title}
          className='w-full h-auto max-w-[450px] mx-auto hover:scale-105 transition'
        /> */}
      </div>
      <h3>{title}</h3>
    </>
  )
}

export default RecipeCard

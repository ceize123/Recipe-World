import { useState, useEffect } from 'react'
import RecipeDataService from '../services/recipe.service'
import { Recipe } from '../types'
import Pagination from '../components/Pagination'
import RecipeList from '../components/RecipeList'
import { cuisineAry } from '../cuisineAry'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [target, setTarget] = useState<string>('')
  const [option, setOption] = useState<string>('All')
  const [result, setResult] = useState<Recipe[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const recipePerPage = 5
  const lastRecipeIndex = currentPage * recipePerPage
  const firstRecipeIndex = lastRecipeIndex - recipePerPage
  const currentRecipes = result.slice(firstRecipeIndex, lastRecipeIndex)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setTarget(e.target.recipe.value)
  }

  const handleFilter = (e: any) => {
    setOption(e.target.value)
  }

  useEffect(() => {
    setLoading(true)
    setError(false)
    // if option is 'All', no need to filter
    if (option === 'All') {
      RecipeDataService.search(target)
        .then((res: any) => {
          setResult(res.data.results)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
          setError(true)
        })
    } else {
      RecipeDataService.filter(target, option)
        .then((res: any) => {
          setResult(res.data.results)
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
          setError(true)
        })
    }
  }, [target, option])

  return (
    <>
      <section>
        <form className='text-center' onSubmit={(e) => handleSubmit(e)}>
          <label className='block text-3xl font-bold mb-2' htmlFor='recipe'>
            Recipe World
          </label>
          <input
            id='recipe'
            name='recipe'
            className='border-2 rounded-tl rounded-bl h-10 pl-2 border-primary text-black'
            placeholder='pasta'
          />
          <button
            type='submit'
            className='py-2 px-3 bg-primary rounded-tr rounded-br text-white'
          >
            Search
          </button>
          <div className='mt-3 text-black'>
            <select
              onChange={handleFilter}
              className='border-2 border-primary rounded text-lg p-1'
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
        </form>
      </section>

      <section className='md:my-12 my-6 mx-3'>
        {!loading && result.length > 0 && (
          <>
            <RecipeList recipes={currentRecipes} />
            <Pagination
              totalRecipes={result.length}
              recipesPerPage={recipePerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </section>
      {loading && <div className='text-center'>Loading...</div>}
      {!loading && result.length === 0 && (
        <div className='text-center'>
          No Result found in this cuisine category
        </div>
      )}
      {error && <div className='text-center'>Something went wrong...</div>}
    </>
  )
}

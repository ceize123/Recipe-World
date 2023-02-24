import { useState } from 'react'
import RecipeDataService from '../services/recipe.service'
import { Recipe } from '../types'
import Pagination from '../components/Pagination'
import RecipeList from '../components/RecipeList'
import CuisineOption from '../components/CuisineOption'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [target, setTarget] = useState<string>('')
  const [result, setResult] = useState<Recipe[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const recipePerPage = 5
  const lastRecipeIndex = currentPage * recipePerPage
  const firstRecipeIndex = lastRecipeIndex - recipePerPage
  const currentRecipes = result.slice(firstRecipeIndex, lastRecipeIndex)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)
    RecipeDataService.search(target)
      .then((res: any) => {
        setResult(res.data.results)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }

  const handleSearchChange = (e: any) => {
    setTarget(e.target.value)
  }

  return (
    <>
      <section>
        <form className='text-center' onSubmit={(e) => handleSubmit(e)}>
          <label className='block text-3xl' htmlFor='recipe'>
            Recipe
          </label>
          <input
            id='recipe'
            name='recipe'
            className='border-2 h-10 pl-2'
            placeholder='pasta'
            onChange={(e) => handleSearchChange(e)}
          />
          <button
            type='submit'
            className='py-2 px-3 bg-black text-white disabled:bg-gray-400'
            disabled={target.length === 0}
          >
            Search
          </button>
        </form>
      </section>
      {loading && <div className='text-center'>Loading...</div>}
      {!loading && result.length > 0 && (
        <section className='md:my-12 my-6 mx-3'>
          <CuisineOption
            query={target}
            setResult={setResult}
            setLoading={setLoading}
            setError={setError}
          />
          <RecipeList recipes={currentRecipes} />
          <Pagination
            totalRecipes={result.length}
            recipesPerPage={recipePerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </section>
      )}
      {error && <div>Something went wrong...</div>}
    </>
  )
}

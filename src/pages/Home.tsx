import { useState } from 'react'
import RecipeDataService from '../services/recipe.service'
import { Recipe } from '../types'
import Pagination from '../components/Pagination'
import RecipeList from '../components/RecipeList'
import CuisineOption from '../components/CuisineOption'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [noResult, setNoResult] = useState(false)
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
    const query = e.target.recipe.value
    setNoResult(false)
    setLoading(true)
    setError(false)
    setTarget(query)
    RecipeDataService.search(target)
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
        </form>
      </section>

      <section className='md:my-12 my-6 mx-3'>
        {result.length > 0 && (
          <CuisineOption
            query={target}
            setResult={setResult}
            setNoResult={setNoResult}
            setLoading={setLoading}
            setError={setError}
          />
        )}
        {!loading && !noResult && result.length > 0 && (
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
      {noResult && (
        <div className='text-center'>
          No Result found in this cuisine category
        </div>
      )}
      {error && <div className='text-center'>Something went wrong...</div>}
    </>
  )
}

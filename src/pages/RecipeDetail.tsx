import { useState, useEffect } from 'react'
import { RecipeInfo } from '../types'
import RecipeDataService from '../services/recipe.service'
import { useParams } from 'react-router-dom'
import { AiOutlineCheckSquare } from 'react-icons/ai'

export default function RecipeDetail() {
  const [error, setError] = useState(false)
  const [info, setInfo] = useState<RecipeInfo>()
  const { id } = useParams<string | any>()

  useEffect(() => {
    setError(false)
    RecipeDataService.getInfo(id)
      .then((res: any) => {
        const { id, title, image, diets, extendedIngredients, instructions } =
          res.data
        const ingredients = extendedIngredients.map((obj: any) => ({
          name: obj.name,
          measures: obj.measures.metric,
        }))
        setInfo({
          id: id,
          title: title,
          image: image,
          diets: diets,
          ingredients: ingredients,
          instructions: instructions,
        })
      })
      .catch(() => {
        setError(true)
      })
  }, [id])

  if (!info) return <div className='text-center'>Loading...</div>
  return (
    <div className='md:mx-5 mx-3'>
      <>
        <section>
          <h1 className='mb-4'>{info.title}</h1>
          <div className='flex md:items-center md:flex-row flex-col'>
            <div className='mr-5 mb-8 md:mb-0'>
              <img
                src={info.image}
                alt={info.title}
                className='w-full h-auto max-w-[450px]'
              />
            </div>
            <div>
              <h2>Diets:</h2>
              {info.diets.map((item, idx) => {
                return (
                  <p key={`diets-${idx}`} className='flex items-center'>
                    <AiOutlineCheckSquare className='mr-2' />
                    {item}
                  </p>
                )
              })}
            </div>
          </div>
        </section>

        {/* Ingredients */}
        <section className='my-8'>
          <h2>Ingredients:</h2>
          <table className='table-fixed border-separate border border-slate-400 md:w-2/3 w-full'>
            <thead className='bg-primary'>
              <tr>
                <th className='border border-slate-300 sm:w-2/3'>Item</th>
                <th className='border border-slate-300'>Amount</th>
                <th className='border border-slate-300'>Unit</th>
              </tr>
            </thead>
            <tbody>
              {info.ingredients.map((item, idx) => {
                return (
                  <tr key={`ingredient-${idx}`}>
                    <td className='border border-slate-300'>{item.name}</td>
                    <td className='border border-slate-300'>
                      {Math.round(item.measures.amount * 100) / 100}
                    </td>
                    <td className='border border-slate-300'>
                      {item.measures.unitShort}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
        {/* Ingredients */}
        {/* Instructions */}
        <section className='my-8'>
          <h2>Instructions:</h2>
          <p>{info.instructions}</p>
        </section>
        {/* Instructions */}
      </>
      {error && <div>Something went wrong...</div>}
    </div>
  )
}

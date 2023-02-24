import { Dispatch, SetStateAction } from 'react'

export interface Result {
  offset: number
  number: number
  results: []
  totalResults: number
}

export interface Recipe {
  id: number
  title: string
  image: string
  imageType: string
}

export interface RecipeInfo {
  id: number
  title: string
  image: string
  diets: []
  ingredients: [
    {
      name: string
      measures: { amount: number; unitShort: string }
    }
  ]
  instructions: string
}

export interface PaginationType {
  totalRecipes: number
  recipesPerPage: number
  currentPage: number
  setCurrentPage?: Dispatch<SetStateAction<number>>
}

export interface Option {
  query: string
  setResult: Dispatch<SetStateAction<Recipe[]>>
  setNoResult: Dispatch<SetStateAction<boolean>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setError: Dispatch<SetStateAction<boolean>>
}

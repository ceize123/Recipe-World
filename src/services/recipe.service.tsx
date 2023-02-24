import http from '../http-common'
import { Result, RecipeInfo } from '../types'

class RecipeDataService {
  // search all cuisines that has query q
  search(q: string) {
    return http.get<Result>(
      `/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${q}&number=100`
    )
  }

  // get information of the recipe of id selected
  getInfo(id: string | any) {
    return http.get<RecipeInfo>(
      `/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=true`
    )
  }

  // filter cuisines with selected category
  filter(q: string, cuisine: string) {
    return http.get<Result>(
      `/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${q}&cuisine=${cuisine}&number=100`
    )
  }
}

export default new RecipeDataService()

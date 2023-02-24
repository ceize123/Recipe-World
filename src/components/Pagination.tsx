import { PaginationType } from '../types'

const Pagination: React.FC<PaginationType> = ({
  totalRecipes,
  recipesPerPage,
  currentPage,
  setCurrentPage,
}) => {
  let pages = []
  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pages.push(i)
  }

  const handleClick = (page: number) => {
    if (setCurrentPage) setCurrentPage(page)
  }
  return (
    <div className='text-center mt-4'>
      {pages.map((page, idx) => {
        return (
          <button
            key={idx}
            onClick={() => {
              handleClick(page)
            }}
            className={`py-1 px-2 border-2 border-primary m-1 hover:bg-orange-300 ${
              currentPage === idx + 1 ? 'bg-primary text-white' : ''
            }`}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}

export default Pagination

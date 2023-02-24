import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layouts/Layout'
import RecipeDetail from './pages/RecipeDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {/* Purpose of index is to use when we want the path of parent to used. */}
          <Route index element={<Home />} />
          <Route path='recipe/:id' element={<RecipeDetail />} />
          {/* Replace avoid extra redirects after the user click back. */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

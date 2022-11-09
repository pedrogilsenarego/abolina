
import { Navigate, Route, Routes } from 'react-router-dom'
import { routes } from './routes'

import NotFound from '../components/NotFound'

const AppRoutes = () => {




  const redirectRoute = () => {

    return '/'
  }

  return (


    <Routes>
      {routes.map(({ path, component }) => (
        <Route
          key={path}
          path={path}
        >
          <Route path={path} element={component} />
        </Route>
      ))}
      <Route path="/" element={<Navigate to={redirectRoute()} />} />

      <Route path="*" element={<NotFound />} />
    </Routes>


  )
}

export default AppRoutes

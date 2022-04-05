import { Routes, Route } from 'react-router-dom'

// Constants
import { routes } from './router.constants'

export const Router = (): React.ReactElement => {
  return (
    <Routes>
      {routes.map((route) => {
        const Page = route.component

        const routeProps = {
          path: route.url,
          element: <Page />,
        }

        return <Route key={route.url} {...routeProps} />
      })}
    </Routes>
  )
}

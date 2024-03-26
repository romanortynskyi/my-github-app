import { createBrowserRouter } from 'react-router-dom'

import HomePage from '../pages/home'
import UserPage from '../pages/user'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:username',
    element: <UserPage />,
  },
])

export default router

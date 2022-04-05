// Pages
import { HomePage } from 'pages'
import { ManagementPage } from 'pages/management/ManagementPage'

// Types
import { Route } from './router.types'

export const routes: Route[] = [
  {
    url: '/',
    component: HomePage,
  },
  { url: '/management', component: ManagementPage },
]

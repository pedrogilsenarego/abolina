/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppRoute } from './types'
import { ROUTE_PATHS } from '../constants/routes'
import { lazyWithRetryAndLoader } from '../utils/lazyWithRetry'

const Home = lazyWithRetryAndLoader(() => import('../modules/Home'))
const Books = lazyWithRetryAndLoader(() => import('../modules/Books'))


export const routes: AppRoute[] = [
  {
    path: ROUTE_PATHS.HOME,
    component: <Home />,

  },
  {
    path: ROUTE_PATHS.BOOKS,
    component: <Books />,

  },

]

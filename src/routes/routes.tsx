/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppRoute } from "./types";
import { ROUTE_PATHS } from "../constants/routes";
import { lazyWithRetryAndLoader } from "../utils/lazyWithRetry";
import MainLayout from "../layouts/MainLayout";

const Home = lazyWithRetryAndLoader(() => import("../modules/Home"));
const Books = lazyWithRetryAndLoader(() => import("../modules/Books"));
const About = lazyWithRetryAndLoader(() => import("../modules/About"));

export const routes: AppRoute[] = [
  {
    path: ROUTE_PATHS.HOME,
    component: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.BOOKS,
    component: <MainLayout>
      <Books />
    </MainLayout>,
  },
  {
    path: ROUTE_PATHS.ABOUT,
    component: <MainLayout>
      <About />
    </MainLayout>,
  },
];

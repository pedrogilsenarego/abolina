/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppRoute } from "./types";
import { ROUTE_PATHS } from "../constants/routes";
import { lazyWithRetryAndLoader } from "../utils/lazyWithRetry";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import WithAdminAuth from "../hoc/withAdminAuth";

const Home = lazyWithRetryAndLoader(() => import("../modules/Home"));
const Books = lazyWithRetryAndLoader(() => import("../modules/Books"));
const Book = lazyWithRetryAndLoader(() => import("../modules/Books/Book"));
const About = lazyWithRetryAndLoader(() => import("../modules/About"));
const AdminManageBooks = lazyWithRetryAndLoader(
  () => import("../modules/Admin/ManageBooks")
);
const AdminBooksCreate = lazyWithRetryAndLoader(
  () => import("../modules/Admin/ManageBooks/SubmitBook")
);
const AdminCarroussel = lazyWithRetryAndLoader(
  () => import("../modules/Admin/ManageCarroussel")
);
const Login = lazyWithRetryAndLoader(() => import("../modules/Login"));

export const routes: AppRoute[] = [
  {
    path: ROUTE_PATHS.HOME,
    component: (
      <MainLayout marginBottom='0vh'>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.BOOKS,
    component: (
      <MainLayout>
        <Books />
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.BOOKS_BOOK,
    component: (
      <MainLayout marginBottom='0vh'>
        <Book />
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.ABOUT,
    component: (
      <MainLayout marginBottom='0vh'>
        <About />
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.LOGIN,
    component: <Login />,
  },
  {
    path: ROUTE_PATHS.ADMIN,
    component: (
      <WithAdminAuth>
        <AdminLayout>
          <AdminManageBooks />
        </AdminLayout>
      </WithAdminAuth>
    ),
  },
  {
    path: ROUTE_PATHS.ADMIN_BOOKS_CREATE,
    component: (
      <WithAdminAuth>
        <AdminLayout>
          <AdminBooksCreate />
        </AdminLayout>
      </WithAdminAuth>
    ),
  },
  {
    path: ROUTE_PATHS.ADMIN_CARROUSEL,
    component: (
      <WithAdminAuth>
        <AdminLayout>
          <AdminCarroussel />
        </AdminLayout>
      </WithAdminAuth>
    ),
  },
];

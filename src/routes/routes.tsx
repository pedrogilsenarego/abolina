/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTE_PATHS } from "../constants/routes";
import WithAdminAuth from "../hoc/withAdminAuth";
import WithAuth from "../hoc/withAuth";
import AdminLayout from "../layouts/AdminLayout";
import MainLayout from "../layouts/MainLayout";
import { lazyWithRetryAndLoader } from "../utils/lazyWithRetry";
import { AppRoute } from "./types";

const Home = lazyWithRetryAndLoader(() => import("../modules/Home"));
const Books = lazyWithRetryAndLoader(() => import("../modules/Books"));
const Book = lazyWithRetryAndLoader(() => import("../modules/Book"));
const About = lazyWithRetryAndLoader(() => import("../modules/About"));
const AdminManageBooks = lazyWithRetryAndLoader(
  () => import("../modules/Admin/ManageBooks")
);
const AdminBooksCreate = lazyWithRetryAndLoader(
  () => import("../modules/Admin/ManageBooks/SubmitBook")
);
const AdminBooksSettings = lazyWithRetryAndLoader(
  () => import("../modules/Admin/ManageBooks/Settings")
);
const AdminCarroussel = lazyWithRetryAndLoader(
  () => import("../modules/Admin/ManageCarroussel")
);
const AdminCollections = lazyWithRetryAndLoader(
  () => import("../modules/Admin/ManageCollections")
);
const AdminCollectionsCreate = lazyWithRetryAndLoader(
  () => import("../modules/Admin/ManageCollections/CreateCollection")
);
const Login = lazyWithRetryAndLoader(() => import("../modules/Login"));
const Cart = lazyWithRetryAndLoader(() => import("../modules/Cart"));
const Checkout = lazyWithRetryAndLoader(() => import("../modules/Checkout"));
const BuySuccess = lazyWithRetryAndLoader(
  () => import("../modules/BuySuccess")
);
const ClientManagement = lazyWithRetryAndLoader(
  () => import("../modules/ClientManagement")
);
const Policies = lazyWithRetryAndLoader(() => import("../modules/Policies"));

export const routes: AppRoute[] = [
  {
    path: ROUTE_PATHS.HOME,
    component: (
      <MainLayout marginBottom="0vh">
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
      <MainLayout marginBottom="0vh">
        <Book />
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.ABOUT,
    component: (
      <MainLayout marginBottom="0vh">
        <About />
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.LOGIN,
    component: (
      <WithAuth noAuth>
        <MainLayout noUpScroll>
          <Login />
        </MainLayout>
      </WithAuth>
    ),
  },
  {
    path: ROUTE_PATHS.CLIENT_MANAGEMENT,
    component: (
      <WithAuth>
        <MainLayout noUpScroll>
          <ClientManagement />
        </MainLayout>
      </WithAuth>
    ),
  },
  {
    path: ROUTE_PATHS.CART,
    component: (
      <MainLayout noUpScroll>
        <Cart />
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.CHECKOUT,
    component: (
      <MainLayout noUpScroll>
        <Checkout />
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.POLICIES,
    component: (
      <MainLayout>
        <Policies />
      </MainLayout>
    ),
  },
  {
    path: ROUTE_PATHS.BUY_SUCCESS,
    component: (
      <MainLayout noUpScroll>
        <BuySuccess />
      </MainLayout>
    ),
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
    path: ROUTE_PATHS.ADMIN_BOOKS_SETTINGS,
    component: (
      <WithAdminAuth>
        <AdminLayout>
          <AdminBooksSettings />
        </AdminLayout>
      </WithAdminAuth>
    ),
  },
  {
    path: ROUTE_PATHS.ADMIN_BOOKS_EDIT,
    component: (
      <WithAdminAuth>
        <AdminLayout>
          <AdminBooksCreate edit />
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
  {
    path: ROUTE_PATHS.ADMIN_COLLECTION,
    component: (
      <WithAdminAuth>
        <AdminLayout>
          <AdminCollections />
        </AdminLayout>
      </WithAdminAuth>
    ),
  },
  {
    path: ROUTE_PATHS.ADMIN_COLLECTION_CREATE,
    component: (
      <WithAdminAuth>
        <AdminLayout>
          <AdminCollectionsCreate />
        </AdminLayout>
      </WithAdminAuth>
    ),
  },
  {
    path: ROUTE_PATHS.ADMIN_COLLECTIONS_EDIT,
    component: (
      <WithAdminAuth>
        <AdminLayout>
          <AdminCollectionsCreate edit />
        </AdminLayout>
      </WithAdminAuth>
    ),
  },
];

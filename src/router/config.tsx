import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";

const Home = lazy(() => import("../pages/home/page"));
const Inscrieri = lazy(() => import("../pages/inscrieri/page"));
const AfterSchool = lazy(() => import("../pages/afterschool/page"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Suspense fallback={null}><Home /></Suspense>,
  },
  {
    path: "/inscrieri",
    element: <Suspense fallback={null}><Inscrieri /></Suspense>,
  },
  {
    path: "/after-school",
    element: <Suspense fallback={null}><AfterSchool /></Suspense>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;

import { createBrowserRouter } from "react-router-dom";

// Pages
import { AboutPage, MenuPage, RedirectPage } from "./pages";

// Layout
import { Layout } from "./layout";

import { mowerRoutes } from "./routes";

const allRoutes = [...mowerRoutes];

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPage />,
  },

  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: allRoutes,
  },
  {
    path: "*",
    element: <RedirectPage />,
  },
]);

export default router;

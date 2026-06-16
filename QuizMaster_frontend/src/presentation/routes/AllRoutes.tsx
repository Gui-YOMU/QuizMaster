import { createBrowserRouter } from "react-router";
import { MainPrivateRoutes } from "./MainPrivateRoutes.tsx";
import { PublicRoutes } from "./PublicRoutes.tsx";
import { RouterProvider } from "react-router-dom";
import { NotFoundPage } from "../pages/error/NotFoundPage/NotFoundPage.tsx";
import { EditorPrivateRoutes } from "./EditorPrivateRoutes.tsx";
import { GamePrivateRoutes } from "./GamePrivateRoutes.tsx";

const router = createBrowserRouter([
  ...PublicRoutes,
  ...MainPrivateRoutes,
  ...EditorPrivateRoutes,
  ...GamePrivateRoutes,
  { path: "*", element: <NotFoundPage /> },
]);

const AllRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AllRoutes;

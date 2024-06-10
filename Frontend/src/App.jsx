import { createBrowserRouter, Form, RouterProvider } from "react-router-dom";
import Main from "./Layout/Main";
import Posts from "./Pages/Posts";
import Create from "./Pages/Create";
import { action as postCreateAction }  from "./Components/PostForm";
import { action as postUpdateAction }  from "./Components/PostForm";
import { loader as postsLoader } from "./Pages/Posts";
import Details, { action as deleteAction } from "./Pages/Details";
import { loader as detailsLoader } from "./Pages/Details";
import Edit from "./Pages/Edit";
import Error from "./Pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Posts />,
          loader: postsLoader,
        },
        {
          path: "/create-post",
          element: <Create />,
          action: postCreateAction,
        },
        {
          path: ":id",
          id: "post-detail",
          loader: detailsLoader,
          children: [
            {
              index : true,
              element: <Details />,
              action: deleteAction,
            },
            {
              path: "edit-post",
              element: <Edit />,
              action : postUpdateAction
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

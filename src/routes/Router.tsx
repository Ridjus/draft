import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from '~/views/Home/Home';
import { Login } from '~/views/Login/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

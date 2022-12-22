import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '~/components/Layout/AppLayout';
import { AppSettings } from '~/views/AppSettings/AppSettings';
import { Home } from '~/views/Home/Home';
import { Login } from '~/views/Login/Login';
import { UserSettings } from '~/views/UserSettings/UserSettings';

const router = createBrowserRouter([
  {
    path: '/auth/sign-in',
    element: <Login />,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'user-settings',
        element: <UserSettings />,
      },
      {
        path: 'app-settings',
        element: <AppSettings />,
      },
    ],
  },
  { path: '*', element: <Navigate to="/auth/sign-in" /> },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

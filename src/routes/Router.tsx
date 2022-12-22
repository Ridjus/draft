import { Navigate, useRoutes } from 'react-router-dom';

import { Home } from '~/views/Home/Home';
import { Login } from '~/views/Login/Login';

const publicRoutes = [
  {
    path: '/auth/sign-in',
    element: <Login />,
  },
  { path: '*', element: <Navigate to="/auth/sign-in" /> },
];

const privateRoutes = [
  {
    path: '/home',
    element: <Home />,
  },
  { path: '*', element: <Navigate to="/home" /> },
];

export function Router() {
  const auth = sessionStorage.getItem('is-authenticated');

  const routes = auth ? privateRoutes : publicRoutes;

  const router = useRoutes([...routes]);

  return router;
}

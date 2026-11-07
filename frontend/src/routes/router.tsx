import { createBrowserRouter, Navigate } from 'react-router';

import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Motoristas from '../pages/Motoristas/Motoristas';

const router = createBrowserRouter([

  { path: '/motoristas',
    element: <Motoristas /> 
  },

  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
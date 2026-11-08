import { createBrowserRouter, Navigate } from 'react-router';

import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Motoristas from '../pages/Motoristas/Motoristas';
import Veiculos from '../pages/Veiculos/Veiculos';
import Menu from '../pages/Menu/Menu';
import Rotas from '../pages/Rotas/Rotas';
import Escalas from '../pages/Escalas/Escalas';

const router = createBrowserRouter([

  { path: '/escalas', element: 
  <Escalas /> },

  { path: '/rotas', element:
  <Rotas /> },

  { path: '/menu', element:
  <Menu /> },

  { path: '/veiculos',
    element: <Veiculos /> 
  },

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
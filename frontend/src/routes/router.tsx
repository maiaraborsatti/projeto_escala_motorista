import { createBrowserRouter, Navigate } from 'react-router';

import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Motoristas from '../pages/Motoristas/Motoristas';
import CadastroMotorista from '../pages/Motoristas/CadastroMotorista';
import Veiculos from '../pages/Veiculos/Veiculos';
import CadastroVeiculo from '../pages/Veiculos/CadastroVeiculo';
import Menu from '../pages/Menu/Menu';
import Rotas from '../pages/Rotas/Rotas';
import CadastroRotas from '../pages/Rotas/CadastroRotas';
import Escalas from '../pages/Escalas/Escalas';
import EscalasMotorista from '../pages/Escalas/EscalasMotorista';

const router = createBrowserRouter([

  { path: '/escalas', element: 
  <Escalas /> },

  { path: '/minhas-escalas', element: 
  <EscalasMotorista />,
},

  { path: '/rotas', element:
  <Rotas /> },

  { path: '/cadrotas', element:
  <CadastroRotas /> },

  { path: '/menu', element:
  <Menu /> },

  { path: '/veiculos',
    element: <Veiculos /> 
  },

  { path: '/formveiculos',
    element: <CadastroVeiculo /> 
  },

  { path: '/motoristas',
    element: <Motoristas /> 
  },

  { path: '/cadmotoristas',
    element: <CadastroMotorista /> 
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
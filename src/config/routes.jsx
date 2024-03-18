import { useTranslation } from 'react-i18next'

import { AuthRoute } from '@/contexts/AuthContext/AuthRoute'
import { PublicRoute } from '@/contexts/AuthContext/PublicRoute'
import { RolesPermitidos } from '@/contexts/AuthContext/RolesPermitidos'

import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { Error404 } from '@/pages/Error404'

import { FaHome } from 'react-icons/fa'

function Rutas() {
  const { t } = useTranslation()

  return [
    {
      path: '/',
      element: <Home />,
      name: t('home'),
      icon: <FaHome />,
      private: false,
      public_only: false,
      allowed_roles: ['admin', 'usuario']
    },
    {
      path: '/login',
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
      name: t('login'),
      icon: <FaHome />,
      private: false,
      public_only: true,
      allowed_roles: ['admin', 'usuario']
    },
    {
      path: '/dashboard',
      element: (
        <AuthRoute>
          <RolesPermitidos roles={['admin']}>
            <Dashboard />
          </RolesPermitidos>
        </AuthRoute>
      ),
      name: t('dashboard'),
      icon: <FaHome />,
      private: true,
      public_only: false,
      allowed_roles: ['admin']
    },
    {
      path: '*',
      element: <Error404 />,
      private: false,
      public_only: false
    },
  ]
}

export { Rutas }
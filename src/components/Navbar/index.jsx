import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SelectorIdioma } from './SelectorIdioma'
import { SelectorTheme } from './SelectorTheme'
import { Rutas } from '../../config/routes.jsx'
import { useAuth } from '@/contexts/AuthContext/useAuth'

function Navbar({ handleSelectIdioma, handleChangeTheme, idioma, theme }) {
  const routes = Rutas()
  const { t } = useTranslation()

  const auth = useAuth()

  const handleLogout = () => {
    auth.logout()
  }

  return (
    <div>Navbar</div>
  )
}

export { Navbar }
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Toaster } from '@/components/ui/toaster'
import { Navbar } from '@/components/Navbar'
import { Rutas } from '@/config/routes.jsx'
import { useAuth } from '@/contexts/AuthContext/useAuth'

function App() {
  const routes = Rutas()
  const { i18n } = useTranslation()
  const auth = useAuth()

  const [idioma, setIdioma] = useState(localStorage.getItem('idioma') || '')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })

  const handleSelectIdioma = (value) => {
    setIdioma(value)
    i18n.changeLanguage(value)
    localStorage.setItem('idioma', value)
  }

  const handleChangeTheme = (value) => {
    if (value === 'dark') {
      setTheme('dark')
      localStorage.setItem('theme', value)
    } else {
      setTheme('light')
      localStorage.setItem('theme', value)
    }
  }

  useEffect(() => {
    const idiomaGuardado = localStorage.getItem('idioma')
    if (!idiomaGuardado) {
      const idiomaSistema = navigator.language

      if (idiomaSistema !== 'es' && idiomaSistema !== 'en') {
        setIdioma('es')
        i18n.changeLanguage('es')
        localStorage.setItem('idioma', 'es')
        return
      }

      setIdioma(idiomaSistema)
      i18n.changeLanguage(idiomaSistema)
      localStorage.setItem('idioma', idiomaSistema)
    }
    
    if (idiomaGuardado && i18n.language !== idiomaGuardado) {
      setIdioma(idiomaGuardado)
      i18n.changeLanguage(idiomaGuardado)
    }
  }, [i18n])

  useEffect(() => {
    const classDark = (tema) => {
      if (tema === 'dark') {
        document.querySelector('html').classList.add('dark')
      } else {
        document.querySelector('html').classList.remove('dark')
      }
    }

    const themeGuardado = localStorage.getItem('theme')
    if (themeGuardado) {
      setTheme(themeGuardado)
      classDark(theme)
    } else {
      localStorage.setItem('theme', theme)
      classDark(theme)
    }
  }, [theme])

  return (
    <div className='min-h-screen min-w-screen p-4 flex flex-col dark:bg-zinc-950'>
      <Routes>
        {routes && routes.map(route => {

          if (route.nestedRoutes) {
            return (
              <Route key={route.path} path={route.path} element={route.element}>
                {route.nestedRoutes.map(nestedRoute => (
                  <Route key={nestedRoute.path} path={nestedRoute.path} element={nestedRoute.element} />
                ))}
              </Route>
            )
          } else {
            return (
              <Route key={route.path} path={route.path} element={route.element} />
            )
          }
          
        })}
      </Routes>
      <Navbar
        handleSelectIdioma={handleSelectIdioma}
        handleChangeTheme={handleChangeTheme}
        idioma={idioma}
        theme={theme}
      />
      <Toaster />
    </div>
  )
}

export { App }
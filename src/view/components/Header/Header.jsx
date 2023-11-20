import { createContext, useContext, useEffect, useState } from 'react'
import { Moon } from '../Logos/Moon'
import { Sun } from '../Logos/Sun'
import { UserBlack } from '../Logos/user/UserBlack'
import { UserWhite } from '../Logos/user/UserWhite'
import './Header.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/App/AppContext'

export const ThemeContext = createContext(null)

export default function Header () {
  const { userLogged, logoutUser, getUserLogged } = useContext(AppContext)

  useEffect(() => {
    getUserLogged()
  }, [])

  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const navigate = useNavigate()

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <header className='header' theme={theme}>
        <div className='header__text'>
          <div className='header__div'>
            <Link to='/' className='tittle' onClick={() => logoutUser}>noteX</Link>
            <p className='welcome'>Bienvenid@, <span className='user-name'>{userLogged.firstName}</span></p>
          </div>
          <div className='user' onClick={() => navigate('/app/user')}>
            {theme === 'dark' ? <UserWhite width='25px' height='25px' /> : <UserBlack width='25px' height='25px' />}
          </div>

        </div>
        <div className='mode' onClick={toggleTheme}>
          {theme === 'dark' ? <Sun width='35px' /> : <Moon width='35px' />}
        </div>
      </header>
      <Outlet />
    </ThemeContext.Provider>
  )
}

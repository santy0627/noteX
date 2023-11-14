import { useContext } from 'react'
import { Moon } from '../Logos/Moon'
import { Sun } from '../Logos/Sun'
import { UserBlack } from '../Logos/user/UserBlack'
import { UserWhite } from '../Logos/user/UserWhite'
import './Header.css'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../pages/Application/Application'

export default function Header ({ toggleMode, mode }) {
  const user = JSON.parse(globalThis.localStorage.getItem('USER'))

  const deleteUser = () => {
    globalThis.localStorage.removeItem('USER')
  }
  const theme = useContext(ThemeContext)
  return (
    <header className='header' theme={theme}>
      <div className='header__text'>
        <Link to='/inicio' className='tittle' onClick={deleteUser}>noteX</Link>
        <p className='welcome'>Bienvenid@, <span className='user-name'>{user.firstName}</span>
          {theme === 'dark' ? <UserWhite width='25px' height='25px' /> : <UserBlack width='25px' height='25px' />}
        </p>

      </div>
      <div className='mode' onClick={toggleMode}>
        {theme === 'dark' ? <Sun width='35px' /> : <Moon width='35px' />}
      </div>
    </header>
  )
}

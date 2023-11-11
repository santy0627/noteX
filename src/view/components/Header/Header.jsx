import { Moon } from '../Logos/Moon'
import { Sun } from '../Logos/Sun'
import { UserBlack } from '../Logos/user/UserBlack'
import { UserWhite } from '../Logos/user/UserWhite'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header ({ toggleMode, theme, mode }) {
  const user = JSON.parse(globalThis.localStorage.getItem('USER'))

  const deleteUser = () => {
    globalThis.localStorage.removeItem('USER')
  }

  return (
    <header className='header' theme={theme}>
      <div className='header__text'>
        <Link to='/inicio' className='tittle' onClick={deleteUser}>noteX</Link>
        <p className='welcome'>Bienvenid@, <span className='user-name'>{user.firstName}</span>
          {mode ? <UserBlack width='25px' height='25px' /> : <UserWhite width='25px' height='25px' />}
        </p>

      </div>
      <div className='mode' onClick={toggleMode}>
        {mode ? <Moon width='35px' /> : <Sun width='35px' />}
      </div>
    </header>
  )
}

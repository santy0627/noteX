import './Header.css'
import { Link } from 'react-router-dom'

export default function Header ({ toggleMode, theme, mode }) {
  const user = JSON.parse(globalThis.localStorage.getItem('USER'))

  return (
    <header className='header' theme={theme}>
      <div className='header__text'>
        <Link to='/inicio' className='tittle'>noteX</Link>
        <p className='welcome'>Bienvenid@, <span className='user-name'>{user.firstName}</span></p>
      </div>
      <div className='mode'>
        <img className='sun' src={`/src/assets/svg${mode ? 'Moon' : 'Sun'}.svg`} alt='' width='35px' onClick={toggleMode} />
      </div>
    </header>
  )
}

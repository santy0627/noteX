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
          <img className='img-user' src={`../../../assets/svg/user-${mode ? 'black' : 'white'}.svg`} alt='plus' width='25px' />
        </p>

      </div>
      <div className='mode'>
        <img className='sun' src={`../../../assets/svg/svg${mode ? 'Moon' : 'Sun'}.svg`} alt='' width='35px' onClick={toggleMode} />
      </div>
    </header>
  )
}

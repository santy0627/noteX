import React, { useContext } from 'react'
import './UserPage.css'
import { ThemeContext } from '../../components/Header/Header'
import { AppContext } from '../../context/App/AppContext'
import { ProfileWhite, ProfileBlack } from '../../components/Logos/Profile'
import { LogoutWhite } from '../../components/Logos/Logout/LogoutWhite'
import { LogoutBlack } from '../../components/Logos/Logout/LogoutBlack'
import { Link } from 'react-router-dom'
import { BackBlack, BackWhite } from '../../components/Logos/Back'

export default function UserPage () {
  const { theme } = useContext(ThemeContext)
  const { user, logoutUser } = useContext(AppContext)

  console.log(user)
  return (
    <main className='userPage' theme={theme}>
      <Link to='/app' className='back'>
        {theme === 'dark' ? <BackWhite width='60px' height='60px' /> : <BackBlack width='60px' height='60px' />}
      </Link>
      <article className='user-card'>
        <section className='user-card__info'>
          <div className='user-div'>
            <div className='user-img'>
              {theme === 'dark' ? <ProfileBlack width='80px' /> : <ProfileWhite width='80px' />}
            </div>
            <div className='user-content'>
              <h1 className='user-content__name'>{user.firstName + ' ' + user.lastName}</h1>
              <p className='user-content__email'>{user.email}</p>
            </div>
          </div>
          <div className='logout'>
            <Link to='/ingreso' onClick={() => logoutUser}>
              {theme === 'dark' ? <LogoutWhite width='80px' height='80px' /> : <LogoutBlack width='80px' height='80px' />}
            </Link>
          </div>
        </section>
        <div className='user-info__edit'>
          <h1 className='user-info__title'>Edita tu usuario!</h1>
          <form className='user-form'>
            <div className='user-from__campos'>
              <label className='user-form__label'>Nombre</label>
              <input className='user-form__campo' name='firstName' type='text' placeholder={user.firstName} />

              <label className='user-form__label'>Apellido</label>
              <input className='user-form__campo' name='lastName' type='text' placeholder={user.lastName} />

              <label className='user-form__label'>Correo</label>
              <input className='user-form__campo' name='email' type='email' placeholder={user.email} />

              <label className='user-form__label'>Contraseña</label>
              <input className='user-form__campo' name='password' type='password' placeholder='********' />
            </div>

            <button type='submit' className='boton submit solo'>Actualizar</button>
            <button className='boton cancel solo'>Eliminar usuario</button>
          </form>
        </div>
      </article>
    </main>
  )
}

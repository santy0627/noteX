import React, { useContext, useEffect } from 'react'
import './UserPage.css'
import { ThemeContext } from '../../components/Header/Header'
import { AppContext } from '../../context/App/AppContext'
import { ProfileWhite, ProfileBlack } from '../../components/Logos/Profile'
import { LogoutWhite } from '../../components/Logos/Logout/LogoutWhite'
import { LogoutBlack } from '../../components/Logos/Logout/LogoutBlack'
import { Link, useNavigate } from 'react-router-dom'
import { BackBlack, BackWhite } from '../../components/Logos/Back'

export default function UserPage () {
  const { theme } = useContext(ThemeContext)
  const { user, logoutUser, dispatch, getUserLogged, userLogged } = useContext(AppContext)

  const navigate = useNavigate()

  const updateUser = (event) => {
    event.preventDefault()

    let body = {}

    body = {
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      _id: user._id
    }
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then((response) => {
      if (response.ok) return response.json()
      throw new Error('Error al actualizar la tarea')
    }).then((response) => {
      dispatch({
        type: 'UPDATE_TASK',
        payload: response.user
      })
      navigate('/ingreso')
    })
    event.target.reset()
  }

  const deleteUser = () => {
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user/' + userLogged._id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) return response.json()
      throw new Error('Error al eliminar al usuario')
    }).then((response) => {
      dispatch({
        type: 'DELETE_USER',
        payload: response.user._id
      })
      navigate('/ingreso')
    })
  }

  useEffect(() => {
    getUserLogged()
  }, [])

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
              <h1 className='user-content__name'>{userLogged.firstName + ' ' + userLogged.lastName}</h1>
              <p className='user-content__email'>{userLogged.email}</p>
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
          <form className='user-form' onSubmit={updateUser}>
            <div className='user-from__campos'>
              <label className='user-form__label'>Nombre</label>
              <input className='user-form__campo' name='firstName' type='text' defaultValue={userLogged.firstName} />

              <label className='user-form__label'>Apellido</label>
              <input className='user-form__campo' name='lastName' type='text' defaultValue={userLogged.lastName} />

              <label className='user-form__label'>Correo</label>
              <input className='user-form__campo' name='email' type='email' defaultValue={userLogged.email} />

              <label className='user-form__label'>Contraseña</label>
              <input className='user-form__campo' name='password' type='password' defaultValue={userLogged.password} />
            </div>

            <button type='submit' className='boton submit solo'>Actualizar</button>
          </form>
          <button className='boton cancel solo' onClick={() => deleteUser}>Eliminar usuario</button>
        </div>
      </article>
    </main>
  )
}

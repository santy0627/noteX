import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useContext } from 'react'
import { AppContext } from '../../context/App/AppContext'

export default function Login () {
  const { dispatch, userLogged, user } = useContext(AppContext)

  const navigate = useNavigate()

  console.log(user)
  console.log(userLogged)

  const getUser = (event) => {
    event.preventDefault()
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: event.target.elements.email.value,
        password: event.target.elements.password.value
      })
    }).then((response) => {
      if (response.ok) return response.json()
      throw new Error('Error al autenticar el usuario')
    }).then((response) => {
      dispatch({
        type: 'GET_USER',
        payload: response.user
      })
      navigate('/app')
    }).catch(error => {
      window.alert(error)
    })
  }

  return (
    <div className='login'>
      <main className='caja-form'>
        <form className='form' onSubmit={getUser}>
          <h1 className='form__title'>Ingreso</h1>

          <div className='form__campos'>

            <label>Correo</label>
            <input className='campo' name='email' type='email' placeholder='correo' />

            <label>Contraseña</label>
            <input className='campo' name='password' type='password' placeholder='contraseña' />
          </div>

          <button type='submit' className='btn'>Entrar</button>

          <div className='text'>
            <p className='text__p'>¿Aún no tienes una cuenta? &nbsp;
              <Link to='/registro' className='text__enlace'>
                Registrate aquí
              </Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}

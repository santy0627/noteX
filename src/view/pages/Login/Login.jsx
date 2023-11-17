import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../context/App/AppContext'
import './Login.css'

export default function Login () {
  const { getUser } = useContext(AppContext)

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

import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

export default function Login () {
  return (
    <div className='login'>
      <main className='caja-form'>
        <form className='form'>
          <h1 className='form__title'>Ingreso</h1>

          <div className='form__campos'>

            <label>Correo</label>
            <input className='campo' name='email' type='email' placeholder='correo' />

            <label>Contraseña</label>
            <input className='campo' name='password' type='password' placeholder='contraseña' />
          </div>

          <button className='btn'>Entrar</button>

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

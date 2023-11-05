import React from 'react'
import './Registro.css'
import { Link, useNavigate } from 'react-router-dom'

export default function Registro () {
  const navigate = useNavigate()

  function handleSubmit (event) {
    event.preventDefault()
    let body = {}

    for (const element of event.target.elements) {
      if (element.name) {
        body = { ...body, [element.name]: element.value }
      }
    }
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.ok) return response.json()
      console.log(response)
      throw new Error('Error al crear el usuario')
    }).then(() => {
      navigate('/ingreso')
    })
  }

  return (
    <div className='registro'>
      <main className='caja-form'>
        <form className='form' onSubmit={handleSubmit}>
          <h1 className='form__title'>Registro</h1>

          <div className='form__campos'>
            <label>Nombre</label>
            <input className='campo' name='firstName' type='text' placeholder='nombre' />

            <label>Apellido</label>
            <input className='campo' name='lastName' type='text' placeholder='nombre' />

            <label>Correo</label>
            <input className='campo' name='email' type='email' placeholder='correo' />

            <label>Contraseña</label>
            <input className='campo' name='password' type='password' placeholder='contraseña' />
          </div>

          <button type='submit' className='btn'>Enviar</button>

          <div className='text'>
            <p className='text__p'>¿Ya tienes una cuenta? &nbsp;
              <Link to='/ingreso' className='text__enlace'>
                Ingresa aquí
              </Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}

import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'

export default function Landing () {
  return (
    <div className='container'>
      <div className='aside'>
        <h1 className='aside__title'>noteX</h1>
        <div className='aside__content'>
          <p className='aside__text'>
            Crea notas fácil y de una manera elegante, organiza tu día a día y
            manten tu vida en orden
          </p>
          <p className='aside__text2'>Si aún no tienes una cuenta</p>
          <Link to='/registro' className='btn' style={{ backgroundColor: '#7CC0A8' }}>
            Registrate aquí
          </Link>
          <Link to='/ingreso' className='aside__enlace'>
            ¿ya tienes una cuenta? Ingresa aquí
          </Link>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import './Error.css'
import { Image } from '../Logos/Image'
import { Link } from 'react-router-dom'

export default function Error ({ errorText, statusError }) {
  return (
    <section className='error'>
      <div className='error__div'>
        <h1 className='error__title'>Oops!</h1>
        <p className='error__text'>Ha ocurrido un error con la página</p>
        <div className='error__description'>
          {errorText}{statusError}
        </div>
        <Link to='/' className='btn'>Volver al inicio</Link>
      </div>
      <div className='error__image'>
        <Image />
      </div>
    </section>
  )
}

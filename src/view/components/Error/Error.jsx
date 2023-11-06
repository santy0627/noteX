import React from 'react'
import './Error.css'

export default function Error ({ errorText, statusError }) {
  return (
    <section className='error'>
      <h1 className='error__title'>Oops!</h1>
      <p className='error__text'>Ha ocurrido un error con la página</p>
      <div className='error__description'>
        {errorText}{statusError}
      </div>
    </section>
  )
}

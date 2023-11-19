import React, { useContext } from 'react'
import './NewNote.css'
import { ThemeContext } from '../../pages/Application/Application'
import { AppContext } from '../../context/App/AppContext'

export default function NewNote () {
  const { theme } = useContext(ThemeContext)

  const { createTask } = useContext(AppContext)

  return (
    <div className='modal' theme={theme}>
      <header className='modal__header'>
        <h1 className='modal__header-title'>Crear nota nueva</h1>
      </header>
      <form className='form-modal' onSubmit={createTask}>
        <input className='form-modal__name' type='text' name='name' placeholder='Nombre de tu nota' />
        <textarea className='form-modal__description' type='text' name='description' placeholder='Descripción de la nota' />
        <input className='form-modal__date' type='date' name='finishDate' id='date' />

        <div className='buttons'>
          <button className='boton submit solo' type='submit'>Crear nota</button>
        </div>
      </form>
    </div>
  )
}

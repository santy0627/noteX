import React from 'react'
import './NewNote.css'

export default function NewNote ({ toggleOpen, handleCreate, theme }) {
  return (
    <div className='background' theme={theme}>
      <div className='modal'>
        <header className='modal__header'>
          <h1 className='modal__header-title'>Crear nota nueva</h1>
        </header>
        <form className='form-modal' onSubmit={handleCreate}>
          <input className='form-modal__name' type='text' name='name' placeholder='Nombre de tu nota' />
          <input className='form-modal__description' type='text' name='description' placeholder='Descripción de la nota' />
          <input className='form-modal__date' type='date' name='finishDate' id='date' placeholder='hola' />

          <div className='buttons'>
            <button className='boton cancel' onClick={toggleOpen}>Cancelar</button>
            <button className='boton submit' type='submit'>Crear nota</button>
          </div>
        </form>
      </div>
    </div>
  )
}

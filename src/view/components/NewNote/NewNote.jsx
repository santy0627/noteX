import React from 'react'
import './NewNote.css'

export default function NewNote ({ toggleOpen }) {
  const user = JSON.parse(globalThis.localStorage.getItem('USER'))

  const userID = user._id

  function handleCreate (event) {
    event.preventDefault()
    let body = {}

    for (const element of event.target.elements) {
      if (element.name) {
        body = { ...body, [element.name]: element.value }
      }
    }
    body = { ...body, userId: userID, isCompleted: false }
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.ok) return response.json()
      throw new Error('Error al crear la nota')
    }).then((data) => {
      console.log(data.todo)
    })
    event.target.reset()
  }

  return (
    <div className='background'>
      <div className='modal'>
        <header className='modal__header'>
          <h1 className='modal__header-title'>Crear nota nueva</h1>
        </header>
        <form className='form-modal' onSubmit={handleCreate}>
          <input className='form-modal__name' type='text' name='name' placeholder='Nombre de tu nota' />
          <input className='form-modal__description' type='text' name='description' placeholder='Descripción de la nota' />
          <input className='form-modal__date' type='date' name='finishDate' id='date' />

          <div className='buttons'>
            <button className='boton cancel' onClick={toggleOpen}>Cancelar</button>
            <button className='boton submit' type='submit'>Crear nota</button>
          </div>
        </form>
      </div>
    </div>
  )
}

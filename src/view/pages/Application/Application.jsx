import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './Application.css'
import Task from '../../components/Task/Task'
import NewNote from '../../components/NewNote/NewNote'

export default function Application () {
  const [mode, setMode] = useState(false)

  const theme = mode ? 'light' : 'dark'

  const toggleMode = () => {
    setMode(!mode)
  }

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
    console.log(isOpen)
  }

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
    <>
      <div className='application' theme={theme}>
        <Header toggleMode={toggleMode} theme={theme} mode={mode} />
        <input className='search' type='text' name='search' id='search' placeholder='Busca una nota...' />
        <main className='tareas'>
          <div className='pendientes'>
            <h1 className='tareas__status'>Tareas pendientes</h1>
            <Task title='hola' description='nada' finishDate='11/04/23' />
          </div>
          <div className='completadas'>
            <h1 className='tareas__status'>Tareas completadas</h1>
          </div>
        </main>
        <div className='img-div' onClick={toggleOpen}>
          <img className='img-plus' src={`/src/assets/plus-${mode ? 'black' : 'white'}.svg`} alt='plus' width='25px' />
        </div>
      </div>
      {isOpen && <NewNote toggleOpen={toggleOpen} handleCreate={handleCreate} />}
    </>
  )
}

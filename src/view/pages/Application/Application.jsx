import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './Application.css'
import Task from '../../components/Task/Task'
import NewNote from '../../components/NewNote/NewNote'
import { PlusWhite } from '../../components/Logos/plus/PlusWhite'
import { PlusBlack } from '../../components/Logos/plus/PlusBlack'

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

  useEffect(() => {
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo?userId=' + userID)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Error al recoger las notas')
      }).then((data) => {
        globalThis.localStorage.setItem('TODOS', JSON.stringify(data.todos))
      })
  }, [])

  const todos = JSON.parse(globalThis.localStorage.getItem('TODOS'))

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
            <div className='tareas__content'>
              {todos.map(todo =>
                <Task key={todo._id} title={todo.name} description={todo.description} finishDate={todo.finishDate} />
              )}
            </div>
          </div>
          <div className='completadas'>
            <h1 className='tareas__status'>Tareas completadas</h1>
            <div className='tareas__content' />
          </div>
        </main>
        <div className='img-div' onClick={toggleOpen}>
          {mode ? <PlusBlack width='25px' height='25px' /> : <PlusWhite width='25px' height='25px' />}
        </div>
      </div>
      {isOpen && <NewNote toggleOpen={toggleOpen} handleCreate={handleCreate} theme={theme} />}
    </>
  )
}

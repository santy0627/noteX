import React, { createContext, useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './Application.css'
import Task from '../../components/Task/Task'
import NewNote from '../../components/NewNote/NewNote'
import { PlusWhite } from '../../components/Logos/plus/PlusWhite'
import { PlusBlack } from '../../components/Logos/plus/PlusBlack'
import { TaskContext } from '../../context/Task/TaskContext'

export const ThemeContext = createContext(null)

export default function Application () {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
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
    })
    event.target.reset()
  }

  const { tasks, getTasks } = useContext(TaskContext)

  useEffect(() => {
    getTasks()
  }, [isOpen])

  const newTasks = tasks

  return (
    <ThemeContext.Provider value={theme}>
      <Header toggleMode={toggleTheme} mode={theme} />
      <div className='application' theme={theme}>
        <input className='search' type='text' name='search' id='search' placeholder='Busca una nota...' />
        <main className='tareas'>
          <article className='pendientes'>
            <h1 className='tareas__status'>Tareas pendientes</h1>
            <div className='tareas__content'>
              {newTasks.map(todo =>
                <Task key={todo._id} title={todo.name} description={todo.description} finishDate={todo.finishDate} />
              )}
            </div>
          </article>
          <article className='completadas'>
            <h1 className='tareas__status'>Tareas completadas</h1>
            <div className='tareas__content' />
          </article>
        </main>
        <div className='img-div' onClick={toggleOpen}>
          {theme === 'dark' ? <PlusWhite width='25px' height='25px' /> : <PlusBlack width='25px' height='25px' />}
        </div>
      </div>
      {isOpen && <NewNote toggleOpen={toggleOpen} handleCreate={handleCreate} />}
    </ThemeContext.Provider>
  )
}

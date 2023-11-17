import React, { createContext, useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './Application.css'
import Task from '../../components/Task/Task'
import NewNote from '../../components/NewNote/NewNote'
import { PlusWhite } from '../../components/Logos/plus/PlusWhite'
import { PlusBlack } from '../../components/Logos/plus/PlusBlack'
import { AppContext } from '../../context/App/AppContext'

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

  const { tasks, getTasks, user } = useContext(AppContext)

  const userID = user._id

  function handleCreate (event) {
    event.preventDefault()

    const date = new Date(event.target.elements.finishDate.value)
    const dd = date.getDate()
    const mm = date.getMonth() + 1
    const yyyy = date.getFullYear()
    const finishDate = yyyy + '-' + mm + '-' + dd

    let body = {}

    body = JSON.stringify({
      name: event.target.elements.name.value,
      description: event.target.elements.description.value,
      finishDate,
      isCompleted: false,
      userId: userID
    })
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.ok) return response.json()
      console.log(response)
      throw new Error('Error al crear la nota')
    })
    event.target.reset()
  }

  useEffect(() => {
    getTasks()
  }, [isOpen])

  const newTasks = tasks

  console.log(user)

  return (

    <ThemeContext.Provider value={theme}>
      <Header toggleMode={toggleTheme} mode={theme} />
      <div className='application' theme={theme}>
        <input className='search' type='text' name='search' id='search' placeholder='Busca una nota...' />
        <main className='tareas'>
          <article className='pendientes'>
            <h1 className='tareas__status'>Tareas pendientes</h1>
            <div className='tareas__content'>
              {newTasks && newTasks.map(todo =>
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

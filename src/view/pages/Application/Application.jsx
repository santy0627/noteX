import React, { createContext, useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import './Application.css'
import Task from '../../components/Task/Task'
import NewNote from '../../components/NewNote/NewNote'
import { AppContext } from '../../context/App/AppContext'

export const ThemeContext = createContext(null)

export default function Application () {
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  const { getTasks, tasks } = useContext(AppContext)

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Header toggleMode={toggleTheme} mode={theme} />
      <div className='application' theme={theme}>
        <input className='search' type='text' name='search' id='search' placeholder='Busca una nota...' />
        <main className='tareas'>
          <article className='pendientes'>
            <h1 className='tareas__status'>Tareas pendientes</h1>
            <div className='tareas__content'>
              {tasks && tasks.map(todo =>
                <Task key={todo._id} title={todo.name} description={todo.description} finishDate={todo.finishDate} />
              )}
            </div>
          </article>
          <article className='completadas'>
            <h1 className='tareas__status'>Tareas completadas</h1>
            <div className='tareas__content' />
          </article>
          <NewNote />
        </main>
      </div>

    </ThemeContext.Provider>
  )
}

import React, { useContext, useEffect } from 'react'
import './Application.css'
import Task from '../../components/Task/Task'
import NewNote from '../../components/NewNote/NewNote'
import { AppContext } from '../../context/App/AppContext'
import EditNote from '../../components/EditNote/EditNote'
import { ThemeContext } from '../../components/Header/Header'

export default function Application () {
  const { getTasks, tasks, selectedTask } = useContext(AppContext)

  useEffect(() => {
    getTasks()
  }, [])

  const incompletedTasks = tasks.filter(task => task.isCompleted === false)

  const completedTasks = tasks.filter(task => task.isCompleted === true)

  const { theme } = useContext(ThemeContext)

  return (
    <div className='application' theme={theme}>
      <input className='search' type='text' name='search' id='search' placeholder='Busca una nota...' />
      <main className='tareas'>
        <article className='pendientes'>
          <h1 className='tareas__status'>Tareas pendientes</h1>
          <div className='tareas__content'>
            {incompletedTasks && incompletedTasks.map(todo =>

              <Task key={todo._id} title={todo.name} description={todo.description} finishDate={todo.finishDate} taskId={todo._id} estado={todo.isCompleted} />
            )}
          </div>
        </article>
        <article className='completadas'>
          <h1 className='tareas__status'>Tareas completadas</h1>
          <div className='tareas__content'>
            {completedTasks && completedTasks.map(todo =>

              <Task key={todo._id} title={todo.name} description={todo.description} finishDate={todo.finishDate} taskId={todo._id} estado={todo.isCompleted} />
            )}
          </div>
        </article>
        {selectedTask ? <EditNote /> : <NewNote />}
      </main>
    </div>
  )
}

import React, { useContext, useEffect } from 'react'
import './Application.css'
import Task from '../../components/Task/Task'
import NewNote from '../../components/NewNote/NewNote'
import { AppContext } from '../../context/App/AppContext'
import EditNote from '../../components/EditNote/EditNote'
import { ThemeContext } from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'

export default function Application () {
  const { getTasks, tasks, selectedTask, user, dispatch, getUserLogged } = useContext(AppContext)

  useEffect(() => {
    getTasks()
    getUserLogged()
  }, [])

  const incompletedTasks = tasks.filter(task => task.isCompleted === false)

  const completedTasks = tasks.filter(task => task.isCompleted === true)

  const { theme } = useContext(ThemeContext)

  const navigate = useNavigate()

  const searchTasks = (event) => {
    event.preventDefault()
    fetch('https://birsbane-numbat-zjcf.1.us-1.fl0.io/api/todo?userId=' + user._id +
      '&searhTerm=' + event.target.elements.searchTerm.value +
      '&startDate=' + event.target.elements.startDate.value +
      '&endDate=' + event.target.elements.endDate.value
    ).then((response) => {
      if (response.ok) return response.json()
      throw new Error('Error al filtrar las tareas')
    }).then((response) => {
      dispatch({
        type: 'GET_FILTERED_TASKS',
        payload: response.todos
      })
      navigate('/app/search')
    }).catch(error => {
      window.alert(error)
    })
    event.target.reset()
  }

  return (
    <div className='application' theme={theme}>
      <form className='form-search' onSubmit={searchTasks}>
        <input className='search' type='text' name='searchTerm' id='search' placeholder='Busca una nota por su nombre...' />
        <div className='search-date'>
          <div className='search__startDate'>
            <label className='search-label'>Fecha inicial</label>
            <input className='search-date__camp' type='text' name='startDate' placeholder='yyyy-mm-dd' />
          </div>
          <div className='search__endDate'>
            <label className='search-label'>Fecha final</label>
            <input className='search-date__camp' type='text' name='endDate' placeholder='yyyy-mm-dd' />
          </div>
          <button type='submit' className='boton submit solo'>Buscar</button>
        </div>
      </form>
      <main className='tareas'>
        <div className='tareas__div'>
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
        </div>
        {selectedTask ? <EditNote /> : <NewNote />}
      </main>
    </div>
  )
}

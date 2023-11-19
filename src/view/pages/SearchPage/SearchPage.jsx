import React, { useContext } from 'react'
import { ThemeContext } from '../../components/Header/Header'
import { AppContext } from '../../context/App/AppContext'
import Task from '../../components/Task/Task'
import { Link } from 'react-router-dom'
import { PlusBlack, PlusWhite } from '../../components/Logos/Plus'
import './SearchPage.css'

export default function SearchPage () {
  const { theme } = useContext(ThemeContext)

  const { filteredTasks, user, dispatch } = useContext(AppContext)

  const incompletedTasks = filteredTasks.filter(task => task.isCompleted === false)
  const completedTasks = filteredTasks.filter(task => task.isCompleted === true)

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
        <div className='add-task'>
          <h1 className='modal__header-title'>Crear nota nueva</h1>
          <Link to='/app' className='add-task__link'>
            {theme === 'dark' ? <PlusWhite width='100px' height='100px' /> : <PlusBlack width='100px' height='100px' />}
          </Link>
        </div>
      </main>
    </div>
  )
}

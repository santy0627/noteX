import React, { useContext } from 'react'
import './Task.css'
import { ThemeContext } from '../../pages/Application/Application'
import { TrashWhite } from '../Logos/trash/TrashWhite'
import { TrashBlack } from '../Logos/trash/TrashBlack'
import { AppContext } from '../../context/App/AppContext'

export default function Task ({ title, description, finishDate, taskId }) {
  const { theme } = useContext(ThemeContext)
  const { deleteTask } = useContext(AppContext)

  const date = new Date(finishDate)
  const dd = date.getDate(date) + 2
  const mm = date.getMonth(date) + 1
  const yyyy = date.getFullYear(date)
  const newDate = yyyy + '-' + mm + '-' + dd

  return (
    <section className='task'>
      <div className='task__content'>
        <h1 className='task__title'>{title}</h1>
        <p className='task__description'>{description}</p>
        <p className='task__date'>La tarea finaliza el: {newDate}</p>
      </div>
      <div className='task__options' onClick={() => deleteTask(taskId)}>
        {theme === 'dark' ? <TrashWhite width='30px' height='30px' /> : <TrashBlack width='30px' height='30px' />}
      </div>
    </section>
  )
}

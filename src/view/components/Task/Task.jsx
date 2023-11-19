import React, { useContext } from 'react'
import './Task.css'
import { ThemeContext } from '../../components/Header/Header'
import { TrashWhite } from '../Logos/trash/TrashWhite'
import { TrashBlack } from '../Logos/trash/TrashBlack'
import { AppContext } from '../../context/App/AppContext'
import CompleteBlack from '../Logos/complete/CompleteBlack'
import CompleteWhite from '../Logos/complete/CompleteWhite'

export default function Task ({ title, description, finishDate, taskId, estado }) {
  const { theme } = useContext(ThemeContext)
  const { deleteTask, completeTask, selectTask } = useContext(AppContext)

  const date = new Date(finishDate)
  const dd = date.getDate(date) + 1
  const mm = date.getMonth(date) + 1
  const yyyy = date.getFullYear(date)
  const newDate = yyyy + '-' + mm + '-' + dd

  return (
    <section className={`task ${estado ? 'complete' : 'incomplete'}`}>
      <div className='task__content' onClick={() => selectTask(taskId)}>
        <h1 className='task__title'>{title}</h1>
        <p className='task__description'>{description}</p>
        <p className='task__date'>La tarea finaliza el: {newDate}</p>
      </div>
      <aside className='task__options'>
        <div className='task__delete' onClick={() => deleteTask(taskId)}>
          {theme === 'dark' ? <TrashWhite width='30px' height='30px' /> : <TrashBlack width='30px' height='30px' />}
        </div>
        <div className='task__complete' onClick={() => completeTask({ title, description, newDate, taskId })}>
          {theme === 'dark' ? <CompleteWhite width='30px' height='30px' /> : <CompleteBlack width='30px' height='30px' />}
        </div>
      </aside>
    </section>
  )
}

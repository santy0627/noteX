import React, { useContext } from 'react'
import './Task.css'
import { ThemeContext } from '../../pages/Application/Application'
import { TrashWhite } from '../Logos/trash/TrashWhite'
import { EditWhite } from '../Logos/edit/EditWhite'
import { EditBlack } from '../Logos/edit/EditBlack'
import { TrashBlack } from '../Logos/trash/TrashBlack'

export default function Task ({ title, description, finishDate }) {
  const theme = useContext(ThemeContext)

  return (
    <section className='task'>
      <div className='task__content'>
        <h1 className='task__title'>{title}</h1>
        <p className='task__description'>{description}</p>
        <p className='task__date'>La tarea tiene fin el: {finishDate}</p>
      </div>
      <div className='task__options'>
        {theme === 'dark' ? <TrashWhite width='30px' height='30px' /> : <TrashBlack width='30px' height='30px' />}
        {theme === 'dark' ? <EditWhite width='30px' height='30px' /> : <EditBlack width='30px' height='30px' />}
      </div>
    </section>
  )
}

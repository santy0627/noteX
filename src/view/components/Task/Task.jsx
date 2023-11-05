import React from 'react'
import './Task.css'

export default function Task ({ title, description, finishDate }) {
  return (
    <div className='task'>
      <h1 className='task__title'>{title}</h1>
      <p className='task__description'>{description}</p>
      <p className='task__date'>{finishDate}</p>
    </div>
  )
}

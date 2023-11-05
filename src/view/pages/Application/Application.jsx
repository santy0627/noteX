import React from 'react'
import Header from '../../components/Header/Header'
import './Application.css'
import Task from '../../components/Task/Task'

export default function Application () {
  return (
    <div className='application'>
      <Header />
      <main className='tareas'>
        <div className='pendientes'>
          <h1 className='tareas__status'>Tareas pendientes</h1>
          <Task title='hola' description='nada' finishDate='11/04/23' />
        </div>
        <div className='completadas'>
          <h1 className='tareas__status'>Tareas completadas</h1>
        </div>
      </main>
    </div>
  )
}

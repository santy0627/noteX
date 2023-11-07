import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './Application.css'
import Task from '../../components/Task/Task'
import Aside from '../../components/Aside/Aside'

export default function Application () {
  const [mode, setMode] = useState(false)

  const theme = mode ? 'light' : 'dark'

  const toggleMode = () => {
    setMode(!mode)
  }

  return (
    <>
      <div className='application' theme={theme}>
        <Header toggleMode={toggleMode} theme={theme} mode={mode} />
        <main className='tareas'>
          <div className='pendientes'>
            <h1 className='tareas__status'>Tareas pendientes</h1>
            <Task title='hola' description='nada' finishDate='11/04/23' />
          </div>
          <div className='completadas'>
            <h1 className='tareas__status'>Tareas completadas</h1>
          </div>
        </main>
        <Aside mode={mode} />
      </div>
    </>
  )
}

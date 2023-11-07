import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import './Application.css'
import Task from '../../components/Task/Task'

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
        <input className='search' type='text' name='search' id='search' placeholder='Busca una nota...' />
        <main className='tareas'>
          <div className='pendientes'>
            <h1 className='tareas__status'>Tareas pendientes</h1>
            <Task title='hola' description='nada' finishDate='11/04/23' />
          </div>
          <div className='completadas'>
            <h1 className='tareas__status'>Tareas completadas</h1>
          </div>
        </main>
        <div className='img-div'>
          <img className='img-plus' src={`/src/assets/plus-${mode ? 'black' : 'white'}.svg`} alt='plus' width='25px' />
        </div>
      </div>
    </>
  )
}

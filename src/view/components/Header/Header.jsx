import React from 'react'
import { Sun } from '../Logos/Sun'
import { Moon } from '../Logos/Moon'
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header () {
  return (
    <header className='header'>
      <div className='header__text'>
        <Link to='/inicio' className='tittle'>noteX</Link>
        <p className='welcome'>Bienvenido, usuario</p>
      </div>
      <div className='mode'>
        <Sun width='35px' />
        <Moon width='35px' />
      </div>
    </header>
  )
}

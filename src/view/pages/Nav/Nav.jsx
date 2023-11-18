import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import './Nav.css'
import { Github } from '../../components/Logos/Github'
import { Email } from '../../components/Logos/Email'
import { Menu } from '../../components/Logos/Menu'
import { AppState } from '../../context/App/AppState'

export default function Nav () {
  const [open, setOpen] = useState(false)

  const menuRef = useRef()

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  const handleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <header className='cabecera'>
        <div className={`content ${open ? 'active' : 'inactive'}`} ref={menuRef}>
          <Link to='/' className='title'>
            noteX
          </Link>
          <nav className='nav-bar'>
            <ul className='list'>
              <li className='list__element'>
                <NavLink className='list__link' to='/' onClick={handleOpen}>
                  Inicio
                </NavLink>
              </li>
              <li className='list__element'>
                <NavLink className='list__link' to='/registro' onClick={handleOpen}>
                  Registrarse
                </NavLink>
              </li>
              <li className='list__element'>
                <NavLink className='list__link' to='/ingreso' onClick={handleOpen}>
                  Ingresar
                </NavLink>
              </li>

              <div className='logos'>
                <a
                  className='logo'
                  href='https://github.com/santy0627/noteX'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <Github width={40} />
                </a>
                <a
                  className='logo'
                  href='https://gmail.com'
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <Email width={40} />
                </a>
              </div>
            </ul>
          </nav>
        </div>
        <div className='menu' onClick={handleOpen}>
          <Menu width='25' />
        </div>
      </header>
      <AppState>
        <Outlet />
      </AppState>
    </>
  )
}

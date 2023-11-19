import React, { useContext } from 'react'
import './UserPage.css'
import { ThemeContext } from '../../components/Header/Header'
import { AppContext } from '../../context/App/AppContext'
import { ProfileWhite, ProfileBlack } from '../../components/Logos/Profile'
import { LogoutWhite } from '../../components/Logos/Logout/LogoutWhite'
import { LogoutBlack } from '../../components/Logos/Logout/LogoutBlack'
import { Link } from 'react-router-dom'

export default function UserPage () {
  const { theme } = useContext(ThemeContext)
  const { user, logoutUser } = useContext(AppContext)

  console.log(user)
  return (
    <main className='userPage' theme={theme}>
      <article className='user-card'>
        <section className='user-info__card'>
          <div className='user-div'>
            <div className='user-img'>
              {theme === 'dark' ? <ProfileBlack width='80px' /> : <ProfileWhite width='80px' />}
            </div>
            <div className='user-content'>
              <h1 className='user-content__name'>{user.firstName + ' ' + user.lastName}</h1>
              <p className='user-content__email'>{user.email}</p>
            </div>
          </div>
          <div className='logout'>
            <Link to='/ingreso' onClick={() => logoutUser}>
              {theme === 'dark' ? <LogoutWhite width='80px' height='80px' /> : <LogoutBlack width='80px' height='80px' />}
            </Link>
          </div>
        </section>
        <div className='user-info__edit'>
          edit
        </div>
      </article>
    </main>
  )
}

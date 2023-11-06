import React from 'react'
import Error from '../../components/Error/Error'
import { useRouteError } from 'react-router-dom'
import './ErrorPage.css'

export default function ErrorPage () {
  const { statusText, message } = useRouteError()

  return (
    <main className='error-page'>
      <Error errorText={message} statusError={statusText} />
    </main>
  )
}

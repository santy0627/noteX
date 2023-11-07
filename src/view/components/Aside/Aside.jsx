import React from 'react'
import './Aside.css'

export default function Aside ({ mode }) {
  return (
    <aside className='aside-bar'>
      <img className='img user' src={`/src/assets/user-${mode ? 'black' : 'white'}.svg`} alt='plus' width='25px' />
      <img className='img lupa' src={`/src/assets/lupa-${mode ? 'black' : 'white'}.svg`} alt='lupa' width='25px' />
      <img className='img plus' src={`/src/assets/plus-${mode ? 'black' : 'white'}.svg`} alt='plus' width='25px' />
    </aside>
  )
}

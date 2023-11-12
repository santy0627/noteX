import React, { createContext, useContext, useState } from 'react'

const modeContext = createContext()
const modeToggleContext = createContext()

export function useModeContext () {
  return useContext(modeContext)
}

export function useModeToggleContext () {
  return useContext(modeToggleContext)
}

export default function modeProvider () {
  const [mode, setMode] = useState(false)

  const toggleMode = () => {
    setMode(!mode)
  }

  return (
    <modeContext.Provider value={mode}>
      <modeToggleContext.Provider value={toggleMode}>
        {children}
      </modeToggleContext.Provider>
    </modeContext.Provider>
  )
}

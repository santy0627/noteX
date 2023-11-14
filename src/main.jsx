import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './view/App.jsx'
import './index.css'
import { TaskState } from './view/context/Task/TaskState.jsx'

ReactDOM
  .createRoot(document.getElementById('root')).render(
    <TaskState>
      <App />
    </TaskState>
  )

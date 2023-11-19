import { useContext } from 'react'
import { ThemeContext } from '../../components/Header/Header'
import { AppContext } from '../../context/App/AppContext'

export default function EditNote () {
  const { theme } = useContext(ThemeContext)

  const { selectedTask, updateTask, deleteSelectedTask } = useContext(AppContext)

  const taskId = selectedTask._id

  return (
    <div className='modal' theme={theme}>
      <header className='modal__header'>
        <h1 className='modal__header-title'>Editar nota</h1>
      </header>
      <form className='form-modal' onSubmit={updateTask}>
        <input className='form-modal__name' type='text' name='name' defaultValue={selectedTask.name} />
        <textarea className='form-modal__description' type='text' name='description' defaultValue={selectedTask.description} />
        <input className='form-modal__date' type='date' name='finishDate' id='date' defaultValue={selectedTask.finishDate} />

        <div className='buttons'>
          <button className='boton cancel' onClick={() => deleteSelectedTask(taskId)}>Cancelar</button>
          <button className='boton submit' type='submit'>Editar nota</button>
        </div>
      </form>
    </div>
  )
}

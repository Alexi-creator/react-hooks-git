import React, {useState, useContext} from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { FirebaseContext } from '../context/firebase/firebaseContext';

export const Form = () => {

  const [value, setValue] = useState('')
  const alert = useContext(AlertContext) // подключаемся к приемке данных которые определили в AlertState в AlertContext.Provider value={{show, hide, alert: state}}
  const firebase = useContext(FirebaseContext) // подключаемся к приемке данных которые определили в FirebaseContext в FirebaseContext.Provider value={{show, hide, alert: state}}

  // ф-я которая срабатывает при отправке формы(нажаите enter на инпуте)
  const submitHandler = event => {
    event.preventDefault()

    if (value.trim()) {
      firebase.addNote(value.trim()).then(() => {
        alert.show('Заметка была создана', 'success')
      }).catch(() => {
        alert.show('Что то пошло не так', 'danger')
      })
      // если значение input не пустое то используем функцию которую взяли из контекста в AlertState в AlertContext.Provider value={{show, hide, alert: state}}
      // зануляем значение input
      setValue('')
    } else {
      // если input пустой то запускаем другую ф-ю
      alert.show(' Введите текст заметки')
    }

  }

  return (
    /* при сабмите(отправки формы) сработает ф-я submitHandler описанная выше */
    <form onSubmit={submitHandler}>  
      <div className="form-group">
        <input type="text" 
               className="form-control"
               value={value} /* значение input зависит от локального стейта hook которое определили в верху как '' */
               onChange={e => setValue(e.target.value)} /* при вводе символов в инпут изменяем значение локального стейта и значение input автоматически меняеться т.к. зависит от стейта */
               placeholder="Введите название заметки" />
      </div>
    </form>  
  )
}


import React, {useReducer} from 'react' 
import axios from 'axios' 
import {FirebaseContext} from './firebaseContext' 
import { firebaseReducer } from './firebaseReducer'
import { FETCH_NOTES, ADD_NOTE, REMOVE_NOTE, SHOW_LOADER, HIDE_LOADER } from '../types'

// URL к БД firebase
const url = 'https://react-hooks-19fb6-default-rtdb.europe-west1.firebasedatabase.app'

export const FirebaseState = ({children}) => {
  const initialState = {
    notes: [],
    loading: false,
    countnotes: 0
  }

  const [state, dispatch] = useReducer(firebaseReducer, initialState)

  // функция которая показываеться при загрузке(запрос на сервер, ожидание)
  const showLoader = () => dispatch({type: SHOW_LOADER})

  // запрос на сервак делаеться после монтирования в dom компоненты Home
  const fetchNotes = async () => {
    // пока идет загрузка с сервера включаем крутилку ожидания
    showLoader()
    // получение данных с сервака в виде ответа 
    const res = await axios.get(`${url}/notes.json`)

    // если ответ с сервера пустой(нет списка он пуст)
    // то убираем крутилку чтобы не вводит в заблуждение клиента
    // и выходим из ф-и fetchNotes иначе далее будем пытаться
    // итерироваться по пустому объекту и будет ошибка
    if (!res.data) {
      dispatch({type: HIDE_LOADER})
      return
    }

    // если ответ пришел с данными то:
    // в ответе объект а нам нужен массив поэтому делаем Object.keys
    // получаем массив и на его основе делаем новый массив
    // теперь в каждом элементе массива будет лежать объект:
    // с ключами и значениями: date, title, id которые можно вставлять
    // в компоненту Notes

    let countnotes = 0 // считаем колличество заметок

    const payload = Object.keys(res.data).map(key => {
      countnotes++ 
      return {
        ...res.data[key],
        id: key
      }
    })

    // данный массив с полученными и преобразованными данными
    // диспатчим чтобы перерисовать компоненту
    dispatch({
      type: FETCH_NOTES,
      payload,
      countnotes
    })

  }

  const addNote = async title => {

    // преобразовываем дату в нужный формат и вид
    // для отправки в БД и чтобы видеть красиво
    let date = new Date()
    date = String(date).split(' ').slice(1, 5).join(' ')
    
    const note = {
      // можно написать просто ключ title в который подставиться значение title
      // будет тоже самое что и title: title
      title, 
      date: date
    }

    try {
      const res = await axios.post(`${url}/notes.json`, note)
      const payload = {
        ...note,
        id: res.data.name
      }

      dispatch({
        type: ADD_NOTE,
        payload,
        countnotes: ++state.countnotes
      })

    } catch (e) {
      throw new Error(e.message)
    }
    
  }

  const removeNote = async id => {

    await axios.delete(`${url}/notes/${id}.json`)

    dispatch({
      type: REMOVE_NOTE,
      payload: id,
      countnotes: --state.countnotes
    })
  }


  return (
    <FirebaseContext.Provider value={{
      showLoader, addNote, removeNote, fetchNotes,
      loading: state.loading,
      notes: state.notes,
      countnotes: state.countnotes
    }}>
      {children}
    </FirebaseContext.Provider>
  )
}


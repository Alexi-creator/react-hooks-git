import React, {useReducer} from 'react' 
import { SHOW_ALERT, HIDE_ALERT } from '../types'
import {AlertContext} from './alertContext' 
import { alertReducer } from './alertReducer'

// создаем стейт с контекстом чтобы передавать данные детям
export const AlertState = ({children}) => {
  
  const [state, dispatch] = useReducer(alertReducer, {visible: false})

  const show = (text, type = 'warning') => {
    dispatch({
      type: SHOW_ALERT,
      payload: {text, type}
    })
  }

  const hide = () => dispatch({type: HIDE_ALERT})
  
  return (
    /* снабжаем дочерние компоненты данными(props) ввиде объекта
    в котором есть методы show, hide и св-во ключ alert со значением 
    state ({visible: false}) которое меняеться при отправке формы
    на { text: " Заметка создана", type: "success", visible: true } */
    <AlertContext.Provider value={{show, hide, alert: state}}>
      {children}
    </AlertContext.Provider>
  )
}
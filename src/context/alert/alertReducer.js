import {SHOW_ALERT, HIDE_ALERT} from '../types'

const handlers = {
  [SHOW_ALERT]: (state, {payload}) => ({...payload, visible: true}),
  [HIDE_ALERT]: (state) => ({...state, visible: false}),
  DEFAULT: state => state
}

// если что то ввели в инпут формы то при нажатии enter запускаеться 
// ф-я show которая диспатчит объект: { type: SHOW_ALERT, payload: {text, type} })
// данный объект будет под аргументом action
export const alertReducer = (state, action) => {
  // редюсер который ищет action.type и если его нет
  // то возвращет дефолтный стейт

  // в handle попадает ф-я [SHOW_ALERT] которая описана выше т.к. action.type == SHOW_ALERT
  // или [HIDE_ALERT] смотря какой action.type придет или DEFAULT если тип не придет
  const handle = handlers[action.type] || handlers.DEFAULT
  // вызываеться handle ф-я которая будет зависеть от выше описанного
  // рассмотрим пример с [SHOW_ALERT], передаем этой ф-и state {visible: false}
  // и action { type: SHOW_ALERT, payload: {text, type} }
  // но из action берем только св-во(ключ) payload и деструктуризируем его
  // в следствии чего получаем обновленный стейт со значениями переданными
  // при вызове ф-и show из формы ' Заметка создана', 'success' а так же 
  // visible: true, это все меняет наш локальный стейт в AlertState
  // а при изменении стейта будет перерисовка
  return handle(state, action) 
}
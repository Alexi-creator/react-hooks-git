import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER, HIDE_LOADER } from "../types"

const handlers = {
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [HIDE_LOADER]: state => ({...state, loading: false}),
  [ADD_NOTE]: (state, {payload, countnotes}) => ({
    ...state,
    notes: [...state.notes, payload],
    countnotes: countnotes
    }),
  [FETCH_NOTES]: (state, {payload, countnotes}) => ({...state, notes: payload, loading: false, countnotes: countnotes}),
  [REMOVE_NOTE]: (state, {payload, countnotes}) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== payload),
    countnotes: countnotes
  }),
  DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
  
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
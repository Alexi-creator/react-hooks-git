import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

export const Notes = ({notes, onRemove, show}) => {

  // ф-я которая содержит 2 функции на выполнении для onClick button
  const handleClick = (id) => {
    onRemove(id);
    show('Заметка удалена');
  }

  return (
    /* TransitionGroup это для анимации
    component="ul" означает что вместо TransitionGroup
    подставиться ul чтобы семантика сохранилась для списка
    */
    <TransitionGroup component="ul" className="list-group">
      {notes.map(note => ( /* чтобы не писать return можно все обернуть в круглые скобки */
        /* CSSTransition оборачиваем для аниации элемента li */
        <CSSTransition key={note.id} classNames={'note'} timeout={1000}> 
          <li className="list-group-item note">
            <div>
              <strong>{note.title}</strong> 
              <small>{note.date}</small>
            </div>

            <button type="button" 
                    className="btn btn-outline-danger btn-sm"
                    // onClick={() => onRemove(note.id)}
                    onClick={() => handleClick(note.id)}
            >
              &times;
            </button> 
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  )
}
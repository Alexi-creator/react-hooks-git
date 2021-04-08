import React, {useContext} from 'react';
import {CSSTransition} from 'react-transition-group'; // для анимации css из скаченного пакета
import { AlertContext } from '../context/alert/alertContext';

export const Alert = () => {

  const {alert, hide} = useContext(AlertContext)

  return (
    /* оборачиваем все то что нужно анимировать */
    <CSSTransition
      in={alert.visible} /* за каким состоянием следить */
      timeout={{
        enter: 1500,
        exit: 350
      }} /* время анимации */
      classNames={'alert'} /* с помощью данного класса будет отслеживаться анимация, на этот класс в scss пишем стили! */
      mountOnEnter
      unmountOnExit
    > 
      <div className={`alert alert-${alert.type || 'warning'} alert-dismissible fade show`}>
        <strong>Обратите внимание! </strong>
        {alert.text}
        <button onClick={hide} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </CSSTransition>
  )
}






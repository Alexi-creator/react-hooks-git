import React from 'react';

export const Countnotes = ({countnotes}) => {

  return (
    <div className="countnotes">
      <div>Итого заметок:</div>
      <div>{countnotes}</div>
    </div>
  )
}


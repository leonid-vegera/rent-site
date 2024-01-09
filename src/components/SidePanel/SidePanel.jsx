import React from 'react';
import './SidePanel.scss';
import { ElementInfo } from '../ElementInfo/ElementInfo';

export const SidePanel = React.memo(({ elements }) => {
  const emptyMessage = (
    <div className='side-panel__message'>
      Не вибрано жодного оголошення
    </div>
  )
  return (
    <aside className='side-panel'>
      {elements.length === 0 ? (
        emptyMessage
      ) : (
        elements.map(element => (
          <ElementInfo element={element} key={element.id}/>
        ))
      )}
    </aside>
  );
})

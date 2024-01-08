import React from 'react';
import './SidePanel.scss';
import { ElementInfo } from '../ElementInfo/ElementInfo';

export const SidePanel = React.memo(({ elements }) => {
  return (
    <aside className='side-panel'>
      {elements.map(element => (
        <ElementInfo element={element} key={element.id}/>
      ))}
    </aside>
  );
})

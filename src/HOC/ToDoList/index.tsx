import React, { FC } from 'react';
import { HOCProps } from '@src/customTypes/HOCProps';

import '../../styles/components/_ToDoList.scss';

export const ToDoList: FC<HOCProps> = ({ children }: HOCProps) => {
  return (
    <section className='todo-list'>
      { children }
    </section>
  )
}


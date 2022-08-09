import React, { FC } from 'react';
import { HOCProps } from '@src/customTypes/HOCProps';

export const ToDoList: FC<HOCProps> = ({ children }: HOCProps) => {
  return (
    <React.Fragment>
      <h1>ToDoList</h1>
    </React.Fragment>
  )
}


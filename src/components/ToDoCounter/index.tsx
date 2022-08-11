import React, { FC } from 'react';
import { HOCProps } from '@src/customTypes/HOCProps';

export const ToDoCounter: FC<HOCProps> = ({children}:HOCProps) => {
  return (
    <React.Fragment>
      { children }
    </React.Fragment>
  )
}




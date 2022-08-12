import { FC } from 'react'
import { HOCProps } from '@src/customTypes/HOCProps';

import '../../styles/components/_ToDoCard.scss';

export const ToDoCard: FC<HOCProps> = ({ children }: HOCProps) => {
  return (
    <section className='todo-card'>
      { children }
    </section>
  )
}


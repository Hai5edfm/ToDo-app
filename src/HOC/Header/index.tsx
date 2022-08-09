import { FC } from 'react';
import { HOCProps } from '@src/customTypes/HOCProps';


export const Header: FC<HOCProps> = ({ children }: HOCProps) => {
  return (
    <header>
      {children}
    </header>
  )
}



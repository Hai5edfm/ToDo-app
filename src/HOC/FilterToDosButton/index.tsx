import { FC } from 'react';
import '../../styles/HOC/_FilterButton.scss';

type FilterToDosButtonProps = {
    filtering: boolean,
    setFiltering: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode,
}

export const FilterToDosButton: FC<FilterToDosButtonProps> = ({
    filtering,
    setFiltering,
    children
}: FilterToDosButtonProps) => {
    return (
        <button
            className='filter-button'
            onClick={() => setFiltering(!filtering)}
        >
            {children}
        </button>
    );
}



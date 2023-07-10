import React from 'react'
import Button from './components/Button';
import MoviesTable from './components/MoviesTable';
import DropRightButton from './components/DropRightButton/index';
import Revert from '../assets/icons/revert.svg'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../GlobalRedux/store';
import { addTopRevenues, addTopRevenuesByYear } from '../GlobalRedux/Features/movies/moviesSlice';

const Movies:React.FC = () => {

    const { topRevenueByYear } = useSelector((state: RootState) => state.movies)
    const dispatch = useDispatch()

    const resetAllRevenue = () => {

        dispatch(addTopRevenuesByYear([]))
        dispatch(addTopRevenues([]))

    }

    return (

        <div className="container mx-auto mt-[24px]">
            
            <h1 className="text-[#386071] text-[24px]">Movie ranking</h1>

            <div className="flex items-center mt-[32px] mb-[46px]">
                <Button APIAction={'revenue.desc'} title={`Top 10 Revenue`} />
                <DropRightButton APIAction={'revenue.desc'} title={`Top 10 Revenue per Year`} />
                {
                    topRevenueByYear.length > 0 &&
                        <Image className="ml-[8px] cursor-pointer" onClick={() => resetAllRevenue()} src={Revert} alt='revert_icon' />
                }
            </div>

            <MoviesTable />
        
        </div>

    )

}

export default Movies;
import { setIsLoading } from '../../../GlobalRedux/Features/loader/loaderSlice'
import { addTopRevenues, addTopRevenuesByYear } from '../../../GlobalRedux/Features/movies/moviesSlice'
import { RootState } from '../../../GlobalRedux/store'
import { MoviesRequestTypes } from '../../../../app/page'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface ButtonTypes {
    title: string,
    APIAction: string
}

const DropRightButton:React.FC<ButtonTypes> = ({ title, APIAction }) => {

    const [ showOptions, setShowOptions ] = useState<boolean>(false)
    const [ isSelected, setIsSelected ] = useState<boolean>(false)
    const [ loading, setLoading ] = useState<boolean>(false)
    const [ selectedYear, setSelectedYear ] = useState<number | null>()
    const { topRevenueByYear, topRevenue } = useSelector((state: RootState) => state.movies)

    const years:Array<number> = []
    for(let i = 0; i < 100; i++) {
        years.push(new Date().getFullYear() - i)
    }

    useEffect(() => {
        if(topRevenue.length > 0 || topRevenueByYear.length === 0) {
            setSelectedYear(null)
        }
    }, [topRevenue, topRevenueByYear])

    const dispatch = useDispatch()

    const getMoviesByYear = async (year: number) => {
        
        setSelectedYear(year)
        dispatch(setIsLoading(true));
        setIsSelected(true)

        setLoading(true)
        const response = await axios.get<MoviesRequestTypes>(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
            year: year,
            sort_by: APIAction,
            api_key: '091369920cc7ed28c1a1186bb514c13b'
        }
        });

        if (response.status === 200) {
            dispatch(setIsLoading(false));
            dispatch(addTopRevenuesByYear(response.data.results.slice(0, 10)));
            dispatch(addTopRevenues([]));
            setShowOptions(false)
            setLoading(false)
        } else {
            dispatch(setIsLoading(false));
            alert('API error');
            setSelectedYear(null)
            setLoading(false)
        }

    };

    return (

        <div className="relative ml-[16px]">
            <button 
                style={{backgroundColor: showOptions || topRevenueByYear.length > 0 ? '#00BAFF' : '', color: showOptions || topRevenueByYear.length > 0 ? '#012433' : ''}} 
                onClick={() => setShowOptions(!showOptions)} 
                className="border-[1px] rounded-[20px] border-[#78849E66] py-[8px] px-[12PX] text-[#78849E66] text-[12px]"
            >{loading ? 'Loading...' : title} {selectedYear ? selectedYear : ''}</button>
            {
                showOptions &&
                    <div className="absolute w-[178px] h-[478px] bg-[#FFFFFF] shadow-[0_35px_60px_-15px_#01243366] top-0 left-[175px] overflow-auto flex flex-col items-center p-[16px]">
                        <h3 className="text-[#78849EB9] text-[12px] mb-[18px]">Select a year</h3>
                        {
                            years.map((year: number) => {
                                return (
                                    <div key={year} className="text-[#536B7A] text-[14px] mb-[8px] cursor-pointer" onClick={() => getMoviesByYear(year)}>{year}</div>
                                )
                            })
                        }
                    </div>
            }
        </div>

    )

}

export default DropRightButton;
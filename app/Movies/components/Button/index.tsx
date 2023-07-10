import React, { useState } from 'react'
import axios from 'axios';
import { addTopRevenues, addTopRevenuesByYear } from '../../../GlobalRedux/Features/movies/moviesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MoviesRequestTypes } from '../../../page';
import { setIsLoading } from '../../../GlobalRedux/Features/loader/loaderSlice';
import { RootState } from '../../../GlobalRedux/store';

interface ButtonTypes {
    title: string,
    APIAction: string
}

const Button:React.FC<ButtonTypes> = ({ title, APIAction }) => {

    const [ loading, setLoading ] = useState<boolean>(false)
    const { topRevenue } = useSelector((state: RootState) => state.movies)
    const [ isSelected, setIsSelected ] = useState<boolean>(false)

    const dispatch = useDispatch()

    const getMoviesUserAction = async () => {
        
        dispatch(setIsLoading(true));
        setIsSelected(true)

        if(topRevenue.length === 0) {  
            setLoading(true)
            const response = await axios.get<MoviesRequestTypes>(`https://api.themoviedb.org/3/discover/movie`, {
            params: {
                sort_by: APIAction,
                api_key: '091369920cc7ed28c1a1186bb514c13b'
            }
            });
    
            if (response.status === 200) {
                dispatch(setIsLoading(false));
                dispatch(addTopRevenues(response.data.results.slice(0, 10)));
                dispatch(addTopRevenuesByYear([]));
                setLoading(false)
            } else {
                dispatch(setIsLoading(false));
                alert('API error');
                setLoading(false)
            }
        } else {
            dispatch(setIsLoading(false));
            dispatch(addTopRevenues([]));            
        }

    };

    return (

        <button 
            style={{backgroundColor: isSelected && topRevenue.length > 0 ? '#00BAFF' : '', color: isSelected && topRevenue.length > 0 ? '#012433' : ''}} 
            onClick={() => getMoviesUserAction()} 
            className="border-[1px] rounded-[20px] border-[#78849E66] py-[8px] px-[12PX] text-[#78849E66] text-[12px] last:ml-[16px]"
        >{loading ? 'loading...' : title}</button>

    )

}

export default Button
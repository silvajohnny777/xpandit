import { MovieTypes } from '../../../page'
import React from 'react'
import Eye from '../../../assets/icons/eye.svg'
import Image from 'next/image'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addMovieDetail } from '../../../GlobalRedux/Features/movies/moviesSlice'

export interface MoviesItemTypes {
  position: number
  movie: MovieTypes
}

const MoviesItem:React.FC<MoviesItemTypes> = ({ position, movie }) => {

    const { id, title, release_date, vote_average } = movie
    const dispatch = useDispatch()

    const getMovieDetail = async (id: number) => {
        /*  */

      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
            api_key: '091369920cc7ed28c1a1186bb514c13b'
        }
        });
  
      if (response.status === 200) {
        dispatch(addMovieDetail(response.data));
      } else {
        alert('get Specific movie error');
      }
    }

    return (

      <tr className="text-[#536B7A] text-[16px] hover:bg-[#fafafa]">
          <td className="py-[16px] px-[10px]">{position}</td>
          <td className="truncate max-w-[400px]">{title}</td>
          <td>{release_date?.substring(0, release_date?.indexOf("-"))}</td>
          <td>{vote_average}</td>
          <td><Image onClick={() => getMovieDetail(id)} className="cursor-pointer" src={Eye} alt='eye-icon' /></td>
      </tr>

    )

}

export default MoviesItem
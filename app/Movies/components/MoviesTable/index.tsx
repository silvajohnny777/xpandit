import { RootState } from '../../../GlobalRedux/store'
import { MovieTypes } from '../../../page'
import React from 'react'
import { useSelector } from 'react-redux'
import MoviesItem from '../MoviesItem/index'

const MoviesTable:React.FC = () => {

    const { movies, topRevenue, topRevenueByYear } = useSelector((state: RootState) => state.movies)
    const { isLoading } = useSelector((state: RootState) => state.loader)

    const displayList = topRevenue.length > 0 || topRevenueByYear.length > 0 ? topRevenue.length > 0 ? topRevenue : topRevenueByYear : movies

    return (

        displayList.length > 0 ?

            <table className="w-full">
                <thead className="bb-[1px] border-[red]">
                    <tr className="text-left text-[#0B749B] uppercase text-[10px] font-bold border-b-[1px] border-[#0B749B] pb-[4px]">
                        <th>Ranking</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Rating</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        displayList?.map((movie: MovieTypes, index: number) => {
                            const { id } = movie
                            return (
                                <MoviesItem key={id+index} movie={movie} position={index+1} />
                            )
                        }) 
                    }
                    {
                        isLoading &&
                        <tr className="text-[#536B7A] text-[16px] hover:bg-[#fafafa]">
                            <td className="py-[16px] px-[10px]"></td>
                            <td>LOADING...</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    }
                </tbody>
            </table>

        :

            <h2>No movies were found!</h2>

    )

}

export default MoviesTable
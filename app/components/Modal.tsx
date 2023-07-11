import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../GlobalRedux/store';
import { GenreTypes } from '../page';
import { addMovieDetail } from '../GlobalRedux/Features/movies/moviesSlice';
import Close from '../assets/icons/close.svg'
import Line from '../assets/icons/line.svg'
import Image from 'next/image';
import { useOutsideClick } from '../hooks/handleClickOutide';

const Modal:React.FC = () => {

    const { movieDetails } = useSelector((state: RootState) => state.movies)
    const dispatch = useDispatch()

    const modalContent = useOutsideClick(() => {
        dispatch(addMovieDetail(null))
    });

    useEffect(() => {
        const handleEscapeKey = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            dispatch(addMovieDetail(null));
          }
        };
      
        window.addEventListener('keydown', handleEscapeKey);
      
        return () => {
          window.removeEventListener('keydown', handleEscapeKey);
        };
      }, []);

    return (

        <div className="h-full w-full bg-[#cccccc] fixed top-0 bg-opacity-70 flex justify-center items-center">

            <div ref={modalContent} className="lg:w-[748px] w-full h-[682px] bg-[white] absolute opacity-100 px-[58px] py-[30px] overflow-auto shadow-[0_20px_40px_rgba(1,36,51,0.4)]">

                    <div className="flex justify-between items-center">
                        <div><h2 className="text-[#164E78] text-[32px]">{movieDetails?.title}</h2></div>
                        <div className="cursor-pointer flex flex-col items-center" onClick={() => dispatch(addMovieDetail(null))}>
                            <Image src={Close} alt='closing_icon' />
                            <div className="text-[#718FA2] text-[8px] uppercase">close</div>
                        </div>
                    </div>  

                    <Image className="mt-[16px]" src={Line} alt='divider' />              

                    <div className="text-[#78849EB9] text-[14px] pb-[16px] pt-[16px]">
                        <h3>Year</h3>
                        <p className="text-[#78849E] text-[16px] mt-[4px]">{movieDetails?.release_date?.substring(0, movieDetails?.release_date?.indexOf("-"))}</p>
                    </div>

                    <div className="text-[#78849EB9] text-[14px] pb-[16px]">
                        <h3>Genre</h3>
                        <p className="text-[#78849E] text-[16px] mt-[4px]">{movieDetails?.genres.map((genre: GenreTypes) => { return ( genre.name ) }).join(', ')}</p>
                    </div>

                    <div className="text-[#78849EB9] text-[14px] pb-[16px]">
                        <h3>Description</h3>
                        <p className="text-[#78849E] text-[16px] mt-[4px]">{movieDetails?.overview}</p>
                    </div>

                    <div className="text-[#78849EB9] text-[14px] pb-[16px]">
                        <h3>Director</h3>
                        <p className="text-[#00BAFF] text-[16px] mt-[4px]">John Doe</p>
                    </div>

                    <div className="text-[#78849EB9] text-[14px] pb-[16px]">
                        <h3>Runtime</h3>
                        <p className="text-[#78849E] text-[16px] mt-[4px]">{movieDetails?.runtime} mins</p>
                    </div>

                    <div className="text-[#78849EB9] text-[14px] pb-[16px]">
                        <h3>Rating</h3>
                        <p className="text-[#78849E] text-[16px] mt-[4px]">{movieDetails?.vote_average.toFixed(1)}</p>
                    </div>

                    <div className="text-[#78849EB9] text-[14px] pb-[16px]">
                        <h3>Votes</h3>
                        <p className="text-[#78849E] text-[16px] mt-[4px]">{movieDetails?.vote_count}</p>
                    </div>

                    <div className="text-[#78849EB9] text-[14px] pb-[16px]">
                        <h3>Revenue</h3>
                        <p className="text-[#78849E] text-[16px] mt-[4px]">{movieDetails?.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0,  })}</p>
                    </div>

                    <div className="text-[#78849EB9] text-[14px] pb-[16px]">
                        <h3>Metascore</h3>
                        <p className="text-[#78849E] text-[16px] mt-[4px]">{movieDetails?.vote_average.toFixed(1)}</p>
                    </div>

            </div>
            
        </div>
        
    )

}

export default Modal;
'use client';

import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar';

import { useDispatch, useSelector } from 'react-redux'
import { addMoviesList } from './GlobalRedux/Features/movies/moviesSlice'
import { setIsLoading } from './GlobalRedux/Features/loader/loaderSlice'
import axios from 'axios'
import Movies from './Movies';
import { RootState } from './GlobalRedux/store';
import Modal from './components/Modal';
import { Roboto } from '@next/font/google'

export interface MovieTypes {
  id: number
  adult: boolean
  genre_ids: Array<Number>
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  title: string
  vote_average: number
  vote_count: number
}

export interface GenreTypes {
  id: number
  name: string
}

export interface MoviesRequestTypes {
  results: Array<MovieTypes>;
  status: number;
  page: number,
}

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700']
})

const Home:React.FC = () => {

  const dispatch = useDispatch()
  const { movies, topRevenue, movieDetails } = useSelector((state: RootState) => state.movies)
  const [ gettingMovies, setGettingMovies ] = useState<boolean>(false)
  const [ APIPage, setAPIPage ] = useState<number>(1)
  const [ APIError, setAPIError ] = useState<boolean>(false)

  const getMovies = async () => {

    dispatch(setIsLoading(true));

    const moviesResponse = await axios.get<MoviesRequestTypes>(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        page: APIPage,
        /*sort_by: 'revenue.desc',*/
        api_key: '091369920cc7ed28c1a1186bb514c13b'
      }
    });

    if (moviesResponse.status === 200) {
      dispatch(addMoviesList([...movies, ...moviesResponse.data.results]));
      dispatch(setIsLoading(false));
      APIError && setAPIError(false);
    } else {
      alert('API error');
      dispatch(setIsLoading(false));
      setAPIError(true);
    }

  };

  useEffect(() => {
    setAPIPage(APIPage + 1)
  
    movies.length === 0 && getMovies();
  
    const scrollHandler = () => {
      if (window.scrollY + window.innerHeight === document.documentElement.scrollHeight && topRevenue.length === 0) {
        getMovies();
      }
    };
  
    window.addEventListener('scroll', scrollHandler);
  
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [dispatch, movies, topRevenue]);

  return (
      <main className={roboto.className}>
        <Navbar />
        <Movies />
        {
          movieDetails &&
            <Modal />
        }
      </main>
  )
}

export default Home

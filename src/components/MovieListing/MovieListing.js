import React from 'react';
import {useSelector} from "react-redux";
import { getAllMovies,getSearchMovies } from '../../features/movies/movieSlice';
import MovieCard from "../MovieCard/MovieCard";
import Slider from 'react-slick';
import "./MovieListing.scss";

const settings={
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
        {
          breakpoint: 1300,
          settings: { slidesToShow: 4, slidesToScroll: 2, infinite: false }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 3, slidesToScroll: 2, infinite: false }
        },
        {
          breakpoint: 500,
          settings: { slidesToShow: 2, slidesToScroll: 1, infinite: false }
        },
        {
            breakpoint: 390,
            settings: { slidesToShow: 1, slidesToScroll: 1, infinite: false }
        }
      ]
}
const MovieListing = () => {
    const movies = useSelector(getAllMovies);
    
    console.log(movies);
    let renderMovies="";
    
    renderMovies = (movies && movies.results )?
        (movies.results.map((movie,index)=>{
            return(
                <MovieCard key={index} data={movie}/>
            )
            
        }))
        :
        (<div className="movie-error"><h3>Error fetch</h3></div>)

    return (
        <div className='movie-wrapper'>
            <div className='movie-list'>
                <h2>Popular Movies</h2>
                <div className='movies-container'>
                    {/* <Slider {...settings}>
                        {renderMovies}
                    </Slider> */}
                    
                    {renderMovies}
                </div>
                
            </div>
        </div>
    );
};

export default MovieListing;
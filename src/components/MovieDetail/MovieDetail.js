import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncMoviesByID, removeSelectedMovie,getSelectedMovie,getRecommendations,fetchAsyncRecommendationMovies } from '../../features/movies/movieSlice';
import {URL_IMAGE,W500} from '../../common/apis/MovieURL'
import "./MovieDetail.scss";
import MovieCard from '../MovieCard/MovieCard';
import Slider from 'react-slick/lib/slider';
import RecMovies from '../RecomMovies/RecMovies';

const settings={
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
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

const MovieDetail = () => {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    const data = useSelector(getSelectedMovie);
    console.log(data);
    const recommendations = useSelector(getRecommendations);
    console.log(recommendations);
    useEffect(() => {
        dispatch(fetchAsyncMoviesByID(imdbID));
        dispatch(fetchAsyncRecommendationMovies(imdbID));
        dispatch(removeSelectedMovie());
        
    }, [dispatch, imdbID]);

    return (
        <>
        <div className='movie-container'>
            {Object.keys(data).length === 0 ? (<div>Loading...</div>)
                :
                <>
                    <div className='poster-movie'>
                        <img src={`${URL_IMAGE}${W500}/${data.poster_path}`} alt={data.title} />
                    </div>


                    <div className='movie-info'>
                        <h2 className='movie-title'>
                            {data.title}
                        </h2>
                        <div className='movie-rating'>
                            <p className='rating-star'>
                                IMDB Rating: {data.vote_average}
                                <i className="fa-solid fa-star"></i>
                            </p>
                            <p>
                                IMDB Votes: {data.vote_count}
                            </p>
                            <p>
                                Time: {data.runtime}
                            </p>
                        </div>
                        <p className='plot-movie'>
                            {data.overview}
                        </p>
                        <div className='genres-list'>
                            {data.genres.map((genre)=>{
                                return(
                                    <span>
                                        {genre.name}
                                    </span>
                                )
                            })}
                            
                        </div>
                        <div className='watch-movie'>
                            <button className='btn-watch'>
                                Watch Movie
                            </button>
                        </div>
                    </div>
                </>

            }


        </div>

        <div className='similar'>
            <h3>More like this</h3>
            <div className='list-movies-similar'>
                <Slider {...settings}>
                    {recommendations ?( recommendations.results.map((rec,index)=>{
                        return(
                            <RecMovies key={index} data={rec}/>
                        )
                    })) : (
                        <p>There is no Recommendation Movies</p>
                    )}
                </Slider>
                
            </div>
        </div>
        </>
    );
};

export default MovieDetail;
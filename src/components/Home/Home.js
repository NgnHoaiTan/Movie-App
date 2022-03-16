import React, { useEffect, useState } from 'react';
import MovieListing from "../MovieListing/MovieListing.js"
import {useDispatch} from "react-redux";
import {fetchAsyncPopularMovies,fetchAsyncMoviesBySearch } from '../../features/movies/movieSlice';
import banner1 from "../../images/bg2.jpg";
import banner2 from "../../images/bg1.jpg";
import banner3 from "../../images/bg3.jpg";
// import Slider from 'react-slick';
import "./Home.scss";
// const settings={
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
// }
const Home = () => {
    const banners =[
        banner1, banner2, banner3
    ];
    const [searchTerm, setSearchTerm] = useState('');
    let fetchAll = false;
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(fetchAsyncPopularMovies());
    },[dispatch,searchTerm]);
    if(searchTerm===""){
        dispatch(fetchAsyncPopularMovies());
    }
    const SearchMovieHandle =(e)=>{
        e.preventDefault();
        if(searchTerm!==""){
            dispatch(fetchAsyncMoviesBySearch(searchTerm));
        }

        
    }
    return (
        <>
            
            {/* <div className='banner-img'>
                <Slider {...settings}>
                {banners.map((banner)=>{
                    return(
                        <img src={banner} />
                    )
                })}
                </Slider>
                
            </div> */}
            <div className='search-bar'>
                <form className='search-bar-form' onSubmit={SearchMovieHandle}>
                    <input type="text" placeholder='search for movies or shows' onChange={(e)=>setSearchTerm(e.target.value)}/>
                    <button type="submit">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    
                </form>
            </div>
            <MovieListing/>
        </>
    );
};

export default Home;
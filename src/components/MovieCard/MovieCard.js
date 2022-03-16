import React from 'react';
import {Link} from 'react-router-dom';
import {URL_IMAGE,W500} from '../../common/apis/MovieURL'
import "./MovieCard.scss";
const MovieCard = (props) => {
    const {data} = props;
    console.log(data);
    return (
        <Link to={`/movie/${data.id}`}>
        <div className='card-item'>
            <div className='card-inner'>
                <div className='card-top'>
                    <img src={`${URL_IMAGE}${W500}/${data.poster_path}`} alt={data.Title}/>
                </div>
                <div className='card-bottom'>
                    <div className='card-title'>
                        <h4>{data.title}</h4>
                       
                    </div>
                    
                </div>
            </div>
        </div>
        </Link>
    );
};

export default MovieCard;
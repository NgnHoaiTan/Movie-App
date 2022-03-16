import React from 'react';
import {Link} from 'react-router-dom';
import {URL_IMAGE,W500} from '../../common/apis/MovieURL'
import "./RecMovies.scss"
const RecMovies = (props) => {
    const {data} = props;
    return (
        <Link to={`/movie/${data.id}`}>
        <div className='card-rec-movie'>
            <div className='inner-rec-card'>
                <div className='rec-card-top'>
                    <img src={`${URL_IMAGE}${W500}/${data.poster_path}`} alt={data.Title}/>
                </div>
                <div className='rec-card-bottom'>
                    <div className='rec-card-title'>
                        <h6>{data.title}</h6>
                       
                    </div>
                    
                </div>
            </div>
        </div>
        </Link>
    );
};

export default RecMovies;
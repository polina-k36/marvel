import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss';
import setContent from '../../utils/setContent';



const SingleComicPage = () => {

    const {comicId} = useParams();
    const [data, setData] = useState(null);
    const {getComicById, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic();
        //eslint-disable-next-line
    }, [comicId]);

    const onComicLoaded = (comic) => {
        setData(comic);
    }

    const updateComic = () => {
        clearError();
        if (!comicId){
            return;
        }
        getComicById(comicId)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'));
    }
    
    return (
        <div className="single-comic">
            {setContent(process, View, data)}
        </div>
    )
}


const View = ({data}) => {
    const {title, description, thumbnail, languages, price, pageCount} = data;
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{`${pageCount} pages`}</p>
                <p className="single-comic__descr">{`Language: ${languages}`}</p>
                <div className="single-comic__price">{`${price}$`}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;
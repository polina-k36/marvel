import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting': 
        case 'loading': 
            return newItemLoading ? <Component/> : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner/></div>;
        case 'error': 
            return <ErrorMessage/>;
        case 'confirmed': 
            return <Component/>;
        default: 
            throw new Error('Incorrect type');
    }
}


const ComicsList = () => {

    const {getAllComics, clearError, process, setProcess} = useMarvelService();

    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [comicEnded, setComicEnded] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(true);

    useEffect(() => {
        onRequest(offset, true);
    }, []);
    
    const onRequest = (offset, initial) => {
        clearError();
        setNewItemLoading(!initial); 
        getAllComics(offset)
            .then(onLoadedList)
            .then(() => setProcess('confirmed'));
    }

    const onLoadedList = (newComicList) => {
        let ended = false;
        if (newComicList.length < 4) {ended = true;}
        setComicsList(comicsList => [...comicsList, ...newComicList]);
        setOffset(offset => offset + 4);
        setNewItemLoading(false);
        setComicEnded(ended);
    }

    const renderItems = (arr) => {
        const items = arr.map((comic) => (
            <li className="comics__item"
                key={comic.id}>
                <Link to={`/comics/${comic.id}`}>
                    <img src={comic.thumbnail} alt={comic.title} className="comics__item-img"/>
                    <div className="comics__item-name">{comic.title}</div>
                    <div className="comics__item-price">{`${comic.price}$`}</div>
                </Link>
            </li>
        ))
        return (
             <ul className="comics__grid">
                {items}
            </ul>
        )

    }

    const elements = useMemo(() =>{
        return setContent(process, () => renderItems(comicsList), newItemLoading);
        //eslint-disable-next-line
    }, [process])
    
    return (
        <div className="comics__list">
            {elements}
            <button className="button button__main button__long"
                    style={{'display': comicEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
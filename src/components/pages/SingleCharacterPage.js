import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';

const SingleCharacterPage = () => {

    const {characterId} = useParams();
    const [data, setData] = useState(null);
    const {getCharacterById, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        //eslint-disable-next-line
    }, [characterId]);

    const onCharLoaded = (data) => {
        console.log(data);
        setData(data);
    }

    const updateChar = () => {
        clearError();
        if (!characterId){
            return;
        }
        getCharacterById(characterId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }
    

    return (
        <div className="single-comic">
            {setContent(process, View, data)}
        </div>
    )
}


const View = ({data}) => {
    const {name, description, thumbnail} = data;
    return (
        <>
            <img src={thumbnail} alt={name} className="single-comic__img single-comic__img-char"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name single-comic__name-char">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </>
    )
}

export default SingleCharacterPage;
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';


import './singleComicPage.scss';

const IntroPage = ({Component, type}) => {

    const {dataId} = useParams();
    const [data, setData] = useState(null);
    const {loading, error, getComicById, getCharacterById, clearError} = useMarvelService();
    
    useEffect(() => {
        updateData();
        //eslint-disable-next-line
    }, [dataId]);

    const onDataLoaded = (data) => {
        setData(data);
    }

    const updateData = () => {
        clearError();
        if (!dataId){
            return;
        }
        switch (type) {
            case 'char':
                getCharacterById(dataId)
                    .then(onDataLoaded);
                    break;
            case 'comic':
                getComicById(dataId)
                    .then(onDataLoaded);
                break;
            default:
                throw new Error('Incorrect type of component');
        }
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '65vw', height: '50vh'}}><Spinner/></div> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;
    return (
        
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}
export default IntroPage;
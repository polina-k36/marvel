
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';

import './singleComicPage.scss';

const IntroPage = ({Component, type}) => {

    const {dataId} = useParams();
    const [data, setData] = useState(null);
    const {getComicById, getCharacterById, clearError, process, setProcess} = useMarvelService();
    
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
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                    break;
            case 'comic':
                getComicById(dataId)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            default:
                throw new Error('Incorrect type of component');
        }
    }


    return (
        <div className="single-comic">

            {setContent(process, Component, data)}
        </div>
    )
}
export default IntroPage;
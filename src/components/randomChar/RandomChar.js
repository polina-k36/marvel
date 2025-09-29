import './randomChar.scss';
import { useEffect, useState } from 'react';
import mjolnir from '../../resources/img/mjolnir.png';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';


const RandomChar = () => {
    const [data, setData] = useState({});

    const {getCharacterById, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
        //eslint-disable-next-line
    }, []);

    
    const onCharLoaded = (data) => {
        setData(data);
    }

    const updateChar = () => {
        clearError();
        let id = Math.floor(Math.random() * 19 + 1);
        getCharacterById(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }
    
    return(
        <div className="randomchar">
            {setContent(process, View, data)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main"
                        onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
  
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name ? name : "Sorry"}</p>
                <p className="randomchar__descr">
                    { 
                        description 
                        ? description.length <= 95 
                        ? description 
                        : description.slice(0, 95) + '...' 
                        : "Sorry" 
                        }
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default RandomChar;
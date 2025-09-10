import './charInfo.scss';
import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton'

const CharInfo = ({charId = 1}) => {

    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [charId]);

  /*   componentDidCatch(error, info) {
        // возникновение ошибки в компоненте
        console.log(error, info);
        setState({error: true})
    }
 */
    
    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onCharLoading = () => {
        setLoading(true);
        setError(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = () => {
        if (!charId){
            return;
        }
        onCharLoading();
        marvelService.getCharacterById(charId)
        .then(onCharLoaded)
        .catch(onError);
    }

    const skeleton =  !(char || loading || error) ? <Skeleton/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner/></div> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
                </div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : "There is no comics with this characters" }
                    {
                        comics.map((item, i) => {
                            return(
                                <li key={i} className="char__comics-item">
                                    {item}
                                </li>
                            )
                        })
                    }
            </ul>
        </>
    )
}
//проверка типов приходящих данных в класс в пропсах 
CharInfo.propTypes = {
    charId: PropTypes.number
}
///можно установить пропс по умолчанию
/* CharInfo.defaultProps = { - скоро перестанет поддерживаться для функциональных компонентов
  charId: 1
}; */
export default CharInfo;
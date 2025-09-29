import './charInfo.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';
import setContent from '../../utils/setContent';

const CharInfo = ({charId = 1}) => {

    const [char, setChar] = useState(null);

    const {getCharacterById, clearError, process, setProcess} = useMarvelService();

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
    }

    const updateChar = () => {
        clearError();
        if (!charId){
            return;
        }
        getCharacterById(charId)
            .then(onCharLoaded)
            .then(() => {setProcess('confirmed')});
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
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
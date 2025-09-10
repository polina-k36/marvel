import React, {useState, useRef, useEffect} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import PropTypes from 'prop-types';

const CharList = ({onCharSelected}) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);
    
    let listRefsCards = useRef([]); // хук можно помещать только на верхний уровень. нельзя использовать его в циклах или функциях

    const marvelService = new MarvelService();

    const selectCharForEnter = (e) => {
        if (e.key === 'Enter') {
            listRefsCards.current.forEach(elem => {
                if (elem === document.activeElement){
                    elem.click();
                }
            })
        }
    }
    useEffect(() => {
        onRequest();
        document.addEventListener('keypress', selectCharForEnter);
        return () => document.removeEventListener('keypress', selectCharForEnter);
    }, []);


    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onCharListLoading = () => {
        setLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => ([...charList, ...newCharList]));
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const setFocusCharacter = (target) => {
        listRefsCards.current.forEach(elem => {
            if (elem === target){
                elem.focus();
            } 
        });
    }
    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    const renderItems = (arr) => {
        const items =  arr.map((item, i) => {
            return (
                <li ref={el => listRefsCards.current[i] = el}
                    className="char__item"
                    key={item.id}
                    tabIndex={item.id}
                    onClick={(e) => {onCharSelected(item.id); setFocusCharacter(e.currentTarget)}}>
                        {/* РАССМОТРЕТЬ ВСТАВКУ ФУНКЦИОНАЛА onKeyPress ВМЕСТО addEventL и функции выше */}
                        <img src={item.thumbnail} alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    

    const items = renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )

/* создать кнопку скрытия лишних карточек */
        
}


//проверка типов приходящих данных в класс в пропсах 
CharList.propTypes = {
    onCharSelected: PropTypes.func
}



export default CharList;
import React, {useState, useRef, useEffect, useMemo} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';
import PropTypes from 'prop-types';

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

const CharList = ({onCharSelected}) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [charEnded, setCharEnded] = useState(false);
    
    let listRefsCards = useRef([]); // хук можно помещать только на верхний уровень. нельзя использовать его в циклах или функциях

    const {process, getAllCharacters, clearError, setProcess} = useMarvelService();

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
        onRequest(offset, true);
        document.addEventListener('keypress', selectCharForEnter);
        return () => document.removeEventListener('keypress', selectCharForEnter);
        //eslint-disable-next-line
    }, []);


    const onRequest = (offset, initial) => {
        clearError();
        setNewItemLoading(!initial); 
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => {setProcess('confirmed')});
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
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
            return (<li 
                        ref={el => listRefsCards.current[i] = el}
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

    const elements = useMemo(() => {
        return setContent(process, () => renderItems(charList), newItemLoading);
        // eslint-disable-next-line
    }, [process])
    
    return (
            <div className="char__list">
                {elements}
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
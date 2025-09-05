import React, {Component} from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';
import PropTypes from 'prop-types';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 0,
        charEnded: false
    }
    
    listRefsCards = [];

    marvelService = new MarvelService();

    doRefList = (elem) => {
        let newRef = React.createRef();
        newRef = elem;
        this.listRefsCards.push(newRef);
    }

    selectCharForEnter = (e) => {
        if (e.key === 'Enter') {
            this.listRefsCards.forEach((elem) => elem.addEventListener);
            this.listRefsCards.forEach(elem => {
                if (elem === document.activeElement){
                    elem.click();
                }
            })
        }
    }


    componentDidMount() {
        this.onRequest();
        document.addEventListener('keypress', this.selectCharForEnter);
    }

    componentWillUnmount(){
        document.removeEventListener('keypress', this.selectCharForEnter);
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    setFocusCharacter = (target) => {
        this.listRefsCards.forEach(elem => {
            if (elem === target){
                elem.focus();
            } 
        })
    }



    // Этот метод создан для оптимизации, 
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items =  arr.map((item) => {
            return (
                <li ref={this.doRefList}
                    className="char__item"
                    key={item.id}
                    tabIndex={item.id}
                    onClick={(e) => {this.props.onCharSelected(item.id); this.setFocusCharacter(e.currentTarget)}}>
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

    render() {

        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
/* создать кнопку скрытия лишних карточек */
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

//проверка типов приходящих данных в класс в пропсах 
CharList.propTypes = {
    onCharSelected: PropTypes.func
}



export default CharList;
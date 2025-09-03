import './charList.scss';
import CharListItem from '../charListItem/CharListItem';
import { Component } from 'react';

class CharList extends Component {
    
    state = {
        cards: []
    }

    componentDidMount() {
        for (let i = 1; i < 10; i++){
            this.setState(state => ({
                cards: [
                    ...state.cards,
                    <CharListItem key={i} id={i} onCharSelected={this.props.onCharSelected}/>
                ]
            }))
        }
    }

    render() {
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.cards}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
    )}
}

export default CharList;
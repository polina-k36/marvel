import './charListItem.scss';
import MarvelService from '../../services/MarvelService';
import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
class CharListItem extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            loading: true,
            error: false,
            char: {}
        }
    }
    
    marvelService = new MarvelService();
    componentDidMount(){
        this.marvelService.getCharacterById(this.props.id)
        .then(this.onLoadedInfo)
        .catch(this.onError);
    }

    onLoadedInfo = (charInfo) => {
        this.setState({loading: false, char: {name: charInfo.name, thumbnail: charInfo.thumbnail}});
    }
    onError = () => {
        this.setState({error: true, loading: false});
    }
    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner/></div> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
        return (
            <li className="char__item" onClick={() => this.props.onCharSelected(this.props.id)}>
                {errorMessage} 
                {spinner} 
                {content}
            </li>
        )
    }
}


const View = ({char}) => {
    return (
        <>
            <img src={char.thumbnail} alt={char.name}/>
            <div className="char__name">{char.name}</div>
        </>
    )
}

export default CharListItem;
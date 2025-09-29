import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const {error, process, loading, request, clearError, setError, setProcess} = useHttp();

    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _offsetBase = 0;


    const getAllCharacters = async (offset= _offsetBase) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);

    }

    const getAllComics = async (offset=_offsetBase) => {
        const res = await request(`${_apiBase}comics?limit=4&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const getCharacterById = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        //выбрасывает объект с описанием ошибки из за этого ошибка не обрабатывается а возникает проблема с вызовом резалта при обработке данных ПОФИКСИТЬ
        return res.data.results.length === 0 ? setError('The character was not found.') : _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.length === 0 ? setError('The character was not found.') : _transformCharacter(res.data.results[0]);
    }

    const getComicById = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return res.data.results.length === 0 ? setError('The comic was not found.') : _transformComic(res.data.results[0]);
    }



    const _transformComic = (comic) => ({
            id: comic.id,
            title: comic.title,
            thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
            languages: comic.textObjects.languages,
            price: comic.prices[0].price,
            description: comic.description,
            pageCount: comic.pageCount

    })

    const _transformCharacter = (character) => ({
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
    })

    return {
        loading, 
        error, 
        process,
        setProcess,
        getAllCharacters, 
        getCharacterByName,
        getCharacterById, 
        clearError, 
        getAllComics, 
        getComicById
    };
}

export default useMarvelService;
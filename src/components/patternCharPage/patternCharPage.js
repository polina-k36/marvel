import { Helmet } from 'react-helmet';



export const PatternCharPage = ({data}) => {
    const {name, description, thumbnail} = data;
    return (
        <>
            <Helmet>
                <title>Character {name}</title>
                <meta
                    name="description"
                    content={`Personal page of the ${name} character`}
                    />
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img single-comic__img-char"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name single-comic__name-char">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </>
    )
}

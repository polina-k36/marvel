import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";


export const PatternComicPage = ({data}) => {
    const {title, description, thumbnail, languages, price, pageCount} = data;
    return (
        <>
            <Helmet>
                <title>Comic "{title}"</title>
                <meta
                    name="description"
                    content={`Information about ${title} comic`}
                    />
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{`${pageCount} pages`}</p>
                <p className="single-comic__descr">{`Language: ${languages}`}</p>
                <div className="single-comic__price">{`${price}$`}</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </>
    )
}

import errorGif from './error.gif';

const ErrorMessage = () => {
    return (
        //<img src={process.env.PUBLIC_URL + '/error.gif'} alt="error" /> //получение статичного файла в папке
        <img src={errorGif} alt='error' style={{display: 'block', width: '200px', 
            height: '250px', objectFit: 'contain', margin: '0 auto'}}/> 
    )
    
}

export default ErrorMessage;
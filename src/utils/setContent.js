import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";



const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting': 
            return <Skeleton/>;
        case 'loading': 
            return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Spinner/></div>;
        case 'error': 
            return <ErrorMessage/>;
        case 'confirmed': 
            return <Component data={data}/>;
        default: 
            throw new Error('Incorrect type');
    }
}

export default setContent;

import {useState, useCallback} from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method='GET', body=null, headers={'Content-Type': 'application/json'}) => {
        
        setProcess('loading');
        setLoading(true);

        try {
            const response = await fetch(url/* , {method, body, headers} */);
            if(!response.ok) {
                throw new Error(`Ошибка соединения с ${url}. Статус ошибки - ${response.status}`)
            }

            const data = await response.json();
            
            setProcess('confirmed');
            setLoading(false);
            return data;

        } catch(e) {
            setLoading(false);
            setError(e.message);
            setProcess('error');
            throw e;
        }
    }, []);

    const clearError = useCallback(() => {setError(null); setProcess('waiting')}, []);

    return {loading, error, request, clearError, setError, process, setProcess}
}
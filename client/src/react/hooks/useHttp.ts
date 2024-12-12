import { useState, useCallback } from 'react';

const useHttp = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async (url : string, method = "GET", body = null, headers = {"Content-type": "application/json"}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(url, {method, headers, body});
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            return await response.json();
        } catch (err : any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error,fetchData };
};

export default useHttp;
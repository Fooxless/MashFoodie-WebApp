import { useState, useEffect } from "react";

export function useCounter(loaded) {
    const [counterloading, setCounterLoading] = useState(true);
    const [counterdata, setCouterData] = useState([]);
    const [countererror, setError] = useState(null);
    useEffect(() => {
        if (loaded) {
            getDirectionsByQuery()
                .then(data => setCouterData(data))
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setCounterLoading(false);
                });
        }

    }, [loaded]);
    return {
        counterloading,
        counterdata,
        countererror,
    };

}

async function getDirectionsByQuery() {
    const url = `/api/getCounter`;
    const send = {
        method: 'get', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    return await fetch(url, send)
        .then((res) => res.json())
        .then((res) => {
            return res;
        });
}


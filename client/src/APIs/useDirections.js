import { useState, useEffect } from "react";

export function useDirections(area1, area2, start) {
    const [directionsloading, setDirectionsLoading] = useState(true);
    const [directiondata, setDirectionData] = useState([]);
    const [directionsError, setError] = useState(null);

    useEffect(() => {
        if (area1 && area2 && start) {
            getDirectionsByQuery(area1, area2)
                .then(data => setDirectionData(data))
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setDirectionsLoading(false);
                });
        }


    }, [area1, area2, start]);
    return {
        directionsloading,
        directiondata,
        directionsError,
    };

}

function getDirectionsByQuery(location, restaurants) {
    const url = `/api/getDistance`;
    const send = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ mylocation: location, locRestaurants: restaurants }),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    return fetch(url, send)
        .then((res) => res.json())
        .then((res) => {
            return res;
        });
}


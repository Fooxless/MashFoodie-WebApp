import { useState, useEffect } from "react";

export function useRestaurants(currentRest, start) {
    const [restaurantsloading, setRestaurantsloading] = useState(true);
    const [restaurantsData, setRestaurantsData] = useState([]);
    const [restaurantsError, setError] = useState(null);
    useEffect(() => {
        if (currentRest && start) {
            getRestaurantsByQuery(currentRest)
                .then(users => setRestaurantsData(users))
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setRestaurantsloading(false);
                });
        }

    }, [currentRest, start]);

    return {
        restaurantsloading,
        restaurantsData,
        restaurantsError,
    };

}

async function getRestaurantsByQuery(currentRest) {
    const url = `/api/getRest/`;
    const send = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
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

    return await fetch(url + currentRest, { send })
        .then((res) => res.json())
        .then((res) => {
            return res;
        });
}

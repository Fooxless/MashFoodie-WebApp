import { useState, useEffect } from "react";

export function useMenu(locationdata, start, directiondata, selectedIndex) {
    const [menuloading, setMenuLoading] = useState(true);
    const [menudata, setMenuData] = useState([]);
    const [menuerror, setError] = useState(null);
    useEffect(() => {
        if (start && directiondata.length === 10 && selectedIndex >= 0) {
            getDirectionsByQuery(locationdata, selectedIndex)
                .then(data => setMenuData(data))
                .catch((e) => {
                    setError(e);
                })
                .finally(() => {
                    setMenuLoading(false);
                });
        }


    }, [directiondata, locationdata, selectedIndex, start]);
    return {
        menuloading,
        menudata,
        menuerror,
    };

}

function getDirectionsByQuery(restaurants, selectedIndex) {
    const url = `/api/getMenu`;
    const send = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ locRestaurants: restaurants.data[selectedIndex] }),
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    };
    return fetch(url, send)
        .then((res) => res.json())
        .then((res) => {
            return res;
        });
}


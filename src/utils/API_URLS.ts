function searchURL(cityName: string) {
    return `/api/search?query=${cityName}`;
}

function cityURL(cityName: string) {
    return `/api/city?name=${cityName}`;
}

function hotelURL(
    entityId: string | number,
    checkoutDate: string,
    checkinDate: string
) {
    return `/api/city/hotels?entityId=${entityId}&checkinDate=${checkinDate}&checkoutDate=${checkoutDate}`;
}

function attractionsURL(lat: string, lng: string) {
    return `/api/city/places?lat=${lat}&lng=${lng}`;
}

function deleteItineraryURL(id: string) {
    return `/api/itineraries/${id}`;
}

const itineraryURL = "/api/itineraries";

export {
    cityURL,
    hotelURL,
    attractionsURL,
    searchURL,
    deleteItineraryURL,
    itineraryURL,
};

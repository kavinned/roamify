function searchURL(cityName: string) {
    return `/api/search?query=${cityName}`;
}

function cityURL(cityName: string) {
    return `/api/city?name=${cityName}`;
}

function hotelURL(
    destinationId: string | number,
    checkoutDate: string,
    checkinDate: string
) {
    return `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=${destinationId}&checkin=${checkinDate}&checkout=${checkoutDate}&adults=1&rooms=1&limit=5&sorting=-hotel_rating&currency=USD&market=en-US&countryCode=US`;
}

function attractionsURL(lat: number, lng: number) {
    return `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C%20${lng}&type=tourist_attraction&radius=10000&language=en`;
}

export { cityURL, hotelURL, attractionsURL, searchURL };

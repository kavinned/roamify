function wikipediaURL(cityName) {
    return `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${cityName}&prop=extracts&exintro=true&explaintext=true`;
}

function queryDestinationURL(query) {
    return `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel?query=${query}`;
}

function getDestinationHotelsURL(destinationId, checkoutDate, checkinDate) {
    return `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=${destinationId}&checkin=${checkinDate}&checkout=${checkoutDate}&adults=1&rooms=1&limit=5&sorting=-hotel_rating&currency=USD&market=en-US&countryCode=US`;
}

function getTouristAttractionsURL(lat, lng) {
    return `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C%20${lng}&type=tourist_attraction&radius=10000&language=en`;
}

export {
    wikipediaURL,
    queryDestinationURL,
    getDestinationHotelsURL,
    getTouristAttractionsURL,
};

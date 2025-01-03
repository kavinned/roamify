function geoNamesURL(cityName: string) {
    return `/api/search?query=${cityName}`;
}

function wikipediaURL(cityName: string) {
    return `https://en.wikipedia.org/w/api.php?action=query&titles=${cityName}&prop=extracts|pageimages&exintro&explaintext&format=json&pithumbsize=500&origin=*`;
}

function queryDestinationURL(query: string) {
    return `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel?query=${query}`;
}

function getDestinationHotelsURL(
    destinationId: string | number,
    checkoutDate: string,
    checkinDate: string
) {
    return `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchHotels?entityId=${destinationId}&checkin=${checkinDate}&checkout=${checkoutDate}&adults=1&rooms=1&limit=5&sorting=-hotel_rating&currency=USD&market=en-US&countryCode=US`;
}

function getTouristAttractionsURL(lat: number, lng: number) {
    return `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C%20${lng}&type=tourist_attraction&radius=10000&language=en`;
}

export {
    wikipediaURL,
    queryDestinationURL,
    getDestinationHotelsURL,
    getTouristAttractionsURL,
    geoNamesURL,
};

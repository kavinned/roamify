import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    const { name: cityName } = req.query;

    if (!cityName) {
        res.status(400).json({ message: "Please provide a city name" });
        return;
    }

    const formattedName = (cityName as string)
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const wikiURL = `https://en.wikipedia.org/w/api.php?action=query&titles=${formattedName}&prop=extracts|pageimages&exintro&explaintext&format=json&pithumbsize=500&origin=*`;
    const airscrapperURL = "http://localhost:3001/destinations";
    // const airscrapperURL = `https://sky-scrapper.p.rapidapi.com/api/v1/hotels/searchDestinationOrHotel?query=${formattedName}`;
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": process.env.RAPIDAPI_KEY as string,
            "X-RapidAPI-Host": process.env.AIR_SCRAPPER_HOST as string,
        },
    };

    try {
        const [wikiResponse, airscrapperResponse] = await Promise.all([
            fetch(wikiURL),
            fetch(airscrapperURL, options),
        ]);

        const [wikiData, airscrapperData] = await Promise.all([
            wikiResponse.json(),
            airscrapperResponse.json(),
        ]);

        res.json({
            wikiData,
            airscrapperData,
        });
        return;
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to fetch` });
    }
});

export default router;

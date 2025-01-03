import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    const { query } = req.query;
    const username = process.env.GEONAMES_UN;

    const URL = `http://api.geonames.org/search?name=${query}&maxRows=5&username=${username}&type=json&featureClass=P&orderby=population&lang=en&style=MEDIUM`;
    try {
        const response = await fetch(URL);
        const data = await response.json();
        res.json(data);
        return;
    } catch (error) {
        res.status(500).json({ error: `${error} Failed to fetch users` });
    }
});

export default router;

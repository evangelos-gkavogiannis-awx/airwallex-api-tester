import express from "express";
import axios from "axios";
import { getAccessToken } from "../utils/auth.js";

const router = express.Router();

//Get a Balance history
router.get("/history", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const queryString = new URLSearchParams(req.query).toString();
        const response = await axios.get(`https://api-demo.airwallex.com/api/v1/balances/history?${queryString}`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get current Balance
router.get("/current", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.get(`https://api-demo.airwallex.com/api/v1/balances/current`, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



//Default Export Router
export default router;

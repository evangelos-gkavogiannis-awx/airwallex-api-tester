import express from "express";
import axios from "axios";
import { getAccessToken } from "../utils/auth.js";

const router = express.Router();

//Get a list of Deposits
router.get("/deposits/", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const queryString = new URLSearchParams(req.query).toString();
        const response = await axios.get(`https://api-demo.airwallex.com/api/v1/deposits?${queryString}`, {
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

// Fetch a deposit by ID
router.get("/deposits/:id", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.get(`https://api-demo.airwallex.com/api/v1/deposits/${req.params.id}`, {
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


// create a deposit
router.post("/deposits/create", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.post(
            "https://api-demo.airwallex.com/api/v1/deposits/create",
            req.body,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to create a deposit", details: error.response?.data || error.message });
    }
});

//Default Export Router
export default router;

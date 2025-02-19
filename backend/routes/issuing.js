import express from "express";
import axios from "axios";
import { getAccessToken } from "../utils/auth.js";

const router = express.Router();

// Create Cardholder
router.post("/cardholders/create", async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(
      "https://api-demo.airwallex.com/api/v1/issuing/cardholders/create",
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
    res.status(500).json({ error: "Failed to create cardholder", details: error.response?.data || error.message });
  }
});

router.post("/cards/create", async (req, res) => {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(
        "https://api-demo.airwallex.com/api/v1/issuing/cards/create",
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
      res.status(500).json({ error: "Failed to create card", details: error.response?.data || error.message });
    }
  });

//Default Export Router
export default router;

import express from "express";
import axios from "axios";
import { getAccessToken } from "../utils/auth.js";

const router = express.Router();


// Proxy to Airwallex API
router.get("/financial_transactions/", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
      const queryString = new URLSearchParams(req.query).toString();
      const response = await axios.get(`https://api-demo.airwallex.com/api/v1/financial_transactions?${queryString}`, {
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
  
  // Fetch a transaction by ID
  router.get("/financial_transactions/:id", async (req, res) => {
    try {
        const accessToken = await getAccessToken();
      const response = await axios.get(`https://api-demo.airwallex.com/api/v1/financial_transactions/${req.params.id}`, {
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


export default router;